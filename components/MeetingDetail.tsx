import { SacramentMeeting } from "@/lib/types";
import { ArrowLeft, BookOpen, Megaphone } from "lucide-react";
import Link from "next/link";

export default function MeetingDetail(meeting: SacramentMeeting) {
    
    const speakers = meeting.speakers.filter(m => m.type === "speaker")
    
    return (
        <article className="mt-6 px-4">
            
            <section className="max-w-200 mx-auto">
                <Link href={"/meetings"} className="mb-4 text-primary md:text-lg flex items-center gap-2 hover:-translate-x-2 hover:underline transition"><ArrowLeft /> Meetings</Link>
                
                <p className="text-gray-300 text-sm md:text-base">{ new Date(meeting.date).toLocaleString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }) }
                </p>

                <span className="text-xs text-gray-400 uppercase">Meeting type</span>
                <h3 className="mb-4 text-lg md:text-xl capitalize">Sacrament meeting {meeting.meetingType}</h3>
                <div className="mb-4 text-sm md:text-base rounded-xl p-3 flex justify-around gap-4 border border-gray-800 bg-[#131b2e]">
                    <p className="uppercase font-bold text-yellow-300">Presiding <span className="block capitalize text-white font-normal text-base">{ meeting.presiding }</span> </p>
                    <p className="uppercase font-bold text-yellow-300">Conducting <span className="block capitalize text-white font-normal text-base">{ meeting.conducting }</span></p>
                </div>

                <h4 className="mt-6 flex gap-2 items-center md:text-lg"><Megaphone size={"16"} /> Ward Announcements</h4>
                <div className="md:text-lg mb-4 rounded-xl p-3 flex gap-4 border border-gray-800 bg-[#131b2e]">
                    <ul className="list-disc pl-4">{ meeting?.announcements?.map((a, i) => (
                        <li key={i}>{a}</li>
                    )) }
                    </ul>
                </div>

                { /* Section Order of Worship */}
                <h4 className="mt-6 mb-4 text-primary md:text-lg flex gap-2 items-center"><BookOpen size={"16"} /> Order of Worship</h4>
                <div className="max-w-100 mb-4 flex flex-col gap-2">
                    <div className="p-2 rounded-xl border border-gray-800 bg-[#131b2e]">
                        <p className="uppercase font-bold text-primary/80 text-xs md:text-base">Opening Hymn</p>
                        <p className="capitalize text-white font-normal text-sm md:text-base"><span className="text-2xl font-bold">{ meeting.openingHymn.number}</span> <span className="ml-4">{`"${meeting.openingHymn.title}"`}</span></p>
                    </div>
                    <div className="p-2 rounded-xl border border-gray-800 bg-[#131b2e]">
                        <p className="uppercase font-bold text-gray-400 text-xs md:text-base">Opening Prayer</p>
                        <p className="capitalize text-white font-normal text-base">{meeting.openingPrayer}</p>
                    </div>

                    { meeting?.stakeBusiness ?? (
                    <div className="p-2 rounded-xl border border-gray-800 bg-[#131b2e]">
                        <h4 className="uppercase font-bold text-gray-400 text-xs md:text-base">Ward Business</h4>
                    </div> )}

                    <div className="p-2 rounded-xl border border-gray-800 bg-[#131b2e]">
                        <p className="uppercase font-bold text-yellow-400 text-xs md:text-base">Sacrament Hymn</p>
                        <p className="capitalize text-yellow-400 font-bold text-2xl">{meeting.sacramentHymn.number}  <span className="text-white ml-4 text-sm md:text-lg font-normal">{`"${meeting.sacramentHymn.title}"`}</span></p>
                    </div>

                    { speakers.length > 0 ? (
                    <div className="p-2 rounded-xl border border-gray-800 bg-[#131b2e]">
                        <p className="uppercase font-bold text-primary/80 text-xs mb-1 md:text-base">Speakers</p>
                        <ul className="capitalize text-white font-normal text-base md:text-lg">
                            {speakers.map((s, i) => (
                                <li className="mb-2" key={i}><p>{s.name}</p> <p className="italic text-gray-400 font-normal text-sm md:text-base">{ `"${s.topic}"` }</p></li>
                            ))}
                        </ul>
                    </div> ) : ""
                    }

                    <div className="p-2 rounded-xl border border-gray-800 bg-[#131b2e]">
                        <p className="uppercase font-bold text-gray-400 text-xs md:text-base">Closing Hymn</p>
                        <p className="capitalize text-white font-bold text-2xl">{meeting.closingHymn.number}  <span className="text-sm md:text-lg ml-4 font-normal">{`"${meeting.closingHymn.title}"`}</span></p>
                    </div>

                    <div className="p-2 rounded-xl border border-gray-800 bg-[#131b2e]">
                        <p className="uppercase font-bold text-gray-400 text-xs md:text-base">Closing Prayer</p>
                        <p className="capitalize text-white font-normal text-base md:text-lg">{meeting.closingPrayer}</p>
                    </div>
                </div>     
            </section>
        </article>
    )
}