import { getMeetings } from "@/lib/meetings-db";
import { redirect } from "next/navigation";

export default async function Page() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek)
    
    const formatDate = sunday.toISOString().split("T")[0];
    
    const meetings = await getMeetings(formatDate)
    
    if(!meetings.length) redirect("/meetings")

    redirect(`/meetings/${meetings[0].id}`)
}