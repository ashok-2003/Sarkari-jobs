import { makeRapidApiCall } from "@/lib/rapidapi";
import { NextResponse } from "next/server";

export async function GET(){
    const fullResponse = await makeRapidApiCall("/scrape/latestjob");
    return NextResponse.json({
        fullResponse
    })
}