import { Card, CardContent } from "@/components/ui/card";
import { LoadingAnimation } from "@/components/Reusable/loading-animation"; 

export default function Loading() {
  return (
    <main className="space-y-8 py-10 px-4 md:px-8">
      {/* Re-render the punchline immediately */}
      <Card className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white py-12 px-6 shadow-xl rounded-2xl text-center blur-3xl">
        <CardContent className="space-y-4">
          <h1 className="scroll-m-20 text-center text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
            Unlock Your Sarkari Career. Instantly.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light">
            Find the latest government job opportunities, get quick insights, and apply with ease.
          </p>
        </CardContent>
      </Card>

      {/* "Latest Job Openings" heading */}
      <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance">
        Hold on We are Loading best content
      </h1>

      {/* Use the reusable LoadingAnimation component */}
      <LoadingAnimation message="Hold tight, it takes few seconds" />
      

    </main>
  );
}