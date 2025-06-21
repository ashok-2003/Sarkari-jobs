"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LogOut, UserIcon } from "lucide-react" // Ensure UserIcon is imported
import { cva } from "class-variance-authority"
import { useSession, signOut } from "next-auth/react"

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/Reusable/modeToggle"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar" // Assuming this path is correct

export const navigationMenuTriggerStyle = cva(
    "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

export const Navigation_Menu = () => {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const navItems = [
        { href: "/jobs", label: "Jobs" },
        { href: "/result", label: "Results" },
        { href: "/admission", label: "Admission" },
        { href: "/answer-key", label: "Answer Key" },
        { href: "/admit-card", label: "Admit Cards" },
        { href: "/syllabus", label: "Syllabus" },
    ];

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' }); // Redirect to homepage after logout
    };

    return (
        <div className="fixed top-0 right-0 left-0 flex items-center justify-between p-4 shadow-md backdrop-blur-xl z-50">

            <Link href="/">
                <p className="text-2xl md:text-4xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 font-extrabold tracking-tight text-balance bg-clip-text text-transparent">
                    Sarkari Jobs
                </p>
            </Link>

            {/* Middle Section: Navigation Links (Visible on larger screens) */}
            <NavigationMenu className="hidden lg:block">
                <NavigationMenuList className="space-x-4">
                    {navItems.map((item) => (
                        <NavigationMenuItem key={item.href}>
                            <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                                data-active={pathname === item.href ? true : undefined}
                            >
                                <Link href={item.href}>
                                    {item.label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            {/* Right Section: Buttons and Mobile Menu Trigger */}
            <div className="flex items-center space-x-4">
                {status === "authenticated" ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar>
                                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User Avatar"} />
                                    {/* Fallback to initials or a generic icon */}
                                    <AvatarFallback>
                                        {session.user?.name ? session.user.name.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5" />}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Open user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" forceMount>
                            {session.user?.name && (
                                <DropdownMenuItem className="flex flex-col items-start px-4 py-2 text-sm font-normal">
                                    <p className="font-medium">{session.user.name}</p>
                                    <p className="text-xs text-muted-foreground">{session.user.email}</p>
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleSignOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    // User is not logged in (unauthenticated) - always show login link
                    <Link href="/login" className="flex items-center hover:text-blue-600 transition-colors hover:underline hover:underline-offset-2">
                        <UserIcon size={18} className="mr-1" /> Login
                    </Link>
                )}
                

                {/* dark mode toggle  */}
                <ModeToggle /> 

                {/* Mobile Menu Dropdown (Visible only on mobile) */}
                <div className="lg:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
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