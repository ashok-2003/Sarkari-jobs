import axios from 'axios';
import { AxiosError } from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;



// make all the api calls generic to handle different data types
export async function makeRapidApiCall<T>(path: string): Promise<T> {
  const apiUrl = `https://${RAPIDAPI_HOST}${path}`;

  if (!RAPIDAPI_KEY || !RAPIDAPI_HOST) {
    console.error("RapidAPI credentials missing. Check your .env.local file.");
    throw new Error("Server configuration error: RapidAPI credentials missing.");
  }

  try {
    const response = await axios.get<T>(apiUrl, {
      headers: {
        'X-Rapidapi-Key': RAPIDAPI_KEY,
        'X-Rapidapi-Host': RAPIDAPI_HOST,
      },
      timeout: 15000, // 15-second timeout
    });

    if (response.status !== 200) {
      console.error(`RapidAPI responded with status ${response.status} for ${path}:`, response.data);
      throw new Error(`RapidAPI responded with an unexpected status: ${response.status}`);
    }

    return response.data;

  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`Error fetching data from RapidAPI endpoint ${path}:`, axiosError.message);

    if (axios.isAxiosError(error)) {
      if (axiosError.code === 'EAI_AGAIN') {
        throw new Error(`Temporary network/DNS issue for ${path}. Please try again later.`);
      } else if (axiosError.response) {
        const status = axiosError.response.status;
        const data = JSON.stringify(axiosError.response.data);
        if (status === 401 || status === 403) {
            throw new Error(`Authentication/Authorization error for ${path}: Check RapidAPI Key. Status: ${status}, Response: ${data}`);
        } else if (status === 429) {
            throw new Error(`Rate limit exceeded for ${path}. Status: ${status}, Response: ${data}`);
        }
        throw new Error(`RapidAPI responded with an error for ${path}: Status ${status}, Response: ${data}`);
      } else if (axiosError.request) {
        throw new Error(`No response received from RapidAPI for ${path}. Network or API down.`);
      } else {
        throw new Error(`Axios request setup error for ${path}: ${axiosError.message}`);
      }
    }
    throw new Error(`An unknown error occurred while fetching ${path}: ${(error as Error).message}`);
  }
}