"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavLinks = () => {
    const pathname = usePathname()
    
    return (
        <nav className="max-w-200 md:mx-auto flex gap-8 mt-4 px-4 pb-4 border-b border-gray-800">
            <Link className={`px-4 py-2 rounded-3xl hover:underline ${pathname === "/meetings" ? `bg-primary text-background` : "bg-transparent"} `} href="/meetings" replace>All Sacrament Meetings</Link>
            <Link className={`px-4 py-2 rounded-3xl hover:underline ${pathname === "/meetings/current" ? `bg-primary text-background` : "bg-transparent"} `} href="/meetings/current" replace>Current Sacrament Meeting</Link>
        </nav>
    )
}