"use client";

import MeetingCard from "@/components/MeetingCard";
import { SacramentMeeting } from "@/lib/types";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Page() {
    const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const getMeetings = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/meetings");

                if(!response.ok) {
                    setError("Error fetching meetings");
                }

                const data: SacramentMeeting[] = await response.json();

                setMeetings(data);
            } catch(error) {
                if(error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        }
        getMeetings();
    }, [])

    if(loading) return <Loading />

    if(error) return <p>{error}</p>

    return (
        <main className="mt-4 mb-6 px-4">
            <h1 className="py-4 text-xl md:text-3xl font-bold text-center">Meetings</h1>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                { meetings.map(m => (
                    <MeetingCard key={m.id} {...m} />
                )) }
            </section>
        </main>
    )
}