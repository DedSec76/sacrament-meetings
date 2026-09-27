import { Hymn } from "@/lib/types";

export function parseHymn(value: string): Hymn {
    const [number, title] = value.split("|").map(value => value.trim());

    return {
        number: Number(number),
        title,
    }
}