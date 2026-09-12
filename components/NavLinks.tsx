"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavLinks = () => {
    const pathname = usePathname()
    
    return (
        <nav className="flex gap-8 mt-2 px-4">
            <Link className={`px-4 py-2 rounded-3xl ${pathname === "/meetings" ? `bg-primary text-background` : "bg-transparent"} `} href="/meetings">All Sacrament Meetings</Link>
            <Link className={`px-4 py-2 rounded-3xl ${pathname === "/meetings/current" ? `bg-primary text-background` : "bg-transparent"} `} href="meetings/current">Current Sacrament Meeting</Link>
        </nav>
    )
}