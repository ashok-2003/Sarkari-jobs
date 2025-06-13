// pages/api/your-test-route/route.ts (or app/api/your-test-route/route.ts if using app router)

// import { fetchAdmission } from "@/lib/rapid-api/latest-admission"; // Keep if used elsewhere or for future testing
// import { fetchLatestAdmitCard } from "@/lib/rapid-api/latest-admitCard"; // Keep if used elsewhere or for future testing
// import { fetchLatestAnswerKey } from "@/lib/rapid-api/latest-answerKey"; // Keep if used elsewhere or for future testing
// import { fetchLatestJobs } from "@/lib/rapid-api/latest-job"; // This is likely used by updateJobItem internally
// import { fetchLatestResult } from "@/lib/rapid-api/latest-result"; // Keep if used elsewhere or for future testing
// import { fetchLatestSyllabus } from "@/lib/rapid-api/latest-syllabus"; // Keep if used elsewhere or for future testing
import { updateAdmissionItem } from "@/prisma/db/updateAdmissionItem";
import { updateAdmitCardItem } from "@/prisma/db/updateAdmitCardItem";
import { updateAnswerKeyItem } from "@/prisma/db/updateAnswerKey";
import { updateJobItem } from "@/prisma/db/updateJobitem";
import { updateResultItem } from "@/prisma/db/updateResultItem";
import { updateSyllabusItem } from "@/prisma/db/updateSyllabusItem";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
  const secret = request.headers.get("x-cron-secret");
  if(!secret){
    return NextResponse.json({message : "corn secret is missing"} , {status : 500});
  }
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await updateJobItem();

    await updateAdmissionItem();

    await updateAdmitCardItem();

    await updateSyllabusItem();

    await updateResultItem();

    await updateAnswerKeyItem();

    return NextResponse.json({ message: "Cron Job executed successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error triggering update:", error);
    return NextResponse.json(
      { 
        message: "Failed to trigger update.",
        error: typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)
      },
      { status: 500 }
    );
  }
}
