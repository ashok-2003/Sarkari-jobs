import { makeRapidApiCall } from "../rapidapi";

interface ResultItem {
    href: string;
    text: string;
}


export interface LatestResultResponse {
    totalcount: number;
    date?: string | null;
    result: ResultItem[];
}

// Function to fetch latest jobs
export async function fetchLatestResult(): Promise<ResultItem[]> {
    const fullResponse = await makeRapidApiCall<LatestResultResponse>("/scrape/result");

    // Ensure 'result' exists and is an array before filtering
    if (!fullResponse.result || !Array.isArray(fullResponse.result)) {
        console.warn("/scrape/result response did not contain a valid 'result' array. Returning empty.");
        return [];
    }

    const allResult = fullResponse.result;
    if (allResult.length === 0) {
        console.warn("/scrape/result returned an empty result array.");
        return [];
    }
    const numberOfItemsToTake = Math.min(allResult.length, 1000);
    const limitedResult = allResult.slice(0, numberOfItemsToTake);
    return limitedResult;
}