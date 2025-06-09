import Image from "next/image";
// Import your components from their new locations
import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import SampleJobs from "@/components/LandingPage/SampleJobs";
import AboutUsSection from "@/components/LandingPage/AboutUsSection";


import type { Metadata } from "next";

export const metadata: Metadata = { // Changed from sarkariJobsMetadata to metadata for Next.js convention
  title: "Sarkari Jobs: Secure Your Future with Government Job Opportunities in India",
  description: "Find the latest Sarkari Job alerts, exam results, and admissions in India. Sarkari Jobs provides comprehensive resources to help you land a stable government job and build a purposeful career.",
  keywords: "Sarkari Jobs, Government Jobs India, Sarkari Naukri, Latest Govt Jobs, Job Alerts, Exam Results, Answer Key, Admission, UPSC, SSC, Banking Jobs, Defence Jobs, State Govt Jobs, UP Police, Bihar Police, Delhi Govt Jobs, Government Job Vacancy, Sarkari Exam",
  openGraph: {
    title: "Sarkari Jobs: Secure Your Future with Government Job Opportunities in India",
    description: "Find the latest Sarkari Job alerts, exam results, and admissions in India. Sarkari Jobs provides comprehensive resources to help you land a stable government job and build a purposeful career.",
    url: "https://www.sarkarijobs.com", // Replace with your actual domain
    siteName: "Sarkari Jobs",
    images: [
      {
        url: 'https://www.sarkarijobs.com/og-image.jpg', // Placeholder: Create this image!
        width: 1200,
        height: 630,
        alt: 'Sarkari Jobs Website',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sarkari Jobs: Secure Your Future with Government Job Opportunities in India",
    description: "Find the latest Sarkari Job alerts, exam results, and admissions in India. Sarkari Jobs provides comprehensive resources to help you land a stable government job and build a purposeful career.",
    images: ['https://www.sarkarijobs.com/twitter-image.jpg'], // Placeholder: Create this image!
  },
  alternates: {
    canonical: 'https://www.sarkarijobs.com/', // Your main homepage URL
  },
  icons: {
    icon: '/favicon.ico', // Ensure this exists in your /public folder
    apple: '/apple-touch-icon.png', // Ensure this exists in your /public folder
  },
};


export default function HomePage() {
  return (
    <main className="space-y-16 py-10 px-6 md:px-16">
      <Hero />
      <section>
        <h2 className="text-4xl font-bold text-center mb-12">Core Features</h2>
        <Features />
      </section>
      <section className="w-full max-w-5xl mx-auto px-4 rounded-2xl">
        <Image src="/job-searching.svg" width={1920} height={0} className="w-full h-auto object-contain rounded-2xl" alt="Job search illustration" />
      </section>
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Try a Few Sample Jobs</h2>
        <SampleJobs />
      </section>
      <section>
        <AboutUsSection />
      </section>
    </main>
  );
}