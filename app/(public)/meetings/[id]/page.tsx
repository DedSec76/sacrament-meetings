import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
type Props = {
    params: Promise<{ id: string }> 
}
export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const meeting = await getMeetingById(Number(id))

    if(!meeting) {
        return {
            title: 'Meeting Not Found',
            description: 'The requested meeting project could not be found.',
        }
    }

    return {
        title: `${meeting.id} ${meeting.meetingType}`,
        description: meeting?.announcements?.join(","),
    }
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    const meetingId = Number(id)
   
    return (
        <main>
            <MeetingDetail meetingId={meetingId} />
        </main>
    ) 
}