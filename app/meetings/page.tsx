import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default async function Page() {
    const meetings = await getMeetings();

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