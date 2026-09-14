"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black">
      <main className="flex max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black">
        <Link className="flex items-center gap-2 hover:underline text-blue-300 font-bold text-xl" href="/meetings" replace>Meetings <ArrowRight /></Link>
        <h1 className="text-xl md:text-3xl">Welcome to The Jicamarca Ward</h1>
      </main>
    </div>
  );
}
