import { Card } from "@/components/ui/card"; // Assuming Card is needed here

const aboutContent = {
  mainTitle: "Sarkari Jobs: Your Gateway to Government Career Success",
  introParagraph: `The future is uncertain, but a Sarkari Job can help you secure your future. Explore our valuable resources and guidance at Sarkari Jobs to find your path. Did you know that over 1.5 million people lost their jobs in August 2021 in rural and urban India? Yes, the COVID-19 pandemic has hit the job market hard. Small businesses and multinationals alike have had to reconsider their staffing requirements.`,
  secureCareerSection: {
    title: "Are You Looking for a Secure Career?",
    points: [
      "Are you an unemployed Indian citizen impacted by the pandemic and fluctuating job market?",
      "Are you working for a multinational company going through restructuring and considering your next steps?",
      "Are you a recent graduate looking to find your first job?",
      "Are you wondering if a government job is right for you?",
    ],
  },
  whyChooseGovJobSection: {
    title: "Why Choose a Government Job?",
    paragraph: `In India, a Sarkari Naukri is highly sought-after. It's the ultimate career goal, offering long-term security, good benefits, and a purposeful life. With unemployment rising, the demand for stable Sarkari Naukri has surged. Government jobs offer competitive salaries, benefits, and pensions. Top roles include IAS, IFS, and IPS.`,
  },
  exploreJobsSection: {
    mainTitle: "Explore Diverse Government Job Opportunities",
    introParagraph: `There are a wide variety of government job opportunities in India, catering to diverse interests and qualifications.`,
    jobTypes: [
      {
        title: "1. Indian Administrative Services (IAS) and Indian Foreign Services (IFS) Jobs",
        description: `IAS officers advise ministers and implement policies, while IFS officers manage India's foreign relations globally. Starting monthly salary is approximately INR 56,100.`,
      },
      {
        title: "2. Indian Police Services (IPS) Jobs",
        description: `IPS roles involve safeguarding the public and maintaining law and order across various agencies like R&AW, IB, CBI, and CID. Eligibility includes strict physical standards. An entry-level police constable can earn an average total compensation of INR 255,094 (Payscale data).`,
      },
      {
        title: "3. Banking Jobs",
        description: `Highly sought-after roles in government-approved banks like SBI, Allahabad Bank, HDFC, and ICICI. Positions range from clerical to Probationary Officer (PO) roles with a starting monthly salary of about INR 57,000.`,
      },
      {
        title: "4. Defence Jobs",
        description: `Opportunities within the National Defence Academy (NDA) across Army, Navy, Air Force, Coast Guard, etc. These roles have strict age, physical, and vision standards. Cadet trainees receive a stipend of INR 56,100 per month. Sarkari Jobs simplifies finding these diverse positions, from police constables to High Court Review Officers, by providing all necessary details.`,
      },
    ],
  },
  navigatingMarketSection: {
    mainTitle: "Navigating the Competitive Government Job Market",
    introParagraph: `Securing a Sarkari Naukri is challenging due to high competition, but with the right strategy and resources, it's achievable.`,
    steps: [
      {
        title: "Step 1: Research Job Requirements with Sarkari Jobs",
        paragraph: `Before applying, understand eligibility, deadlines, fees, and examination processes. Sarkari Jobs provides a comprehensive one-page summary for each role, covering:`,
        list: [
          "Number of Vacancies",
          "Important Dates (Application Start/End, Exam Dates)",
          "Application Fee",
          "Education Eligibility",
          "Age Limit",
          "Exam Notice & Online Application Link",
        ],
      },
      {
        title: "Understanding Eligibility & Deadlines",
        paragraph: `Government job eligibility varies greatly by role, encompassing age, education, nationality, and more. Our platform ensures you have all key dates at your fingertips, so you never miss an opportunity. Sarkari Jobs displays critical dates like Application Start/Last Date, Exam Fee Deadlines, Examination Dates, and Result Availability, ensuring you're always informed.`,
      },
    ],
  },
  trustedSourceSection: {
    mainTitle: "Sarkari Jobs: Your Trusted Source for Updates",
    introParagraph: `SarkariJobs.com is your ultimate resource for all government job updates, results, and notifications, including Sarkari Exams from state and central governments.`,
    subSections: [
      {
        title: "State-Level Exam Results & Jobs",
        paragraph: `Find Sarkari Jobs in Bihar, Sarkari Jobs in Jharkhand, and especially UP Sarkari Jobs, which are in high demand. We provide detailed information for all state-conducted exams.`,
        title2: "Online Application Process Simplified",
        paragraph2: `Applying for Sarkari Naukri online is easier than ever. SarkariJobs.com lists thousands of online forms. We keep you updated on all stages, from application to exam results.`,
      },
      {
        title: "Delhi Government Job Opportunities",
        paragraph: `Delhi, being the capital, offers numerous government jobs from both state and central departments. Sarkari Jobs Delhi provides admit cards, results, and answer keys from institutions like DSSSB, Delhi Metro, Delhi Police, and AIIMS Delhi.`,
        title2: "Why Trust SarkariJobs.com?",
        paragraph2: `Established on January 1, 2012, SarkariJobs.com has earned the trust of millions. Our dedicated 24x7 team ensures you receive the first and most accurate information on government jobs, exam results, admit cards, and exam dates for SSC, UPSC, and state/central government recruitments. Download the <span class="font-semibold">Sarkari Jobs App</span> today to get all information at your fingertips!`,
      },
    ],
  },
  finalParagraph: `At Sarkari Jobs, we're committed to helping you achieve your dream of a secure and fulfilling career in the government sector. Explore our platform, leverage our resources, and take the first step towards your Sarkari Naukri today!`,
};

export default function AboutUsSection() {
  return (
    <section className="bg-muted py-16 px-6 md:px-16 lg:px-24 rounded-2xl">
      <div className="max-w-6xl mx-auto space-y-10">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          {aboutContent.mainTitle}
        </h2>

        <p className="text-lg leading-relaxed text-muted-foreground">
          {aboutContent.introParagraph}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {aboutContent.secureCareerSection.title}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {aboutContent.secureCareerSection.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">
              {aboutContent.whyChooseGovJobSection.title}
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              {aboutContent.whyChooseGovJobSection.paragraph}
            </p>
          </div>
        </div>

        <h3 className="text-3xl font-bold text-center pt-8 mb-8">
          {aboutContent.exploreJobsSection.mainTitle}
        </h3>
        <p className="text-lg leading-relaxed text-center mb-8 text-muted-foreground">
          {aboutContent.exploreJobsSection.introParagraph}
        </p>

        <div className="space-y-8">
          {aboutContent.exploreJobsSection.jobTypes.map((jobType, index) => (
            <Card key={index} className="p-6 bg-card">
              <h4 className="text-xl font-semibold mb-2">{jobType.title}</h4>
              <p className="leading-relaxed text-muted-foreground">
                {jobType.description}
              </p>
            </Card>
          ))}
        </div>

        <h3 className="text-3xl font-bold text-center pt-8 mb-8">
          {aboutContent.navigatingMarketSection.mainTitle}
        </h3>
        <p className="text-lg leading-relaxed text-center mb-8 text-muted-foreground">
          {aboutContent.navigatingMarketSection.introParagraph}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aboutContent.navigatingMarketSection.steps.map((step, index) => (
            <Card key={index} className="p-6 bg-card">
              <h4 className="text-xl font-semibold mb-4">{step.title}</h4>
              <p className="leading-relaxed mb-4 text-muted-foreground">
                {step.paragraph}
              </p>
              {step.list && (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {step.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>

        <h3 className="text-3xl font-bold text-center pt-8 mb-8">
          {aboutContent.trustedSourceSection.mainTitle}
        </h3>
        <p className="text-lg leading-relaxed text-center mb-8 text-muted-foreground">
          {aboutContent.trustedSourceSection.introParagraph}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aboutContent.trustedSourceSection.subSections.map((subSection, index) => (
            <Card key={index} className="p-6 bg-card">
              <h4 className="text-xl font-semibold mb-4">{subSection.title}</h4>
              <p className="leading-relaxed mb-4 text-muted-foreground">
                {subSection.paragraph}
              </p>
              {subSection.title2 && (
                <>
                  <h4 className="text-xl font-semibold mb-4 mt-6">{subSection.title2}</h4>
                  <p className="leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: subSection.paragraph2 }} />
                </>
              )}
            </Card>
          ))}
        </div>

        <p className="text-lg leading-relaxed text-center pt-8 text-muted-foreground">
          {aboutContent.finalParagraph}
        </p>
      </div>
    </section>
  );
}