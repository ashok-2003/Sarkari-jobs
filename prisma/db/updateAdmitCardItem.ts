
import prisma from "../prisma"; // Your Prisma client
import { generateBatchContentDescriptions } from "@/lib/openapi"; 
import { fetchLatestAdmitCard } from "@/lib/rapid-api/latest-admitCard";

export async function updateAdmitCardItem() {
    try {
        const LatestAdmitCards = await fetchLatestAdmitCard(); // Call your function to fetch latest admit card data
        const existingAdmitCardItems = await prisma.admitCardItem.findMany({
            select: { href: true } // Fetch only 'href' for efficient comparison
        });

        // Create a Set for quick lookup of existing admit card item hrefs
        const existingHrefs = new Set(existingAdmitCardItems.map(item => item.href));

        // Identify new admit card items not yet in the database by comparing 'href'
        const newAdmitCardItems = LatestAdmitCards.filter(card =>
            !existingHrefs.has(card.href)
        );

        if (newAdmitCardItems.length === 0) {
            console.log(`[${new Date().toISOString()}] No new admit card items found to process.`);
            return;
        }

        console.log(`[${new Date().toISOString()}] Found ${newAdmitCardItems.length} new admit card items. Processing descriptions with AI...`);

        // Prepare admit card texts for AI description generation
        const newAdmitCardItemsText = newAdmitCardItems.map(card => card.text);

        // Configuration for AI API calls and retry logic (same as other item types)
        const BATCH_SIZE = 50;
        const MAX_AI_RETRIES = 4;
        const RETRY_DELAY_MS = 1000;

        // Process new admit cards in batches for AI description and DB insertion
        for (let i = 0; i < newAdmitCardItemsText.length; i += BATCH_SIZE) {
            const batch = newAdmitCardItemsText.slice(i, i + BATCH_SIZE);
            const originalAdmitCardsBatch = newAdmitCardItems.slice(i, i + BATCH_SIZE);

            let descriptions: string[] = [];
            let retries = 0;
            let success = false;

            // Retry loop for AI description generation
            while (retries <= MAX_AI_RETRIES && !success) {
                try {
                    // Call AI to generate descriptions for "admit card posting" type
                    descriptions = await generateBatchContentDescriptions("admit_card", batch);

                    // Validate if AI returned descriptions for all items in the batch
                    if (descriptions.length === batch.length) {
                        success = true;
                    } else {
                        console.warn(`[${new Date().toISOString()}] Warning: AI returned unexpected description count (${descriptions.length} vs expected ${batch.length}) for admit card batch starting at index ${i}. Retrying... (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1})`);
                        retries++;
                        if (retries <= MAX_AI_RETRIES) {
                            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                        }
                    }
                } catch (aiError) {
                    console.error(`[${new Date().toISOString()}] ERROR: AI generation failed for admit card batch starting at index ${i} (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1}):`, aiError);
                    retries++;
                    if (retries <= MAX_AI_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                    }
                }
            }

            // If AI generation ultimately failed, fill descriptions with null
            if (!success) {
                console.error(`[${new Date().toISOString()}] FATAL: AI generation failed after ${MAX_AI_RETRIES + 1} attempts for admit card batch starting at index ${i}. Proceeding with null descriptions for this batch.`);
                descriptions = new Array(batch.length).fill(null);
            }

            // Prepare admit card items for database insertion, mapping descriptions by order
            const admitCardItemsToCreate = originalAdmitCardsBatch.map((card, index) => ({
                href: card.href,
                text: card.text,
                description: descriptions[index] || null, // Use generated description, or null if AI failed
            }));

            // Insert prepared admit card items into the database
            try {
                await prisma.admitCardItem.createMany({
                    data: admitCardItemsToCreate,
                    skipDuplicates: true, // Prevents errors on duplicate inserts
                });
                console.log(`[${new Date().toISOString()}] Successfully inserted ${admitCardItemsToCreate.length} new admit card items into the database.`);
            } catch (dbError) {
                console.error(`[${new Date().toISOString()}] ERROR: Failed to insert DB batch for admit card items starting at index ${i}:`, dbError);
            }
        }
    } catch (mainError) {
        // Catch any unhandled top-level errors (e.g., initial API fetch or DB query)
        console.error(`[${new Date().toISOString()}] FATAL ERROR: An unhandled error occurred during admit card item update:`, mainError);
    }
}