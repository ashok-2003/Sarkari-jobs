import { makeRapidApiCall } from "../rapidapi";

interface SyllabusItem {
    href: string;
    text: string;
}


export interface LatestSyllabusResponse {
    totalcount: number;
    date?: string | null;
    result: SyllabusItem[];
}

// Function to fetch latest jobs
export async function fetchLatestSyllabus(): Promise<SyllabusItem[]> {
    const fullResponse = await makeRapidApiCall<LatestSyllabusResponse>("/scrape/syllabus");

    // Ensure 'result' exists and is an array before filtering
    if (!fullResponse.result || !Array.isArray(fullResponse.result)) {
        console.warn("/scrape/latestjob response did not contain a valid 'result' array. Returning empty.");
        return [];
    }

    const allSyllabus = fullResponse.result;
    if (allSyllabus.length === 0) {
        console.warn("/scrape/Syllabus returned an empty result array.");
        return [];
    }

    return allSyllabus;
}