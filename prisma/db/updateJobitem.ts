
import { fetchLatestJobs } from "@/lib/rapid-api/latest-job";
import prisma from "../prisma";
import { generateBatchContentDescriptions } from "@/lib/openapi"; // Using your specified path

export async function updateJobItem(){
    try {
        const LatestJobs = await fetchLatestJobs();
        const existingJobItems = await prisma.jobItem.findMany();

        // Identify new job items not yet in the database by comparing 'href'.
        const newJobItems = LatestJobs.filter(job =>
            !existingJobItems.some(existingJob => existingJob.href === job.href)
        );

        // Prepare job texts for AI description generation.
        const newJobItemsText = newJobItems.map(job => job.text);   

        // Configuration for AI API calls and retry logic.
        const BATCH_SIZE = 50; 
        const MAX_AI_RETRIES = 4;    // Maximum retries for AI generation per batch.
        const RETRY_DELAY_MS = 1000; // Delay before retrying AI call.

        // Process new jobs in batches for AI description and DB insertion.
        for(var i = 0; i < newJobItemsText.length; i += BATCH_SIZE) {
            const batch = newJobItemsText.slice(i, i + BATCH_SIZE);
            const originalJobsBatch = newJobItems.slice(i, i + BATCH_SIZE); 

            let descriptions: string[] = [];
            let retries = 0;
            let success = false;

            // Retry loop for AI description generation.
            while (retries <= MAX_AI_RETRIES && !success) {
                try {
                    descriptions = await generateBatchContentDescriptions("job_posting", batch);
                    
                    // Validate if AI returned descriptions for all items in the batch.
                    if (descriptions.length === batch.length) {
                        success = true; 
                    } else {
                        console.warn(`[${new Date().toISOString()}] Warning: AI returned unexpected description count (${descriptions.length} vs expected ${batch.length}) for batch starting at index ${i}. Retrying... (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1})`);
                        retries++;
                        if (retries <= MAX_AI_RETRIES) {
                            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                        }
                    }
                } catch (aiError) {
                    console.error(`[${new Date().toISOString()}] ERROR: AI generation failed for batch starting at index ${i} (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1}):`, aiError);
                    retries++;
                    if (retries <= MAX_AI_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                    }
                }
            }

            // If AI generation ultimately failed, fill descriptions with null.
            if (!success) {
                console.error(`[${new Date().toISOString()}] FATAL: AI generation failed after ${MAX_AI_RETRIES + 1} attempts for batch starting at index ${i}. Proceeding with null descriptions for this batch.`);
                descriptions = new Array(batch.length).fill(null); 
            }

            // Prepare job items for database insertion, mapping descriptions by order.
            const jobItemsToCreate = originalJobsBatch.map((job, index) => ({
                href: job.href,
                text: job.text,
                last_date : job.last_date || null, // Ensure 'last_date' mapping, default to null.
                description: descriptions[index] || null, // Use generated description, or null if AI failed.
            }));

            // Insert prepared job items into the database.
            try {
                await prisma.jobItem.createMany({
                    data: jobItemsToCreate,
                    skipDuplicates: true, // Prevents errors on duplicate inserts.
                });
            } catch (dbError) {
                console.error(`[${new Date().toISOString()}] ERROR: Failed to insert DB batch starting at index ${i}:`, dbError);
            }
        }
    } catch (mainError) {
        // Catch any unhandled top-level errors (e.g., initial API fetch or DB query).
        console.error(`[${new Date().toISOString()}] FATAL ERROR: An unhandled error occurred during job item update:`, mainError);
    }
}