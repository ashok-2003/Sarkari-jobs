"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, User } from "lucide-react" // Make sure User is imported here!
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
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

export const navigationMenuTriggerStyle = cva(
    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
    // No explicit dark:bg- or dark:text- here because accent/accent-foreground
    // are already defined for both light and dark modes in globals.css
);

export const Navigation_Menu = () => {
    const pathname = usePathname();

    const navItems = [
        { href: "/job", label: "Jobs" },
        { href: "/result", label: "Results" },
        { href: "/answer-key", label: "Answer Key" },
        { href: "/admission", label: "Admission" },
    ];

    return (
        <div className="fixed top-0 right-0 left-0 flex items-center justify-between p-4 shadow-md backdrop-blur-lg z-50">

            <Link href="/" className="text-4xl font-bold text-blue-600">
                Sarkari Jobs
            </Link>

            {/* Middle Section: Navigation Links (Visible on larger screens) */}
            <NavigationMenu className="hidden md:block">
                <NavigationMenuList className="space-x-4">
                    {navItems.map((item) => (
                        <NavigationMenuItem key={item.href}>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                                data-active={pathname === item.href ? true : undefined}
                            >
                                <Link
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            {/* Right Section: Buttons and Mobile Menu Trigger */}
            <div className="flex items-center space-x-4">
                
                    <Link href="/login" className=" hidden md:flex items-center hover:text-blue-600 transition-colors hover:underline hover:underline-offset-2">
                        <User className="mr-2 h-4 w-4" /> 
                        Login
                    </Link>
                

                <ModeToggle />

                {/* Mobile Menu Dropdown (Visible only on mobile) */}
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {/* Mobile Login Dropdown Item */}
                            <DropdownMenuItem asChild>
                                <Link href="/login">
                                    <User className="mr-0.5 h-4 w-4" /> {/* User icon for mobile login */}
                                    Login
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {navItems.map((item) => (
                                <DropdownMenuItem key={item.href} asChild>
                                    <Link href={item.href}>
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}