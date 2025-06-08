import { makeRapidApiCall } from "../rapidapi";

interface AdmissionItem {
  href: string;
  text: string;
  last_date?: string;
}

// Interface for the TOP-LEVEL response object from the /scrape/admission endpoint
export interface LatestAdmissionResponse {
  totalcount: number;
  date?: string | null;
  result: AdmissionItem[]; 
}
// Function to fetch admission data
export async function fetchAdmission(): Promise<AdmissionItem[]> {
   const fullResponse = await makeRapidApiCall<LatestAdmissionResponse>("/scrape/admission");

   // Ensure 'result' exists and is an array before filtering
  if (!fullResponse.result || !Array.isArray(fullResponse.result)) {
    console.warn("/scrape/latestjob response did not contain a valid 'result' array. Returning empty.");
    return [];
  }

  const allAdmission = fullResponse.result;
  const currentYear = new Date().getFullYear(); // e.g., 2025

  const filteredAdmission = allAdmission.filter(Admission => {
    // Only process if 'last_date' exists and is a string
    if (Admission.last_date && typeof Admission.last_date === 'string') {
      const dateParts = Admission.last_date.split('/');
      // Ensure it has 3 parts (DD, MM, YYYY) and the year part is valid
      if (dateParts.length === 3) {
        const AdmissionYear = parseInt(dateParts[2], 10);
        return AdmissionYear >= currentYear;
      }
    }
    return false; // Exclude Admission without a valid 'last_date' or incorrect format
  });

  return filteredAdmission;

}