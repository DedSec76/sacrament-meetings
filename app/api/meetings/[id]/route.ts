import { getMeetingById } from "@/lib/meetings-db"

export const GET = async(request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const url = await params
    const meetingId = Number(url.id)

    if(isNaN(meetingId)) return Response.json({message: "Id is not a number"}, { status: 400 })

    const meeting = await getMeetingById(meetingId)
    if(!meeting) return Response.json({ message: "Meeting not found"}, { status: 404 })
    
    return Response.json(meeting)
}