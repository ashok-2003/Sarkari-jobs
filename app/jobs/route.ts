
// import { fetchAdmission } from "@/lib/rapid-api/latest-admission";
// import { fetchLatestAdmitCard } from "@/lib/rapid-api/latest-admitCard";
// import { fetchLatestAnswerKey } from "@/lib/rapid-api/latest-answerKey";
import { fetchLatestJobs } from "@/lib/rapid-api/latest-job";
// import { fetchLatestResult } from "@/lib/rapid-api/latest-result";
// import { fetchLatestSyllabus } from "@/lib/rapid-api/latest-syllabus";
import { NextResponse } from "next/server";




export async function GET() {
  const data = await fetchLatestJobs();
    return NextResponse.json(data, {
        status: 200, 
    });
}