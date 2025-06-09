
import { fetchAdmission} from "@/lib/rapid-api/latest-admission"; 
import prisma from "../prisma"; 
import { generateBatchContentDescriptions } from "@/lib/openapi"; 

export async function updateAdmissionItem() {
    try {
        const LatestAdmissions = await fetchAdmission(); 
        const existingAdmissionItems = await prisma.admissionItem.findMany({
            select: { href: true } // Fetch only 'href' for efficient comparison
        });

        // Create a Set for quick lookup of existing admission item hrefs
        const existingHrefs = new Set(existingAdmissionItems.map(item => item.href));

        // Identify new admission items not yet in the database by comparing 'href'
        const newAdmissionItems = LatestAdmissions.filter(admission =>
            !existingHrefs.has(admission.href)
        );

        if (newAdmissionItems.length === 0) {
            console.log(`[${new Date().toISOString()}] No new admission items found to process.`);
            return;
        }

        console.log(`[${new Date().toISOString()}] Found ${newAdmissionItems.length} new admission items. Processing descriptions with AI...`);

        // Prepare admission texts for AI description generation
        const newAdmissionItemsText = newAdmissionItems.map(admission => admission.text);

        // Configuration for AI API calls and retry logic (same as job items)
        const BATCH_SIZE = 40;
        const MAX_AI_RETRIES = 4;
        const RETRY_DELAY_MS = 2000;

        // Process new admissions in batches for AI description and DB insertion
        for (let i = 0; i < newAdmissionItemsText.length; i += BATCH_SIZE) {
            const batch = newAdmissionItemsText.slice(i, i + BATCH_SIZE);
            const originalAdmissionsBatch = newAdmissionItems.slice(i, i + BATCH_SIZE);

            let descriptions: string[] = [];
            let retries = 0;
            let success = false;

            // Retry loop for AI description generation
            while (retries <= MAX_AI_RETRIES && !success) {
                try {
                    
                    descriptions = await generateBatchContentDescriptions("admission_notice", batch);

                    // Validate if AI returned descriptions for all items in the batch
                    if (descriptions.length === batch.length) {
                        success = true;
                    } else {
                        console.warn(`[${new Date().toISOString()}] Warning: AI returned unexpected description count (${descriptions.length} vs expected ${batch.length}) for admission batch starting at index ${i}. Retrying... (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1})`);
                        retries++;
                        if (retries <= MAX_AI_RETRIES) {
                            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                        }
                    }
                } catch (aiError) {
                    console.error(`[${new Date().toISOString()}] ERROR: AI generation failed for admission batch starting at index ${i} (Attempt ${retries + 1}/${MAX_AI_RETRIES + 1}):`, aiError);
                    retries++;
                    if (retries <= MAX_AI_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                    }
                }
            }

            // If AI generation ultimately failed, fill descriptions with null
            if (!success) {
                console.error(`[${new Date().toISOString()}] FATAL: AI generation failed after ${MAX_AI_RETRIES + 1} attempts for admission batch starting at index ${i}. Proceeding with null descriptions for this batch.`);
                descriptions = new Array(batch.length).fill(null);
            }

            // Prepare admission items for database insertion, mapping descriptions by order
            const admissionItemsToCreate = originalAdmissionsBatch.map((admission, index) => ({
                href: admission.href,
                text: admission.text,
                last_date: admission.last_date || null, // Ensure 'last_date' mapping, default to null
                description: descriptions[index] || null, // Use generated description, or null if AI failed
                // No image_url field here, as per your request
            }));

            // Insert prepared admission items into the database
            try {
                await prisma.admissionItem.createMany({
                    data: admissionItemsToCreate,
                    skipDuplicates: true, // Prevents errors on duplicate inserts
                });
                console.log(`[${new Date().toISOString()}] Successfully inserted ${admissionItemsToCreate.length} new admission items into the database.`);
            } catch (dbError) {
                console.error(`[${new Date().toISOString()}] ERROR: Failed to insert DB batch for admission items starting at index ${i}:`, dbError);
            }
        }
    } catch (mainError) {
        // Catch any unhandled top-level errors (e.g., initial API fetch or DB query)
        console.error(`[${new Date().toISOString()}] FATAL ERROR: An unhandled error occurred during admission item update:`, mainError);
    }
}