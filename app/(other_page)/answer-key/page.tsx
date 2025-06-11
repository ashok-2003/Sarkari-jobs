import { getCategoryImagePath } from "@/lib/imageCategory";
import prisma from "@/prisma/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { OtherCard } from "@/components/Reusable/other-page-card";




export default async function page() {

    const rawanswerkeyData = await prisma.answerKeyItem.findMany({});
    const answerkeyDataWithImages = rawanswerkeyData.map(answerkey => {
        // Get the category image path based on the answerkey's title (text field)
        const categoryImagePath = getCategoryImagePath(answerkey.text);

        return {
            id: answerkey.id,
            title: answerkey.text,
            description: answerkey.description ?? "",
            imageUrl: categoryImagePath, // Assign the determined image path here
            herf: answerkey.href,
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
                        Find the latest government answerkey opportunities, get quick insights, and apply with ease.
                    </p>
                </CardContent>
            </Card>

            <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance
                   bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                All Answer Key.
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 m-4 items-center justify-items-center">
                {answerkeyDataWithImages.map((answerkey) => (
                    <OtherCard
                        key={answerkey.id}
                        title={answerkey.title}
                        description={answerkey.description ?? ""}
                        imageUrl={answerkey.imageUrl}
                        herf={answerkey.herf}
                        page="Answer Key"
                    />
                ))}
            </div>
        </main>
    )
}


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sarkari Answer Key Download | Latest Government Exam Solutions",
  description: "Check and download the latest government exam answer keys and question paper solutions. Verify your answers and estimate your score for all Sarkari exams.",
  keywords: "Sarkari Answer Key, Government Exam Solutions, Download Answer Key, Question Paper Solutions, Exam Analysis, Score Estimation, Latest Answer Key, Sarkari Naukri Answer Key, India Exam Answer Key",
  openGraph: {
    title: "Sarkari Answer Key Download | Latest Government Exam Solutions",
    description: "Check and download the latest government exam answer keys and question paper solutions. Verify your answers and estimate your score for all Sarkari exams.",
    url: "https://www.sarkarijobs.com/answer-key", // Updated URL for the answer key page
    siteName: "Sarkari Answer Key", // Consider keeping "Sarkari Jobs" as the main brand if applicable.
    images: [
      {
        url: 'https://www.sarkarijobs.com/og-image-answer-key.jpg', // **ACTION REQUIRED: Create this image specific to the answer key page!**
        width: 1200,
        height: 630,
        alt: 'Sarkari Exam Answer Keys & Solutions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sarkari Answer Key Download | Latest Government Exam Solutions",
    description: "Check and download the latest government exam answer keys and question paper solutions. Verify your answers and estimate your score for all Sarkari exams.",
    images: ['https://www.sarkarijobs.com/twitter-image-answer-key.jpg'], // **ACTION REQUIRED: Create this image specific to the answer key page!**
  },
  alternates: {
    canonical: 'https://www.sarkarijobs.com/answer-key', // Your main answer key page URL
  },
  icons: {
    icon: '/favicon.ico', // These generally remain site-wide
    apple: '/apple-touch-icon.png', // These generally remain site-wide
  },
};