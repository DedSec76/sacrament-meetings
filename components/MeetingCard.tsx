import Link from "next/link";
import { SacramentMeeting } from "../lib/types";

export default function MeetingCard(meeting: SacramentMeeting) {
    console.log(meeting)
    return (
        <Link className="border-t-4 border-primary bg-card-bg p-4 rounded-2xl" href={`meetings/${meeting.id}`}>
            <article>
                <p className="text-gray-300 text-sm">{ new Date(meeting.date).toLocaleString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }) }</p>
                <span className="text-xs text-gray-400 uppercase">Meeting type</span>
                <h3 className="mb-4 text-lg capitalize">Sacrament meeting {meeting.meetingType}</h3>
                <div className="mb-4 rounded-xl p-3 flex gap-4 border border-gray-800 bg-[#131b2e]">
                    <p className="uppercase font-bold text-yellow-300 text-sm">Presiding <span className="block capitalize text-white font-normal text-base">{ meeting.presiding }</span> </p>
                    <p className="uppercase font-bold text-yellow-300 text-sm">Conducting <span className="block capitalize text-white font-normal text-base">{ meeting.conducting }</span></p>
                </div>

                <div className="rounded-xl bg-announce-bg px-6 py-4">
                    <h3 className="mb-2 capitalize font-bold truncate text-announce-h3">Neighborhood announcements and matters</h3>
                    <ul className="ml-4 list-disc text-sm">
                    { meeting?.announcements?.map((a, i) => (
                        <li key={i} className="mb-1">{a}</li>
                    )) }
                    </ul>
                </div>

                <div className="mt-4 flex flex-col gap-3 text-xs text-gray-300">
                    <span className="w-fit bg-[#131b2e] px-3 py-1 rounded-3xl">Opening Hymn: <span className="font-bold text-white">Nº {meeting.openingHymn.number}</span> {`"${meeting.openingHymn.title}"`}</span>
                    <span className="w-fit bg-[#131b2e] px-3 py-1 rounded-3xl">Sacrament Hymn: <span className="font-bold text-white">Nº {meeting.sacramentHymn.number}</span> {`"${meeting.sacramentHymn.title}"`}</span>
                    <span className="w-fit bg-[#131b2e] px-3 py-1 rounded-3xl">Closing Hymn: <span className="font-bold text-white">Nº {meeting.closingHymn.number}</span> {`"${meeting.closingHymn.title}"`}</span>
                </div>
                
                <span className="rounded-full text-sm tracking-wider hover:bg-primary/80 transition w-64 mx-auto text-center block mt-8 bg-primary text-black py-2">View full program</span>

            </article>
        </Link>
    )
}