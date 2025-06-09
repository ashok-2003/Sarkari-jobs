// pages/api/your-test-route/route.ts (or app/api/your-test-route/route.ts if using app router)

import { fetchAdmission } from "@/lib/rapid-api/latest-admission"; // Keep if used elsewhere or for future testing
import { fetchLatestAdmitCard } from "@/lib/rapid-api/latest-admitCard"; // Keep if used elsewhere or for future testing
import { fetchLatestAnswerKey } from "@/lib/rapid-api/latest-answerKey"; // Keep if used elsewhere or for future testing
import { fetchLatestJobs } from "@/lib/rapid-api/latest-job"; // This is likely used by updateJobItem internally
import { fetchLatestResult } from "@/lib/rapid-api/latest-result"; // Keep if used elsewhere or for future testing
import { fetchLatestSyllabus } from "@/lib/rapid-api/latest-syllabus"; // Keep if used elsewhere or for future testing
import { updateAdmissionItem } from "@/prisma/db/updateAdmissionItem";
import { updateJobItem } from "@/prisma/db/updateJobitem";
import { updateResultItem } from "@/prisma/db/updateResultItem";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    // Call the updateJobItem function to trigger the logic
    await updateResultItem();

    // After updateJobItem has run, you might want to fetch and return the *updated* job items
    // from your database to verify the changes. Or, just return a success message.
    // For now, let's return a simple success message indicating the update process was triggered.

    // If you want to return the data fetched by updateJobItem, you'd need to modify
    // updateJobItem to return the newJobItems, or fetch them from Prisma *after* the update.
    // For this test, a success message is usually sufficient.
    return NextResponse.json(
      { message: "Job item update process triggered successfully." },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error triggering job item update:", error);
    return NextResponse.json(
      { 
        message: "Failed to trigger job item update.", 
        error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
      },
      {
        status: 500,
      }
    );
  }
}