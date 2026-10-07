"use client";
import { useActionState } from "react";
import { updateAMeeting, type State } from "@/lib/action";
import type { SacramentMeeting } from "@/lib/types";

const initialState: State = { message: null, errors: {}, values: {} };

export default function EditMeetingForm({ id, meeting }: { id: string; meeting: SacramentMeeting}) {
  const updateWithId = updateAMeeting.bind(null, id);

  const [state, formAction, isPending] = useActionState(updateWithId, initialState);

    return (
        <form action={formAction} className="bg-gray-700 max-w-125 flex flex-col gap-6 mx-auto px-4 py-8 rounded-lg">
            <h1 className='text-slate-200 font-bold text-xl text-center md:text-2xl'>Edit Meeting</h1>
            <div className="flex flex-col gap-2">
                <label htmlFor="date" className='text-slate-200 text-lg'>Meeting Date</label>
                <input className="outline-0 bg-gray-600 rounded-lg pl-2 py-1" id="date" name="date" type="date" aria-describedby="date-error" defaultValue={meeting?.date} required />
                <div id="date-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.date?.map(error => (
                        <p key={error} className='mt-1 text-sm text-red-600'>{error}</p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="meeting_type" className='text-slate-200 text-lg'>Meeting Type</label>
                <select 
                    className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" 
                    id="meeting_type"
                    name="meeting_type"
                    aria-describedby="meeting_type-error"
                    defaultValue={meeting?.meetingType}
                    required 
                >
                    <option value="" disabled>Select meeting type</option>
                    <option value="testimony">Testimony</option>
                    <option value="regular">Regular</option>
                    <option value="stake">Stake</option>
                    <option value="general">General</option>
                </select>
                <div id="meeting_type-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.meeting_type?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="presiding" className='text-slate-200 text-lg'>Presiding</label>
                <input className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" id="presiding" name="presiding" type="text" required aria-describedby="presiding-error" defaultValue={meeting?.presiding} />
                <div id="presiding-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.presiding?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="conducting" className='text-slate-200 text-lg'>Conducting</label>
                <input className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" id="conducting" name="conducting" type="text" required aria-describedby="conducting-error" defaultValue={meeting?.conducting} />
                <div id="conducting-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.conducting?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="announcements" className='text-slate-200 text-lg'>Announcements</label>
                <input className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" id="announcements" name="announcements" type="text" required aria-describedby="announcements-error" defaultValue={meeting?.announcements?.join(", ")} />
                <div id="announcements-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.announcements?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="opening_hymn" className='text-slate-200 text-lg'>Opening Hymn</label>
                <input className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" id="opening_hymn" name="opening_hymn" type="text" required aria-describedby="opening_hymn-error" placeholder="1004 | Walking with Christ" defaultValue={meeting?.openingHymn ? `${meeting.openingHymn.number} | ${meeting.openingHymn.title}` : ""} />
                <div id="opening_hymn-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.opening_hymn?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="opening_prayer" className='text-slate-200 text-lg'>Opening Prayer</label>
                <input className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" id="opening_prayer" name="opening_prayer" type="text" required aria-describedby="opening_prayer-error" defaultValue={meeting?.openingPrayer} />
                <div id="opening_prayer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.opening_prayer?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="ward_business" className='text-slate-200 text-lg'>Ward Business</label>
                <input className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" id="ward_business" name="ward_business" type="text" required aria-describedby="ward_business-error" defaultValue={meeting?.wardBusiness.map(item => item?.description).join(", ")} />
                <div id="ward_business-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.ward_business?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-row gap-4 pl-2'>
                <input id="stake_business" name="stake_business" type="checkbox" defaultChecked={meeting?.stakeBusiness ?? false} value="on" aria-describedby="stake_business-error" />
                <label htmlFor="stake_business" className='text-green-300 text-lg'>Stake Business</label>
                
                <div id="stake_business-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.stake_business?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="sacrament_hymn" className='text-slate-200 text-lg'>Sacrament Hymn</label>
                <input className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" id="sacrament_hymn" name="sacrament_hymn" type="text" required aria-describedby="sacrament_hymn-error" placeholder="1004 | Walking with Christ" defaultValue={meeting?.sacramentHymn ? `${meeting.sacramentHymn.number} | ${meeting.sacramentHymn.title}` : ""} />
                <div id="sacrament_hymn-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.sacrament_hymn?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="speakers" className='text-slate-200 text-lg'>Speakers</label>
                <textarea
                    className="outline-0 resize-none bg-gray-900 rounded-lg pl-2 py-1"
                    id="speakers"
                    name="speakers"
                    rows={5}
                    required
                    aria-describedby="speakers-error"
                    defaultValue={meeting?.speakers?.map(speaker => `${speaker?.name} | ${speaker?.topic} | ${speaker?.type}`).join("\n")}
                    placeholder="John Smith | Faith | speaker"
                />
                <div id="speakers-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.speakers?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="closing_hymn" className='text-slate-200 text-lg'>Closing Hymn</label>
                <input className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" id="closing_hymn" name="closing_hymn" type="text" required aria-describedby="closing_hymn-error" placeholder="169 | I'm a child of God" defaultValue={meeting?.closingHymn ? `${meeting.closingHymn.number} | ${meeting.closingHymn.title}` : ""} />
                <div id="closing_hymn-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.closing_hymn?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="closing_prayer" className='text-slate-200 text-lg'>Closing Prayer</label>
                <input className="outline-0 bg-gray-900 rounded-lg pl-2 py-1" id="closing_prayer" name="closing_prayer" type="text" required aria-describedby="closing_prayer-error" defaultValue={meeting?.closingPrayer} />
                <div id="closing_prayer-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.closing_prayer?.map((error) => (
                        <p key={error} className="mt-1 text-sm text-red-600">
                        {error}
                        </p>
                    ))}
                </div>
            </div>

            { state.message ? <p className='text-sm text-red-600'>{state.message}</p> : null}

            <button type="submit" disabled={isPending} className="mt-2 cursor-pointer text-black bg-blue-400 py-2 rounded-2xl hover:bg-blue-600">{isPending ? "Updating..." : "Update Meeting"}</button>
        
        </form>
    )
}