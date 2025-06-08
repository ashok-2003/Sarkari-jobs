
import { fetchLatestJobs } from "@/lib/rapid-api/latest-job";
import { NextResponse } from "next/server";




export async function GET() {
  const data = await fetchLatestJobs();
    return NextResponse.json(data, {
        status: 200, 
    });
}