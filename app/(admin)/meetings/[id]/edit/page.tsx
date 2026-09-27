import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";
import EditMeetingForm from "./edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const meeting = await getMeetingById(Number(params.id));
    
    if (!meeting) {
        notFound();
    }

    return <EditMeetingForm id={params.id} meeting={meeting} />
}