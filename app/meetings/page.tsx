"use client";

import MeetingCard from "@/components/MeetingCard";
import { SacramentMeeting } from "@/lib/types";
import { useEffect, useState } from "react";

export default function meetings() {
    const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);

    useEffect(() => {
        const getMeetings = async () => {
            const response = await fetch("/api/meetings");

            if(!response.ok) {
                throw new Error("Error fetching meetings");
            }

            const data: SacramentMeeting[] = await response.json();

            setMeetings(data);
        };
        getMeetings();
    }, [])

    return (
        <main className="mt-4 mb-6 px-4">
            <h1 className="py-4 text-xl md:text-3xl font-bold text-center">Meetings</h1>
            <section className="max-w-350 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                { meetings.map(m => (
                    <MeetingCard key={m.id} {...m} />
                )) }
            </section>
        </main>
    )
}