import { SacramentMeeting } from "@/lib/types";

export default function MeetingDetail(meeting: SacramentMeeting) {
    

    return (
        <article className="max-w-[1200px] bg-gray-800 mt-16 mx-6 mb-32 flex flex-col gap-4">
            <h3 className="font-bold text-lg">Date: <span className="font-normal">{meeting.date}</span></h3>
            <p className="font-bold">Meeting Type: <span className="font-normal">{meeting.meetingType}</span></p>
            <p className="font-bold">Presiding: <span className="font-normal">{meeting.presiding}</span></p>
            <p className="font-bold">Conducting: <span className="font-normal">{meeting.conducting}</span></p>
            <div>
                <p className="font-bold">Announcements:</p> 
                <ul>{meeting?.announcements?.map((a, i) => (
                    <li key={i}>{a}</li>
                ))}
                </ul>
            </div>
            
            <p className="font-bold">OpeningHymn: number: 85,
               title: How Firm a Foundation
            </p>
            <p className="font-bold">Opening Prayer: <span className="font-normal">{meeting.openingPrayer}</span></p>
            <p className="font-bold">Ward Business: description: Sustaining of new Relief Society secretary</p>
            <p className="font-bold">Stake Business: false</p>
            <p className="font-bold">Sacrament Hymn: number: 193,
                title: I Stand All Amazed
            </p>
            <p className="font-bold">speakers: 
                    name: Brother Samuel
                    topic: Strengthening Our Faith
                    type: speaker
                <br />
                    name: Sister Elena
                    topic: Serving Others
                    type: speaker
            </p>
            <p className="font-bold">
                closingHymn: number: 227,
                title: Improve the Shining Moments
            </p>
            <p className="font-bold">Closing Prayer: <span className="font-normal">{meeting.closingPrayer}</span></p>
        </article>
    )
}