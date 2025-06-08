"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, UserCircle2 } from "lucide-react"

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/modeToggle"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export const Navigation_Menu = () => {
    return (
        <div className=" fixed top-0 right-0 left-0 flex items-center justify-between p-4 my-2 shadow-md backdrop-blur-md">

            <Link href="/" className="text-4xl font-bold">
                Sarkari Jobs
            </Link>

            {/* Middle Section: Navigation Links (Visible on larger screens) */}
            <NavigationMenu className="hidden md:block"> {/* Hidden on mobile, block on medium screens and up */}
                <NavigationMenuList>
                    
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/job">Jobs</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>


                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/result">Results</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>


                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/answer-key">Answer Key</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href="/admission">Admission</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    
                </NavigationMenuList>
            </NavigationMenu>

            {/* Right Section: Buttons and Mobile Menu Trigger */}
            <div className="flex items-center space-x-4">
                {/* Login Button (Visible on large screens, or moved to dropdown on mobile) */}
                <Button variant="secondary" className="hidden md:flex items-center justify-center">Login</Button>

                <ModeToggle />

                {/* Mobile Menu Dropdown (Visible only on mobile) */}
                <div className="md:hidden"> {/* Only visible on medium screens and below */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {/* Login Button inside mobile menu */}
                            <DropdownMenuItem asChild>
                                <Link href="/login">
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator /> {/* Separator for visual distinction */}
                            {/* Navigation Links inside mobile menu */}
                            <DropdownMenuItem asChild>
                                <Link href="/jobs">
                                    Jobs
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/results">
                                    Results
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/answer-key">
                                    Answer Key
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/admission">
                                    Admission
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}