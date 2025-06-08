// lib/togetherai.ts
import Together from "together-ai";

const TOGETHER_AI_API_KEY = process.env.TOGETHER_AI_API_KEY;

// Initialize Together AI client
const together = new Together({
  apiKey: TOGETHER_AI_API_KEY,
});

/**
 * Generates concise, professional summaries for a batch of content titles using Together AI.
 * The AI is explicitly instructed to return a JSON array of strings.
 *
 * @param category The type of content (e.g., "job posting", "exam result", etc.).
 * @param texts An array of titles/texts to summarize.
 * @returns A Promise that resolves to an array of generated description strings (`string[]`).
 * Returns an empty array `[]` if the API key is not set, no texts are provided,
 * the API call fails, or the response cannot be parsed into a string array.
 */
export async function generateBatchContentDescriptions(
  category: string,
  texts: string[]
): Promise<string[]> { // <--- Explicitly returns Promise<string[]>
  if (!TOGETHER_AI_API_KEY) {
    console.warn("TOGETHER_AI_API_KEY is not set. Skipping description generation.");
    return [];
  }

  if (texts.length === 0) {
    return []; // No texts to process, return empty array immediately
  }

  // Format the input titles for the AI's user message.
  // Using numbered list with quotes helps clarity for the LLM.
  const formattedTitles = texts.map((text, index) => `${index + 1}. "${text}"`).join('\n');

  // --- Dynamic Prompt Construction for Batch Processing ---
  // The system and assistant content are crucial for guiding the AI to output a JSON array.
  let systemContent: string;
  let userExampleContent: string;
  let assistantExampleContent: string; // This will be a JSON string of an array

  switch (category.toLowerCase()) {
    case 'job posting':
      systemContent = "You are an AI assistant that summarizes job titles. For a given list of job titles, you **must return a JSON array of concise, professional summaries**, each 2-3 sentences long. Each summary should include main responsibilities, required skills, and relevant department type if applicable. **Do not include any other text besides the JSON array.** Ensure the summaries are suitable for job-seekers.";
      userExampleContent = `Summarize the following job titles:\n1. "Software Engineer"\n2. "Data Analyst"`;
      assistantExampleContent = JSON.stringify([
        "As a Software Engineer, you will design, develop, and maintain software applications, utilizing programming languages like Python or Java. This role requires strong problem-solving skills and experience with full-stack development, often within a tech or product department.",
        "A Data Analyst interprets complex datasets to identify trends and insights, using tools like SQL and Excel. This position demands strong analytical abilities and attention to detail, typically found in business intelligence or marketing departments."
      ]);
      break;
    case 'exam result':
      systemContent = "You are an AI assistant that summarizes exam results. For a given list of exam result titles, you **must return a JSON array of concise, informative summaries**, each 2-3 sentences long. Each summary should include what the result signifies, who it's for, and typical next steps. **Do not include any other text besides the JSON array.** Ensure summaries are clear and helpful.";
      userExampleContent = `Summarize the following exam results:\n1. "UPSC Civil Services Final Result"\n2. "IBPS Clerk Mains Score Card"`;
      assistantExampleContent = JSON.stringify([
        "The UPSC Civil Services Final Result declares candidates qualified for various central government services. Successful individuals should prepare for further administrative formalities and appointments. This marks the culmination of a highly competitive examination process.",
        "The IBPS Clerk Mains Score Card provides detailed marks for candidates who appeared in the main examination. Aspirants can check their sectional and overall scores to assess their performance. Qualified candidates will proceed to the interview or provisional allotment stage."
      ]);
      break;
    case 'admission notice':
      systemContent = "You are an AI assistant that summarizes admission notices. For a given list of admission notice titles, you **must return a JSON array of concise summaries**, each 2-3 sentences long. Each summary should include key information like application period, eligibility highlights, and what applicants should prepare. **Do not include any other text besides the JSON array.** Ensure summaries are concise and easy to understand for prospective students.";
      userExampleContent = `Summarize the following admission notices:\n1. "DU PG Admission Notification"\n2. "JNU Ph.D. Entrance Announcement"`;
      assistantExampleContent = JSON.stringify([
        "The Delhi University PG Admission Notification announces the opening of applications for various postgraduate courses. Prospective students should check eligibility criteria and prepare required documents for the online application process. Application dates are from [Start Date] to [End Date].",
        "The JNU Ph.D. Entrance Announcement details the admission process for doctoral programs. Candidates must hold a master's degree in a relevant field and qualify the entrance examination. Prepare your research proposal and academic transcripts for submission."
      ]);
      break;
    case 'answer key':
      systemContent = "You are an AI assistant that summarizes answer key releases. For a given list of answer key titles, you **must return a JSON array of concise summaries**, each 2-3 sentences long. Each summary should explain its purpose, how candidates can use it, and information on raising objections. **Do not include any other text besides the JSON array.** Ensure summaries are clear and helpful for candidates.";
      userExampleContent = `Summarize the following answer keys:\n1. "SSC CGL Tier 1 Answer Key"\n2. "NEET UG Provisional Key"`;
      assistantExampleContent = JSON.stringify([
        "The SSC CGL Tier 1 Answer Key allows candidates to cross-verify their responses and calculate estimated scores. Aspirants can raise objections against any discrepancies within a specified period. This key is crucial for score calculation and transparency.",
        "The NEET UG Provisional Key provides official answers for the medical entrance exam. Candidates can challenge provisional answers if they find discrepancies. This key is crucial for score estimation before final results are declared."
      ]);
      break;
    case 'admit card':
      systemContent = "You are an AI assistant that summarizes admit card releases. For a given list of admit card titles, you **must return a JSON array of concise summaries**, each 2-3 sentences long. Each summary should include details like exam date, required documents for entry, and download instructions. **Do not include any other text besides the JSON array.** Ensure summaries are essential for candidates.";
      userExampleContent = `Summarize the following admit cards:\n1. "JEE Main Admit Card"\n2. "UPSC NDA Admit Card"`;
      assistantExampleContent = JSON.stringify([
        "The JEE Main Admit Card is mandatory for entry to the engineering entrance exam. Candidates must download and print it, along with a valid photo ID. Ensure all details on the card are correct for a smooth examination experience.",
        "The UPSC NDA Admit Card provides essential details for the National Defence Academy examination. Candidates must download and carry it with a photo ID to the exam center. It includes exam date, time, and venue information."
      ]);
      break;
    default:
      systemContent = `You are an AI assistant that summarizes content titles. For a given list of "${category}" titles, you **must return a JSON array of concise, professional summaries**, each 2-3 sentences long. Focus on key details, purpose, and relevant information for each item. **Do not include any other text besides the JSON array.**`;
      userExampleContent = `Summarize the following:\n1. "Item 1 Title"\n2. "Item 2 Title"`;
      assistantExampleContent = JSON.stringify([
        `This is a summary for Item 1 Title, providing key details and its primary purpose. Always refer to the official source for complete information.`,
        `This is a summary for Item 2 Title, outlining its main features and what it signifies. Ensure to check for any updates or specific requirements.`
      ]);
      break;
  }

  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      messages: [
        {
          role: "system",
          content: systemContent // Sets the AI's overall behavior for batch processing
        },
        // Few-shot example: shows the AI the expected input and the desired JSON array output.
        {
          role: "user",
          content: userExampleContent
        },
        {
          role: "assistant",
          content: assistantExampleContent
        },
        // The actual batch of titles to be summarized.
        {
          role: "user",
          content: `Summarize the following ${category} titles:\n${formattedTitles}`
        }
      ],
      max_tokens: 3600, // Ample tokens for a batch of summaries
      temperature: 0.7, // Balance creativity and consistency
      response_format: { type: "json_object" }, // Crucial: tells Together AI to return JSON
    });

    const responseContent = response.choices[0]?.message?.content;

    if (!responseContent) {
      console.warn(`[${new Date().toISOString()}] No content received from Together AI for batch generation of category "${category}".`);
      return []; // Return empty array if no content
    }

    try {
      // Attempt to parse the JSON string into an array of descriptions.
      const descriptions = JSON.parse(responseContent);
      if (Array.isArray(descriptions) && descriptions.every(item => typeof item === 'string')) {
        return descriptions; // Return the parsed array of strings
      } else {
        console.error(`[${new Date().toISOString()}] Together AI response is not a valid JSON array of strings for category "${category}":`, responseContent);
        return []; // Return empty array if parsed JSON is not a string array
      }
    } catch (jsonError) {
      console.error(`[${new Date().toISOString()}] Failed to parse JSON from Together AI response for category "${category}":`, jsonError, `Response: ${responseContent}`);
      return []; // Return empty array if JSON parsing fails
    }

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error generating batch descriptions for "${category}" items:`, error);
    return []; // Return empty array if the API call itself fails
  }
}