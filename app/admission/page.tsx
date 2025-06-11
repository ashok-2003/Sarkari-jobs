import { AdmissionCard } from "@/components/Reusable/admission-card";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryImagePath } from "@/lib/imageCategory";
import prisma from "@/prisma/prisma"


export default async function page() {
    // admission page can also use the jobcard props as they have similary susctures so yeh it's ok but we will make admission 
    // card  different 

    const rawadmissionData = await prisma.admissionItem.findMany({});
    const admissionDataWithImages = rawadmissionData.map(admission => {
        // Get the category image path based on the admission's title (text field)
        const categoryImagePath = getCategoryImagePath(admission.text);

        return {
            id: admission.id,
            title: admission.text,
            description: admission.description ?? "",
            imageUrl: categoryImagePath, // Assign the determined image path here
            herf: admission.href,
            last_date: admission.last_date
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
                        Find the latest government Admission opportunities, get quick insights, and apply with ease.
                    </p>
                </CardContent>
            </Card>

            <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance
                   bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Latest Admission Openings
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 m-4 items-center justify-items-center">
                {admissionDataWithImages.map((admission) => (
                    <AdmissionCard
                        key={admission.id}
                        title={admission.title}
                        description={admission.description ?? ""}
                        imageUrl={admission.imageUrl}
                        herf={admission.herf}
                        last_date={admission.last_date ?? ""}
                    />
                ))}
            </div>
        </main>
    )
}



import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Sarkari Admissions & Exam Notifications | Sarkari Admissions",
  description: "Find the latest government exam admission notifications, application dates, and eligibility criteria across India. Simplify your Sarkari exam application process.",
  keywords: "Sarkari Admissions, Latest Govt Exams, Government Exam Notifications, Application Form, Admit Card, Exam Dates, Public Sector Admissions, Sarkari Naukri Admissions, India Exam Alerts",
  openGraph: {
    title: "Latest Sarkari Admissions & Exam Notifications | Sarkari Admissions",
    description: "Find the latest government exam admission notifications, application dates, and eligibility criteria across India. Simplify your Sarkari exam application process.",
    url: "https://www.sarkarijobs.com/admissions", // Updated URL for the admissions page
    siteName: "Sarkari Admissions", // You might want to keep this as "Sarkari Jobs" if it's the main brand, or rename if the "Admissions" section is a distinct sub-brand. I've changed it here for demonstration.
    images: [
      {
        url: 'https://www.sarkarijobs.com/og-image-admissions.jpg', // **ACTION REQUIRED: Create this image specific to the admissions page!**
        width: 1200,
        height: 630,
        alt: 'Sarkari Admissions & Exam Notifications',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Latest Sarkari Admissions & Exam Notifications | Sarkari Admissions",
    description: "Find the latest government exam admission notifications, application dates, and eligibility criteria across India. Simplify your Sarkari exam application process.",
    images: ['https://www.sarkarijobs.com/twitter-image-admissions.jpg'], // **ACTION REQUIRED: Create this image specific to the admissions page!**
  },
  alternates: {
    canonical: 'https://www.sarkarijobs.com/admissions', // Your main admissions page URL
  },
  icons: {
    icon: '/favicon.ico', // These usually remain site-wide
    apple: '/apple-touch-icon.png', // These usually remain site-wide
  },
};