import { getCategoryImagePath } from "@/lib/imageCategory";
import prisma from "@/prisma/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { OtherCard } from "@/components/Reusable/other-page-card";




export default async function page() {

    const rawadmitcardData = await prisma.admitCardItem.findMany({});
    const admitcardDataWithImages = rawadmitcardData.map(admitcard => {
        // Get the category image path based on the admitcard's title (text field)
        const categoryImagePath = getCategoryImagePath(admitcard.text);

        return {
            id: admitcard.id,
            title: admitcard.text,
            description: admitcard.description ?? "",
            imageUrl: categoryImagePath, // Assign the determined image path here
            herf: admitcard.href,
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
                        Find the latest government admitcard opportunities, get quick insights, and apply with ease.
                    </p>
                </CardContent>
            </Card>

            <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance
                   bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                All Admit Cards.
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 items-center justify-items-center">
                {admitcardDataWithImages.map((admitcard) => (
                    <OtherCard
                        key={admitcard.id}
                        title={admitcard.title}
                        description={admitcard.description ?? ""}
                        imageUrl={admitcard.imageUrl}
                        herf={admitcard.herf}
                        page="Admit Card"
                    />
                ))}
            </div>
        </main>
    )
}


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sarkari Admit Card Download | Latest Government Exam Hall Tickets",
  description: "Download your latest government exam admit cards and hall tickets. Get direct links and updates for all Sarkari exam admit card releases across India.",
  keywords: "Sarkari Admit Card, Government Exam Hall Ticket, Download Admit Card, Exam Date, Exam Center, Roll Number, Latest Admit Card, Sarkari Naukri Admit Card, India Exam Admit Card",
  openGraph: {
    title: "Sarkari Admit Card Download | Latest Government Exam Hall Tickets",
    description: "Download your latest government exam admit cards and hall tickets. Get direct links and updates for all Sarkari exam admit card releases across India.",
    url: "https://www.sarkarijobs.com/admit-card", // Updated URL for the admit card page
    siteName: "Sarkari Admit Card", // You might keep "Sarkari Jobs" if it's the main brand, or rename if "Admit Card" is a distinct sub-brand.
    images: [
      {
        url: 'https://www.sarkarijobs.com/og-image-admit-card.jpg', // **ACTION REQUIRED: Create this image specific to the admit card page!**
        width: 1200,
        height: 630,
        alt: 'Sarkari Admit Card Download',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sarkari Admit Card Download | Latest Government Exam Hall Tickets",
    description: "Download your latest government exam admit cards and hall tickets. Get direct links and updates for all Sarkari exam admit card releases across India.",
    images: ['https://www.sarkarijobs.com/twitter-image-admit-card.jpg'], // **ACTION REQUIRED: Create this image specific to the admit card page!**
  },
  alternates: {
    canonical: 'https://www.sarkarijobs.com/admit-card', // Your main admit card page URL
  },
  icons: {
    icon: '/favicon.ico', // These generally remain site-wide
    apple: '/apple-touch-icon.png', // These generally remain site-wide
  },
};