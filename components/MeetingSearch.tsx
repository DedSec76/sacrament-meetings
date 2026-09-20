"use client";

import { Search } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter(); 
    
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", "1");
        if(term) {
            params.set("query", term)
        } else {
            params.delete("query")
        }
        replace(`${pathName}?${params.toString()}`)

        }, 300);
    return (
        <div className="w-full md:max-w-125 mb-8 rounded-lg bg-gray-800 px-4 py-2 flex gap-2 items-center md:text-lg">
            <Search size={20}/>
            <input 
                className="outline-0 w-full"
                type="search"
                placeholder="Search by speaker, leader or meeting type..."
                defaultValue={searchParams.get("query")?.toString()}
                onChange={e => handleSearch(e.target.value)}
                aria-label="Search meetings"
            />
       </div>
    )
}