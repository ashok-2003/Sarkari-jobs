import { getCategoryImagePath } from "@/lib/imageCategory";
import prisma from "@/prisma/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { OtherCard } from "@/components/Reusable/other-page-card";




export default async function page() {

    const rawresultData = await prisma.resultItem.findMany({});
    const resultDataWithImages = rawresultData.map(result => {
        // Get the category image path based on the result's title (text field)
        const categoryImagePath = getCategoryImagePath(result.text);

        return {
            id: result.id,
            title: result.text,
            description: result.description ?? "",
            imageUrl: categoryImagePath, // Assign the determined image path here
            herf: result.href,
        };
    });

    return (
        <main className="space-y-8 py-10 px-4 md:px-8">
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6 shadow-xl rounded-2xl text-center">
                <CardContent className="space-y-4">
                    <h1 className="scroll-m-20 text-center text-4xl md:5-xl font-extrabold tracking-tight text-balance">
                        Unlock Your Sarkari Career. Instantly.
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Find the latest government result opportunities, get quick insights, and apply with ease.
                    </p>
                </CardContent>
            </Card>

            <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance
                   bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                All Results.
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 items-center justify-items-center">
                {resultDataWithImages.map((result) => (
                    <OtherCard
                        key={result.id}
                        title={result.title}
                        description={result.description ?? ""}
                        imageUrl={result.imageUrl}
                        herf={result.herf}
                        page="Result"
                    />
                ))}
            </div>
        </main>
    )
}


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Sarkari Results & Exam Scorecards | Sarkari Results",
  description: "Check the latest government exam results, merit lists, cut-off marks, and scorecard links across India. Get instant access to your Sarkari exam outcomes.",
  keywords: "Sarkari Results, Latest Govt Exam Results, Government Job Results, Exam Scorecard, Merit List, Cut-off Marks, Sarkari Naukri Results, India Exam Results, Public Sector Results",
  openGraph: {
    title: "Latest Sarkari Results & Exam Scorecards | Sarkari Results",
    description: "Check the latest government exam results, merit lists, cut-off marks, and scorecard links across India. Get instant access to your Sarkari exam outcomes.",
    url: "https://www.sarkarijobs.com/results", // Updated URL for the results page
    siteName: "Sarkari Results", // You might keep "Sarkari Jobs" if it's the main brand, or rename if "Results" is a distinct sub-brand.
    images: [
      {
        url: 'https://www.sarkarijobs.com/og-image-results.jpg', // **ACTION REQUIRED: Create this image specific to the results page!**
        width: 1200,
        height: 630,
        alt: 'Sarkari Exam Results & Scorecards',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Latest Sarkari Results & Exam Scorecards | Sarkari Results",
    description: "Check the latest government exam results, merit lists, cut-off marks, and scorecard links across India. Get instant access to your Sarkari exam outcomes.",
    images: ['https://www.sarkarijobs.com/twitter-image-results.jpg'], // **ACTION REQUIRED: Create this image specific to the results page!**
  },
  alternates: {
    canonical: 'https://www.sarkarijobs.com/results', // Your main results page URL
  },
  icons: {
    icon: '/favicon.ico', // These generally remain site-wide
    apple: '/apple-touch-icon.png', // These generally remain site-wide
  },
};