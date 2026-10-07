import { deleteAMeeting } from "@/lib/action";
import { SacramentMeeting } from "@/lib/types";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";


export default function MeetingRow(meeting: SacramentMeeting) {
    return (
        <div className="max-w-165 mx-auto border-t-4 border-primary bg-card-bg p-4 rounded-2xl">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <Link href={`/dashboard/meetings/${meeting.id}/edit`}>
                        <Edit size={24} />
                    </Link>

                    <p className="text-gray-300 text-sm md:text-base">{ new Date(meeting.date).toLocaleString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"}) }
                    </p>
                </div>

                <form className="z-50" action={deleteAMeeting.bind(null, meeting.id)}>
                    <button className="cursor-pointer" type="submit"><Trash color="pink"/></button>
                </form>
            </div>

            <section className="mt-4 flex items-center justify-between gap-4">
                {/* Meeting Type */}
                <h3 className="text-lg md:text-xl capitalize">Sacrament meeting {meeting.meetingType}</h3>
                {/* Presiding & Conducting */}
                <div className="rounded-xl p-3 flex gap-4 border border-gray-800 bg-[#131b2e]">
                    <p className="uppercase font-bold text-yellow-300 text-sm">Presiding <span className="block capitalize text-white font-normal text-base md:text-lg">{ meeting.presiding }</span> </p>
                    <p className="uppercase font-bold text-yellow-300 text-sm">Conducting <span className="block capitalize text-white font-normal text-base md:text-lg">{ meeting.conducting }</span></p>
                </div>
            </section>

            {/* Stake Business */}
            { meeting.stakeBusiness ? (
                <div className="my-4 p-2 rounded-xl border border-gray-800 bg-[#131b2e]">
                    <h4 className="uppercase font-bold text-green-300 text-lg md:text-xl md:text-center">Stake Business</h4>
                </div>
            ): "" }

            {/* Announcements */}
            <div className="rounded-xl bg-announce-bg px-6 py-4">
                <h3 className="mb-2 capitalize font-bold truncate md:text-lg text-announce-h3">Neighborhood announcements and matters</h3>
                <ul className="ml-4 list-disc text-sm md:text-base">
                    { meeting?.announcements?.map((a, i) => (
                        <li key={i} className="mb-1">{a}</li>
                    )) }
                </ul>
            </div>

            {/* Hymns */}
            <div className="mt-4 flex flex-col gap-3 text-xs md:text-sm text-gray-300">
                <span className="w-fit bg-[#131b2e] px-3 py-1 rounded-3xl">Opening Hymn: <span className="font-bold text-white">Nº {meeting.openingHymn.number}</span> {`"${meeting.openingHymn.title}"`}</span>
                <span className="w-fit bg-[#131b2e] px-3 py-1 rounded-3xl">Sacrament Hymn: <span className="font-bold text-white">Nº {meeting.sacramentHymn.number}</span> {`"${meeting.sacramentHymn.title}"`}</span>
                <span className="w-fit bg-[#131b2e] px-3 py-1 rounded-3xl">Closing Hymn: <span className="font-bold text-white">Nº {meeting.closingHymn.number}</span> {`"${meeting.closingHymn.title}"`}</span>
            </div>
        </div>
    )
}