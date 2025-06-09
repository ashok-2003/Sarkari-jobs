
import prisma from "../prisma"; // Your Prisma client
import { generateBatchContentDescriptions } from "@/lib/openapi";
import { fetchLatestAnswerKey } from "@/lib/rapid-api/latest-answerKey";

export async function updateAnswerKeyItem() {
    try {
        const LatestAnswerKeys = await fetchLatestAnswerKey(); 
        const existingAnswerKeyItems = await prisma.answerKeyItem.findMany({
            select: { href: true } 
        });

        
        const existingHrefs = new Set(existingAnswerKeyItems.map(item => item.href));

        // Identify new answer key items not yet in the database by comparing 'href'
        const newAnswerKeyItems = LatestAnswerKeys.filter(key =>
            !existingHrefs.has(key.href)
        );

        if (newAnswerKeyItems.length === 0) {
            console.log(`[${new Date().toISOString()}] No new answer key items found to process.`);
            return;
        }

        console.log(`[${new Date().toISOString()}] Found ${newAnswerKeyItems.length} new answer key items. Processing descriptions with AI...`);

        // Prepare answer key texts for AI description generation
        const newAnswerKeyItemsText = newAnswerKeyItems.map(key => key.text);

        // Configuration for AI API calls and retry logic (same as other item types)
        const BATCH_SIZE = 40;
        const MAX_AI_RETRIES = 4;
        const RETRY_DELAY_MS = 2000;

        // Process new answer keys in batches for AI description and DB insertion
        for (let i = 0; i < newAnswerKeyItemsText.length; i += BATCH_SIZE) {
            const batch = newAnswerKeyItemsText.slice(i, i + BATCH_SIZE);
            const originalAnswerKeysBatch = newAnswerKeyItems.slice(i, i + BATCH_SIZE);

            let descriptions: string[] = [];
            let retries = 0;
            let success = false;

            // Retry loop for AI description generation
            while (retries <= MAX_AI_RETRIES && !success) {
                try {
                    // Call AI to generate descriptions for "answer key posting" type
                    descriptions = await generateBatchContentDescriptions("answer_key", batch);

                    // Validate if AI returned descriptions for all items in the batch
                    if (descriptions.length === batch.length) {
                        success = true;
                    } else {
                        console.warn(`[${new Date().toISOString()}] Warning: AI returned unexpected description count (${descriptions.length} vs expected ${batch.length}) for answer key batch starting at index ${i}. Retrying... (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1})`);
                        retries++;
                        if (retries <= MAX_AI_RETRIES) {
                            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                        }
                    }
                } catch (aiError) {
                    console.error(`[${new Date().toISOString()}] ERROR: AI generation failed for answer key batch starting at index ${i} (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1}):`, aiError);
                    retries++;
                    if (retries <= MAX_AI_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                    }
                }
            }

            // If AI generation ultimately failed, fill descriptions with null
            if (!success) {
                console.error(`[${new Date().toISOString()}] FATAL: AI generation failed after ${MAX_AI_RETRIES + 1} attempts for answer key batch starting at index ${i}. Proceeding with null descriptions for this batch.`);
                descriptions = new Array(batch.length).fill(null);
            }

            // Prepare answer key items for database insertion, mapping descriptions by order
            const answerKeyItemsToCreate = originalAnswerKeysBatch.map((key, index) => ({
                href: key.href,
                text: key.text,
                description: descriptions[index] || null, 
            }));

            // Insert prepared answer key items into the database
            try {
                await prisma.answerKeyItem.createMany({
                    data: answerKeyItemsToCreate,
                    skipDuplicates: true, // Prevents errors on duplicate inserts
                });
                console.log(`[${new Date().toISOString()}] Successfully inserted ${answerKeyItemsToCreate.length} new answer key items into the database.`);
            } catch (dbError) {
                console.error(`[${new Date().toISOString()}] ERROR: Failed to insert DB batch for answer key items starting at index ${i}:`, dbError);
            }
        }
    } catch (mainError) {
        // Catch any unhandled top-level errors (e.g., initial API fetch or DB query)
        console.error(`[${new Date().toISOString()}] FATAL ERROR: An unhandled error occurred during answer key item update:`, mainError);
    }
}