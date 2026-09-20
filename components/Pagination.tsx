"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page))
        return `${pathname}?${params.toString()}`
    }

    return (
        <nav aria-label="Pagination" className="mt-8 flex gap-4 items-center justify-center">
            {currentPage > 1 && (
                <Link href={createPageURL(currentPage - 1)} className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900">Previous</Link>
            )}
            <span>Page {currentPage} of {totalPages}</span>
            { currentPage < totalPages && (
                <Link href={createPageURL(currentPage + 1)} className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900">Next</Link>
            ) }
        </nav>
    )
}