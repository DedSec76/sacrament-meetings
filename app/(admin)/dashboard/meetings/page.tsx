import MeetingRow from "@/components/MeetingRow";
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
        <>
            <h1 className="my-4 text-2xl md:text-3xl font-bold text-center">Admin Dashboard</h1>

            <section className="mt-6 flex flex-col gap-4 lg:gap-8 px-4">
                { meetings.map(m => (
                    <MeetingRow key={m.id} {...m} />
                )) }
            </section>
            <Pagination totalPages={totalPages} />
        </>
    )
}