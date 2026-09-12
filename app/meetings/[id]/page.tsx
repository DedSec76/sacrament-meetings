
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params

    const meetingId = Number(id);

    if(isNaN(meetingId)) return <p>Invalid meeting ID</p>

    const meeting = getMeetingById(meetingId);

    if(!meeting) return <p>Meeting not found</p>
    
    return <MeetingDetail {...meeting} />
       
}