import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Bookmark, FileText, Zap } from "lucide-react"; // Import specific icons

const featureList = [
  {
    title: "AI-Powered Summaries",
    desc: "Skip the clutter. Get concise, intelligent summaries of lengthy job PDFs in seconds.",
    icon: Zap,
  },
  {
    title: "Smart Bookmark & Tracking",
    desc: "Save jobs you care about and track application status—all from your personal dashboard.",
    icon: Bookmark,
  },
  {
    title: "Instant Admit Cards & Results",
    desc: "No delays. Get notified, download admit cards, and check results the moment they’re out.",
    icon: FileText,
  },
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featureList.map((f) => (
        <Card key={f.title} className="border-2 hover:shadow-md">
          <CardHeader className="flex items-center space-x-3">
            <f.icon className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold">{f.title}</h3>
          </CardHeader>
          <CardContent>
            <p className="font-extralight text-sm">{f.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}