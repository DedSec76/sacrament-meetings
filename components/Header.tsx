"use client"

export const Header = () => {
    const date = new Date()

    return (
        <header className="px-4 my-2">
            <h1 className="text-lg md:text-2xl text-gray-300 uppercase font-bold">Jicamarca Ward</h1>
            <p className="text-gray-400">{date.toLocaleDateString("en-PE", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            })}</p>
        </header>
    )
}