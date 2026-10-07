import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";
import EditMeetingForm from "./edit-form";

type Props = {
    params: Promise<{ id: string }>
}
export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id))

    if(!meeting) {
        return {
            title: 'Meeting Not Found',
            description: 'The requested meeting project could not be found.'
        }
    }

    return {
        title: meeting.meetingType,
        description: meeting.announcements,
        openGraph: {
            title: meeting.meetingType,
            description: meeting.announcements,
            image: '@/app/opengraph-image.png'
        }
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id));
    
    if (!meeting) {
        notFound();
    }

    return <EditMeetingForm id={id} meeting={meeting} />
}