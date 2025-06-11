import { makeRapidApiCall } from "../rapidapi";

interface AnswerKeyItem {
    href: string;
    text: string;
}


export interface LatestAnswerResponse {
    totalcount: number;
    date?: string | null;
    result: AnswerKeyItem[];
}

// Function to fetch latest jobs
export async function fetchLatestAnswerKey(): Promise<AnswerKeyItem[]> {
    const fullResponse = await makeRapidApiCall<LatestAnswerResponse>("/scrape/answerkey");

    // Ensure 'result' exists and is an array before filtering
    if (!fullResponse.result || !Array.isArray(fullResponse.result)) {
        console.warn("/scrape/latestjob response did not contain a valid 'result' array. Returning empty.");
        return [];
    }

    const allAnswerKey = fullResponse.result;
    if (allAnswerKey.length === 0) {
        console.warn("/scrape/answerkey returned an empty result array.");
        return [];
    }

    const numberOfItemsToTake = Math.min(allAnswerKey.length, 1000);
    const limitedResult = allAnswerKey.slice(0, numberOfItemsToTake);
    return limitedResult;
}