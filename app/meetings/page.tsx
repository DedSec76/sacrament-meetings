"use client";
import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page() {
    const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
    
    useEffect(() => {
        const getFetchData = async () => {
            try {
                const response = await fetch("/api/meetings");

                if(!response.ok) throw new Error("Error fetching data")

                const data: SacramentMeeting[] = await response.json();
                
                setMeetings(data)
            } catch (error) {
                console.error(error)
            }
        }
        getFetchData();
    }, [])
    

    return (
        <main className="mt-4 mb-6 px-4">
            <h2 className="py-4 text-xl md:text-3xl font-bold text-center">Meetings</h2>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                { meetings.map(m => (
                    <MeetingCard key={m.id} {...m} />
                )) }
            </section>
        </main>
    )
}