import Link from "next/link";

export default function NotFound() {
    return (
        <div className="mx-auto my-16 max-w-xl rounded-lg border border-slate-800 bg-card-bg p-6 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-200">Project Not Found</h1>
            <p className="mt-3 text-slate-400">The project you are looking for does not exist.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={"/meetings"} className="rounded-md border border-slate-700 px-4 py-2 font-semibold text-slate-400 transition hover:text-slate-200 hover:bg-slate-600">
                    Back to Meetings
                </Link>
            </div>
        </div>
    )
}