"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme , setTheme } = useTheme()

  const Toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Button variant="secondary" size="icon" className="bg-transparent" onClick={Toggle}>
      <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" /> {/* Sun hidden in dark mode */}
      <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" /> {/* Moon hidden in light, shown in dark */}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
