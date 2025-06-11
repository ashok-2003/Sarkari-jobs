import { getCategoryImagePath } from "@/lib/imageCategory";
import prisma from "@/prisma/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { OtherCard } from "@/components/Reusable/other-page-card";




export default async function page() {

    const rawsyllabusData = await prisma.syllabusItem.findMany({});
    const syllabusDataWithImages = rawsyllabusData.map(syllabus => {
        // Get the category image path based on the syllabus's title (text field)
        const categoryImagePath = getCategoryImagePath(syllabus.text);

        return {
            id: syllabus.id,
            title: syllabus.text,
            description: syllabus.description ?? "",
            imageUrl: categoryImagePath, // Assign the determined image path here
            herf: syllabus.href,
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
                        Find the latest government syllabus opportunities, get quick insights, and apply with ease.
                    </p>
                </CardContent>
            </Card>

            <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance
                   bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                All syllabuss.
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 items-center justify-items-center">
                {syllabusDataWithImages.map((syllabus) => (
                    <OtherCard
                        key={syllabus.id}
                        title={syllabus.title}
                        description={syllabus.description ?? ""}
                        imageUrl={syllabus.imageUrl}
                        herf={syllabus.herf}
                        page="syllabus"
                    />
                ))}
            </div>
        </main>
    )
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Government Exam Syllabus & Exam Patterns | Sarkari Syllabus",
  description: "Find the most up-to-date syllabus and exam patterns for all major government job examinations across India. Prepare effectively with detailed topic breakdowns and official guidelines.",
  keywords: "Sarkari Syllabus, Latest Govt Exam Syllabus, Government Job Syllabus, Exam Pattern, UPSC Syllabus, SSC Syllabus, Bank Exam Syllabus, Railway Exam Syllabus, State PSC Syllabus, Detailed Syllabus, Official Syllabus, Sarkari Naukri Syllabus",
  openGraph: {
    title: "Latest Government Exam Syllabus & Exam Patterns | Sarkari Syllabus",
    description: "Find the most up-to-date syllabus and exam patterns for all major government job examinations across India. Prepare effectively with detailed topic breakdowns and official guidelines.",
    url: "https://www.sarkarijobs.com/syllabus", // **Update this to your actual syllabus page URL**
    siteName: "Sarkari Syllabus", // Consider if "Sarkari Jobs" is the main brand, or "Syllabus" is a distinct sub-brand.
    images: [
      {
        url: 'https://www.sarkarijobs.com/og-image-syllabus.jpg', // **ACTION REQUIRED: Create a specific Open Graph image for the syllabus page!**
        width: 1200,
        height: 630,
        alt: 'Sarkari Exam Syllabus & Patterns',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Latest Government Exam Syllabus & Exam Patterns | Sarkari Syllabus",
    description: "Find the most up-to-date syllabus and exam patterns for all major government job examinations across India. Prepare effectively with detailed topic breakdowns and official guidelines.",
    images: ['https://www.sarkarijobs.com/twitter-image-syllabus.jpg'], // **ACTION REQUIRED: Create a specific Twitter image for the syllabus page!**
  },
  alternates: {
    canonical: 'https://www.sarkarijobs.com/syllabus', // Your main syllabus page URL
  },
  icons: {
    icon: '/favicon.ico', // These are typically site-wide
    apple: '/apple-touch-icon.png', // These are typically site-wide
  },
};