import { Calendar } from "lucide-react"
import Image from "next/image"

export const Header = () => {
    const date = new Date()

    return (
        <header className="px-4 my-4">
            <section className="flex gap-4">
                <Image className="w-[60]" width={222} height={225} src={"/iconStake.webp"} alt="An icon of the stake to which we belong" /> 
                <div>
                    <h1 className="text-lg md:text-2xl text-gray-300 uppercase font-bold">Jicamarca Ward</h1>
                    <p className="flex items-center gap-2 text-gray-400 text-sm md:text-base"><Calendar /> {date.toLocaleDateString("en-PE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                    })}</p>
                </div>
            </section>
        </header>
    )
}