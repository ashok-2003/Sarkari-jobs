import { makeRapidApiCall } from "../rapidapi";

interface AdmitCardItem {
    href: string;
    text: string;
}


export interface LatestAdmitCardResponse {
    totalcount: number;
    date?: string | null;
    result: AdmitCardItem[];
}

// Function to fetch latest jobs
export async function fetchLatestAdmitCard(): Promise<AdmitCardItem[]> {
    const fullResponse = await makeRapidApiCall<LatestAdmitCardResponse>("/scrape/admitcard");

    // Ensure 'result' exists and is an array before filtering
    if (!fullResponse.result || !Array.isArray(fullResponse.result)) {
        console.warn("/scrape/admitcard response did not contain a valid 'result' array. Returning empty.");
        return [];
    }

    const allAdmitCard = fullResponse.result;
    if (allAdmitCard.length === 0) {
        console.warn("/scrape/admitcard returned an empty result array.");
        return [];
    }

    const numberOfItemsToTake = Math.min(allAdmitCard.length, 1000);
    const limitedResult = allAdmitCard.slice(0, numberOfItemsToTake);
    return limitedResult;
}