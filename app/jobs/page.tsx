import { JobCard } from "@/components/Reusable/job-card";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryImagePath } from "@/lib/imageCategory";
import prisma from "@/prisma/prisma"

export default async function page () {
  // const delay = new Promise((resolve) => setTimeout(resolve , 20000));
  const rawJobData = await prisma.jobItem.findMany({});
  const JobDataWithImages = rawJobData.map(job => {
    // Get the category image path based on the job's title (text field)
    const categoryImagePath = getCategoryImagePath(job.text);

    return {
      id: job.id,
      title: job.text,
      description: job.description ?? "",
      imageUrl: categoryImagePath, // Assign the determined image path here
      herf: job.href,
      last_date: job.last_date
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
            Find the latest government job opportunities, get quick insights, and apply with ease.
          </p>
        </CardContent>
      </Card>

      <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance
                   bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
        Latest Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 m-4 items-center justify-items-center">
        {JobDataWithImages.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            description={job.description ?? ""}
            imageUrl={job.imageUrl}
            herf={job.herf}
            last_date={job.last_date ?? ""}
          />
        ))}
      </div>
    </main>
  )
}


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Sarkari Jobs - Find Government Job Opportunities | Sarkari Jobs",
  description: "Explore the latest government job postings across India. Our simplified platform helps you discover, track, and apply for Sarkari jobs with ease.",
  keywords: "Sarkari Jobs, Latest Govt Jobs, Government Job Vacancy, Apply Online, Job Search India, Public Sector Jobs, Sarkari Naukri, Jobs in India",
  openGraph: {
    title: "Latest Sarkari Jobs - Find Government Job Opportunities | Sarkari Jobs",
    description: "Explore the latest government job postings across India. Our simplified platform helps you discover, track, and apply for Sarkari jobs with ease.",
    url: "https://www.sarkarijobs.com/jobs", // Replace with your actual domain for this page
    siteName: "Sarkari Jobs",
    images: [
      {
        url: 'https://www.sarkarijobs.com/og-image-jobs.jpg', // Placeholder: Create this image specific to jobs page!
        width: 1200,
        height: 630,
        alt: 'Sarkari Jobs Listings',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Latest Sarkari Jobs - Find Government Job Opportunities | Sarkari Jobs",
    description: "Explore the latest government job postings across India. Our simplified platform helps you discover, track, and apply for Sarkari jobs with ease.",
    images: ['https://www.sarkarijobs.com/twitter-image-jobs.jpg'], // Placeholder: Create this image!
  },
  alternates: {
    canonical: 'https://www.sarkarijobs.com/jobs', // Your main jobs page URL
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
