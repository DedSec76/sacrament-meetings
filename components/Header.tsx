"use client"

export const Header = () => {
    const date = new Date()

    return (
        <header className="px-4 my-2">
            <h1 className="text-sm text-gray-300 uppercase">Jicamarca Ward</h1>
            <p>{date.toLocaleDateString("en-PE", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            })}</p>
        </header>
    )
}