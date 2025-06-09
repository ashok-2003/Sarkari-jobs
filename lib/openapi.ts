// lib/togetherai.ts
import Together from "together-ai";

const TOGETHER_AI_API_KEY = process.env.TOGETHER_AI_API_KEY;

// Initialize Together AI client
const together = new Together({
  apiKey: TOGETHER_AI_API_KEY,
});

/**
 * Generates concise, professional summaries for a batch of content titles using Together AI.
 * The AI is explicitly instructed to return a JSON array of objects, each containing a 'summary' string.
 *
 * @param category The type of content (e.g., "job posting", "exam result", etc.).
 * @param texts An array of titles/texts to summarize.
 * @returns A Promise that resolves to an array of generated description strings (`string[]`).
 * Returns an empty array `[]` if the API key is not set, no texts are provided,
 * the API call fails, or the response cannot be parsed into the expected array of summary objects.
 */
export async function generateBatchContentDescriptions(
  category: string,
  texts: string[]
): Promise<string[]> {
  if (!TOGETHER_AI_API_KEY) {
    console.warn("TOGETHER_AI_API_KEY is not set. Skipping description generation.");
    return [];
  }

  if (texts.length === 0) {
    return []; // No texts to process, return empty array immediately
  }

  const formattedTitles = texts.map((text, index) => `${index + 1}. "${text}"`).join('\n');

  let systemContent: string;
  let userExampleContent: string;
  let assistantExampleContent: string; // This will be a JSON string of an array of objects

  switch (category.toLowerCase()) {
    case 'job_posting':
      systemContent = "You are an AI assistant that summarizes job titles. For a given list of job titles, you **must return a JSON array of objects**, where each object has a 'summary' key with a concise, professional summary (2-3 sentences) including main responsibilities, required skills, and relevant department type. **Do not include any other text besides the JSON array.** Ensure the summaries are suitable for job-seekers.";
      userExampleContent = `Summarize the following job titles:\n1. "Software Engineer"\n2. "Data Analyst"`;
      
      assistantExampleContent = JSON.stringify([
        {"summary": "As a Software Engineer, you will design, develop, and maintain software applications, utilizing programming languages like Python or Java. This role requires strong problem-solving skills and experience with full-stack development, often within a tech or product department."},
        {"summary": "A Data Analyst interprets complex datasets to identify trends and insights, using tools like SQL and Excel. This position demands strong analytical abilities and attention to detail, typically found in business intelligence or marketing departments."}
      ]);
      break;
    case 'exam_result':
      systemContent = "You are an AI assistant that summarizes exam results. For a given list of exam result titles, you **must return a JSON array of objects**, where each object has a 'summary' key with a concise, informative summary (2-3 sentences) explaining what the result signifies, who it's for, and typical next steps. **Do not include any other text besides the JSON array.** Ensure summaries are clear and helpful.";
      userExampleContent = `Summarize the following exam results:\n1. "UPSC Civil Services Final Result"\n2. "IBPS Clerk Mains Score Card"`;
      
      assistantExampleContent = JSON.stringify([
        {"summary": "The UPSC Civil Services Final Result declares candidates qualified for various central government services. Successful individuals should prepare for further administrative formalities and appointments. This marks the culmination of a highly competitive examination process."},
        {"summary": "The IBPS Clerk Mains Score Card provides detailed marks for candidates who appeared in the main examination. Aspirants can check their sectional and overall scores to assess their performance. Qualified candidates will proceed to the interview or provisional allotment stage."}
      ]);
      break;
    case 'admission_notice':
      systemContent = "You are an AI assistant that summarizes admission notices. For a given list of admission notice titles, you **must return a JSON array of objects**, where each object has a 'summary' key with a concise summary (2-3 sentences) including key information like application period, eligibility highlights, and what applicants should prepare. **Do not include any other text besides the JSON array.** Ensure summaries are concise and easy to understand for prospective students.";
      userExampleContent = `Summarize the following admission notices:\n1. "DU PG Admission Notification"\n2. "JNU Ph.D. Entrance Announcement"`;
      
      assistantExampleContent = JSON.stringify([
        {"summary": "The Delhi University PG Admission Notification announces the opening of applications for various postgraduate courses. Prospective students should check eligibility criteria and prepare required documents for the online application process. Application dates are from [Start Date] to [End Date]."},
        {"summary": "The JNU Ph.D. Entrance Announcement details the admission process for doctoral programs. Candidates must hold a master's degree in a relevant field and qualify the entrance examination. Prepare your research proposal and academic transcripts for submission."}
      ]);
      break;
    case 'answer_key':
      systemContent = "You are an AI assistant that summarizes answer key releases. For a given list of answer key titles, you **must return a JSON array of objects**, where each object has a 'summary' key with a concise summary (2-3 sentences) explaining its purpose, how candidates can use it, and information on raising objections. **Do not include any other text besides the JSON array.** Ensure summaries are clear and helpful for candidates.";
      userExampleContent = `Summarize the following answer keys:\n1. "SSC CGL Tier 1 Answer Key"\n2. "NEET UG Provisional Key"`;
      
      assistantExampleContent = JSON.stringify([
        {"summary": "The SSC CGL Tier 1 Answer Key allows candidates to cross-verify their responses and calculate estimated scores. Aspirants can raise objections against any discrepancies within a specified period. This key is crucial for score calculation and transparency."},
        {"summary": "The NEET UG Provisional Key provides official answers for the medical entrance exam. Candidates can challenge provisional answers if they find discrepancies. This key is crucial for score estimation before final results are declared."}
      ]);
      break;
    case 'admit_card':
      systemContent = "You are an AI assistant that summarizes admit card releases. For a given list of admit card titles, you **must return a JSON array of objects**, where each object has a 'summary' key with a concise summary (2-3 sentences) including details like exam date, required documents for entry, and download instructions. **Do not include any other text besides the JSON array.** Ensure summaries are essential for candidates.";
      userExampleContent = `Summarize the following admit cards:\n1. "JEE Main Admit Card"\n2. "UPSC NDA Admit Card"`;
      
      assistantExampleContent = JSON.stringify([
        {"summary": "The JEE Main Admit Card is mandatory for entry to the engineering entrance exam. Candidates must download and print it, along with a valid photo ID. Ensure all details on the card are correct for a smooth examination experience."},
        {"summary": "The UPSC NDA Admit Card provides essential details for the National Defence Academy examination. Candidates must download and carry it with a photo ID to the exam center. It includes exam date, time, and venue information."}
      ]);
      break;
    
    case 'syllabus_posting':
      systemContent = "You are an AI assistant that summarizes syllabus details. For a given list of syllabus titles, you **must return a JSON array of objects**, where each object has a 'summary' key with a concise summary (2-3 sentences) outlining its purpose, key subjects/topics covered, and target audience. **Do not include any other text besides the JSON array.** Ensure summaries are clear and helpful.";
      userExampleContent = `Summarize the following syllabus titles:\n1. "UPSC Civil Services Exam Syllabus"\n2. "SSC CGL Tier 2 Syllabus"`;
      assistantExampleContent = JSON.stringify([
        {"summary": "The UPSC Civil Services Exam Syllabus details the topics for the Preliminary and Main examinations, covering general studies, optional subjects, and essay writing. It's essential for aspirants aiming for administrative roles. Review it thoroughly for comprehensive preparation."},
        {"summary": "The SSC CGL Tier 2 Syllabus outlines the subjects for the Combined Graduate Level second-stage examination, including Quantitative Abilities, English Language and Comprehension, and Statistics. It's crucial for candidates targeting various government positions. Focus on the specific topics for each paper."}
      ]);
      break;
    default:
      systemContent = `You are an AI assistant that summarizes content titles. For a given list of "${category}" titles, you **must return a JSON array of objects**, where each object has a 'summary' key with a concise, professional summary (2-3 sentences) focusing on key details, purpose, and relevant information for each item. **Do not include any other text besides the JSON array.**`;
      userExampleContent = `Summarize the following:\n1. "Item 1 Title"\n2. "Item 2 Title"`;
      
      assistantExampleContent = JSON.stringify([
        {"summary": "This is a summary for Item 1 Title, providing key details and its primary purpose. Always refer to the official source for complete information."},
        {"summary": "This is a summary for Item 2 Title, outlining its main features and what it signifies. Ensure to check for any updates or specific requirements."}
      ]);
      break;
  }

  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free", // Double-check this model ID on Together AI if needed
      messages: [
        {
          role: "system",
          content: systemContent
        },
        {
          role: "user",
          content: userExampleContent
        },
        {
          role: "assistant",
          content: assistantExampleContent
        },
        {
          role: "user",
          content: `Summarize the following ${category} titles:\n${formattedTitles}`
        }
      ],
      max_tokens: 6000,
      temperature: 0.7,
      response_format: { type: "json_object" }, // This tells Together AI to output a valid JSON object/array
    });

    const responseContent = response.choices[0]?.message?.content;

    if (!responseContent) {
      console.warn(`[${new Date().toISOString()}] No content received from Together AI for batch generation of category "${category}".`);
      return [];
    }

    try {
      // Attempt to parse the JSON string into an array of objects.
      // Expected: Array<{ summary: string }>
      const parsedDescriptions: Array<{ summary?: string; [key: string]: any }> = JSON.parse(responseContent);

      // Validate if it's an array and if each item has a 'summary' string
      if (
        Array.isArray(parsedDescriptions) &&
        parsedDescriptions.every(item => typeof item === 'object' && item !== null && 'summary' in item && typeof item.summary === 'string')
      ) {
        // Extract only the 'summary' strings from the array of objects
        return parsedDescriptions.map(item => item.summary as string);
      } else {
        console.error(`[${new Date().toISOString()}] Together AI response is a valid JSON but not a valid array of objects with 'summary' for category "${category}":`, responseContent);
        return [];
      }
    } catch (jsonError) {
      console.error(`[${new Date().toISOString()}] Failed to parse JSON from Together AI response for category "${category}":`, jsonError, `Response: ${responseContent}`);
      return [];
    }

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error generating batch descriptions for "${category}" items:`, error);
    return [];
  }
}