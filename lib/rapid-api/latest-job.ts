import { makeRapidApiCall } from "../rapidapi";

interface JobItem {
  href: string;
  text: string;
  last_date?: string;
}


export interface LatestJobResponse {
  totalcount: number;
  date?: string | null;
  result: JobItem[]; 
}

// Function to fetch latest jobs
export async function fetchLatestJobs(): Promise<JobItem[]> {
  const fullResponse = await makeRapidApiCall<LatestJobResponse>("/scrape/latestjob");

  // Ensure 'result' exists and is an array before filtering
  if (!fullResponse.result || !Array.isArray(fullResponse.result)) {
    console.warn("/scrape/latestjob response did not contain a valid 'result' array. Returning empty.");
    return [];
  }

  const allJobs = fullResponse.result;
  const currentYear = new Date().getFullYear(); // e.g., 2025

  const filteredJobs = allJobs.filter(job => {
    // Only process if 'last_date' exists and is a string
    if (job.last_date && typeof job.last_date === 'string') {
      const dateParts = job.last_date.split('/');
      // Ensure it has 3 parts (DD, MM, YYYY) and the year part is valid
      if (dateParts.length === 3) {
        const jobYear = parseInt(dateParts[2], 10);
        return jobYear >= currentYear;
      }
    }
    return false; // Exclude jobs without a valid 'last_date' or incorrect format
  });

  return filteredJobs;
}