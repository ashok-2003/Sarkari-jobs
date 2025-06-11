import { JobCard, JobCardProps } from "@/components/Reusable/job-card"; // Ensure this path is correct

const sampleJobs: JobCardProps[] = [
  {
    title: "UPPSC Staff Nurse (Unani)",
    key: 1,
    last_date : "20/01/2024",
    description: "Recruitment for Unani-qualified staff nurses in UP by UPPSC, offering up to ₹1.4 L/month. Requires diploma in Unani nursing and midwifery along with U.P. Council registration. Duties include patient care, administering treatments according to Unani principles, and maintaining clinical records.",
    imageUrl: "https://images.unsplash.com/photo-1734002886107-168181bcd6a1",
    herf: "https://uppsc.up.nic.in/Notifications.aspx",
    bookmark: false,
    wishlist: false,
  },
  {
    title: "SSC CGL Assistant Section Officer",
    key: 2,
    last_date : "20/01/2024",
    description: "The Assistant Section Officer (ASO) in CSS functions as a Group B officer handling clerical tasks—file preparation, drafting reports, routine noting—and ensures coordination between Parliamentary and Secretariat offices. Payscale from ₹44.9 k to ₹1.42 L/month with DA and benefits.",
    imageUrl: "https://images.unsplash.com/photo-1746640546704-74e784dcd986",
    herf: "https://ssc.nic.in/SSCFileServer/PortalManagement/NotificationPdf/2023/Notification_CGL_2023.pdf",
    bookmark: true,
    wishlist: true,
  },
  {
    title: "RRB Technician (Railways)",
    key: 3,
    last_date : "20/01/2024",
    description: "Railway Technicians maintain and repair rolling stock such as locomotives, coaches, and signal systems. The role involves inspection, troubleshooting, diagnostics, and safety checks. Salary starts around ₹19.9 k plus dearness, medical, travel, and housing allowances.",
    imageUrl: "https://images.unsplash.com/photo-1647173047704-f6b591e82065",
    herf: "https://www.rrbcdg.gov.in/rrbcdg/noticeboard/NoticeBoard.html",
    bookmark: false,
    wishlist: true,
  },
];

export default function SampleJobs() {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleJobs.map((job, idx) => (
          <JobCard key={idx} {...job} />
        ))}
      </div>
    </div>
  );
}