import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export default async function MeetingsPage(props: {
    searchParams?: Promise<{ query?: string, page?: string }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) || 1

    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query)
    ])
    
    return (
        <main className="mt-4 mb-6 px-4">
            <h2 className="py-4 text-xl md:text-3xl font-bold text-center">Meetings</h2>
            <MeetingSearch />

            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                { meetings.map(m => (
                    <MeetingCard key={m.id} {...m} />
                )) }
            </section>
            <Pagination totalPages={totalPages} />
        </main>
    )
}