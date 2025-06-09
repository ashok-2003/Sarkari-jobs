
import prisma from "../prisma"; // Your Prisma client
import { generateBatchContentDescriptions } from "@/lib/openapi"; // Your AI description utility
import { fetchLatestResult } from "@/lib/rapid-api/latest-result";

export async function updateResultItem() {
    try {
        const LatestExamResults = await fetchLatestResult(); // Call your function to fetch latest exam result data
        const existingExamResultItems = await prisma.resultItem.findMany({
            select: { href: true } // Fetch only 'href' for efficient comparison
        });

        // Create a Set for quick lookup of existing exam result item hrefs
        const existingHrefs = new Set(existingExamResultItems.map(item => item.href));

        // Identify new exam result items not yet in the database by comparing 'href'
        const newExamResultItems = LatestExamResults.filter(result =>
            !existingHrefs.has(result.href)
        );

        if (newExamResultItems.length === 0) {
            console.log(`[${new Date().toISOString()}] No new exam result items found to process.`);
            return;
        }

        console.log(`[${new Date().toISOString()}] Found ${newExamResultItems.length} new exam result items. Processing descriptions with AI...`);

        // Prepare exam result texts for AI description generation
        const newExamResultItemsText = newExamResultItems.map(result => result.text);

        // Configuration for AI API calls and retry logic (same as job and admission items)
        const BATCH_SIZE = 40;
        const MAX_AI_RETRIES = 4;
        const RETRY_DELAY_MS = 2000;

        // Process new exam results in batches for AI description and DB insertion
        for (let i = 0; i < newExamResultItemsText.length; i += BATCH_SIZE) {
            const batch = newExamResultItemsText.slice(i, i + BATCH_SIZE);
            const originalExamResultsBatch = newExamResultItems.slice(i, i + BATCH_SIZE);

            let descriptions: string[] = [];
            let retries = 0;
            let success = false;

            // Retry loop for AI description generation
            while (retries <= MAX_AI_RETRIES && !success) {
                try {
                    // Call AI to generate descriptions for "exam result posting" type
                    descriptions = await generateBatchContentDescriptions("exam_result", batch);

                    // Validate if AI returned descriptions for all items in the batch
                    if (descriptions.length === batch.length) {
                        success = true;
                    } else {
                        console.warn(`[${new Date().toISOString()}] Warning: AI returned unexpected description count (${descriptions.length} vs expected ${batch.length}) for exam result batch starting at index ${i}. Retrying... (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1})`);
                        retries++;
                        if (retries <= MAX_AI_RETRIES) {
                            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                        }
                    }
                } catch (aiError) {
                    console.error(`[${new Date().toISOString()}] ERROR: AI generation failed for exam result batch starting at index ${i} (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1}):`, aiError);
                    retries++;
                    if (retries <= MAX_AI_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                    }
                }
            }

            // If AI generation ultimately failed, fill descriptions with null
            if (!success) {
                console.error(`[${new Date().toISOString()}] FATAL: AI generation failed after ${MAX_AI_RETRIES + 1} attempts for exam result batch starting at index ${i}. Proceeding with null descriptions for this batch.`);
                descriptions = new Array(batch.length).fill(null);
            }

            // Prepare exam result items for database insertion, mapping descriptions by order
            const examResultItemsToCreate = originalExamResultsBatch.map((result, index) => ({
                href: result.href,
                text: result.text,
                description: descriptions[index] || null, // Use generated description, or null if AI failed
            }));

            // Insert prepared exam result items into the database
            try {
                await prisma.resultItem.createMany({
                    data: examResultItemsToCreate,
                    skipDuplicates: true, // Prevents errors on duplicate inserts
                });
                console.log(`[${new Date().toISOString()}] Successfully inserted ${examResultItemsToCreate.length} new exam result items into the database.`);
            } catch (dbError) {
                console.error(`[${new Date().toISOString()}] ERROR: Failed to insert DB batch for exam result items starting at index ${i}:`, dbError);
            }
        }
    } catch (mainError) {
        // Catch any unhandled top-level errors (e.g., initial API fetch or DB query)
        console.error(`[${new Date().toISOString()}] FATAL ERROR: An unhandled error occurred during exam result item update:`, mainError);
    }
}