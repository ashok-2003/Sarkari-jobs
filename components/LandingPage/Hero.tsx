import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react"; // Import ArrowRight if used in Hero
import Link from "next/link";

export default function Hero() {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-8 shadow-xl rounded-2xl">
      <CardContent className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          The Ultimate Destination for Sarkari Jobs & Results
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
          Simplify your job hunt — discover latest govt jobs, save your favorites, and track results effortlessly. Your one-stop platform for every opportunity.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href={"/jobs"}>
            <Button size="lg" className="text-base font-semibold">
              Explore Jobs
            </Button>
          </Link>
          <Button size="lg" variant="ghost" className="text-base font-semibold group">
            Sign Up Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}