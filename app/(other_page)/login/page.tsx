"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

export default function Page() {
    const searchPrams = useSearchParams();
    const callbackUrl = searchPrams.get("callbackUrl") || "/";
    const handleGoogleSingin = async () => {
        await signIn("google", { callbackUrl })
    }

    return (
        <div className="mt-48 flex flex-col justify-center items-center">
            <h1 className="scroll-m-20 text-center text-xl font-extrabold tracking-tight text-balance">
                Woohhoo, Welcome Back.
            </h1>
            <Button onClick={handleGoogleSingin} className="mt-8 px-16 py-8 gap-0 "
                variant={"outline"}
            >
                <p className="scroll-m-20 text-3xl font-semibold tracking-tight  bg-linear-to-r from-yellow-800 via-yellow-500 to-yellow-700 bg-clip-text text-transparent font-stretch-50% font-serif">
                    continue with Google.
                </p>
                <ChevronRightIcon size={128}/>
            </Button>
            <Link href="/" className="mt-4 text-sm text-blue-500 hover:underline">
                Back to Home
            </Link>
        </div>
    )
}