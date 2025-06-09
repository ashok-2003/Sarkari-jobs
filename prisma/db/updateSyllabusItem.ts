// lib/rapid-api/updateSyllabusItem.ts

import { fetchLatestSyllabus } from "@/lib/rapid-api/latest-syllabus"; 
import prisma from "../prisma"; // Your Prisma client
import { generateBatchContentDescriptions } from "@/lib/openapi"; 

export async function updateSyllabusItem() {
    try {
        const LatestSyllabus = await fetchLatestSyllabus(); 
        const existingSyllabusItems = await prisma.syllabusItem.findMany({
            select: { href: true } // Fetch only 'href' for efficient comparison
        });

        // Create a Set for quick lookup of existing syllabus item hrefs
        const existingHrefs = new Set(existingSyllabusItems.map(item => item.href));

        // Identify new syllabus items not yet in the database by comparing 'href'
        const newSyllabusItems = LatestSyllabus.filter(syllabus =>
            !existingHrefs.has(syllabus.href)
        );

        if (newSyllabusItems.length === 0) {
            console.log(`[${new Date().toISOString()}] No new syllabus items found to process.`);
            return;
        }

        console.log(`[${new Date().toISOString()}] Found ${newSyllabusItems.length} new syllabus items. Processing descriptions with AI...`);

        // Prepare syllabus texts for AI description generation
        const newSyllabusItemsText = newSyllabusItems.map(syllabus => syllabus.text);

        // Configuration for AI API calls and retry logic (same as other item types)
        const BATCH_SIZE = 40;
        const MAX_AI_RETRIES = 4;
        const RETRY_DELAY_MS = 2000;

        // Process new syllabus items in batches for AI description and DB insertion
        for (let i = 0; i < newSyllabusItemsText.length; i += BATCH_SIZE) {
            const batch = newSyllabusItemsText.slice(i, i + BATCH_SIZE);
            const originalSyllabusBatch = newSyllabusItems.slice(i, i + BATCH_SIZE);

            let descriptions: string[] = [];
            let retries = 0;
            let success = false;

            // Retry loop for AI description generation
            while (retries <= MAX_AI_RETRIES && !success) {
                try {
                    // Call AI to generate descriptions for "syllabus posting" type
                    descriptions = await generateBatchContentDescriptions("syllabus posting", batch);

                    // Validate if AI returned descriptions for all items in the batch
                    if (descriptions.length === batch.length) {
                        success = true;
                    } else {
                        console.warn(`[${new Date().toISOString()}] Warning: AI returned unexpected description count (${descriptions.length} vs expected ${batch.length}) for syllabus batch starting at index ${i}. Retrying... (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1})`);
                        retries++;
                        if (retries <= MAX_AI_RETRIES) {
                            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                        }
                    }
                } catch (aiError) {
                    console.error(`[${new Date().toISOString()}] ERROR: AI generation failed for syllabus batch starting at index ${i} (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1}):`, aiError);
                    retries++;
                    if (retries <= MAX_AI_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                    }
                }
            }

            // If AI generation ultimately failed, fill descriptions with null
            if (!success) {
                console.error(`[${new Date().toISOString()}] FATAL: AI generation failed after ${MAX_AI_RETRIES + 1} attempts for syllabus batch starting at index ${i}. Proceeding with null descriptions for this batch.`);
                descriptions = new Array(batch.length).fill(null);
            }

            // Prepare syllabus items for database insertion, mapping descriptions by order
            const syllabusItemsToCreate = originalSyllabusBatch.map((syllabus, index) => ({
                href: syllabus.href,
                text: syllabus.text,
                description: descriptions[index] || null, // Use generated description, or null if AI failed
            }));

            // Insert prepared syllabus items into the database
            try {
                await prisma.syllabusItem.createMany({
                    data: syllabusItemsToCreate,
                    skipDuplicates: true, // Prevents errors on duplicate inserts
                });
                console.log(`[${new Date().toISOString()}] Successfully inserted ${syllabusItemsToCreate.length} new syllabus items into the database.`);
            } catch (dbError) {
                console.error(`[${new Date().toISOString()}] ERROR: Failed to insert DB batch for syllabus items starting at index ${i}:`, dbError);
            }
        }
    } catch (mainError) {
        // Catch any unhandled top-level errors (e.g., initial API fetch or DB query)
        console.error(`[${new Date().toISOString()}] FATAL ERROR: An unhandled error occurred during syllabus item update:`, mainError);
    }
}