import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
    query: string = "",
    currentPage: number = 1
): Promise<SacramentMeeting[]> {

    const searchTerm = `%${query}%`
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
        SELECT id,
            to_char(date, 'YYYY-MM-DD') AS "date",
            meeting_type AS "meetingType",
            presiding, conducting, announcements,
            opening_hymn AS "openingHymn",
            opening_prayer AS "openingPrayer",
            ward_business AS "wardBusiness",
            stake_business AS "stakeBusiness",
            sacrament_hymn AS "sacramentHymn",
            speakers,
            closing_hymn AS "closingHymn",
            closing_prayer AS "closingPrayer"
            FROM meetings
                WHERE 
                    presiding ILIKE ${searchTerm}
                    OR conducting ILIKE ${searchTerm}
                    OR meeting_type ILIKE ${searchTerm}
                    OR speakers::text ILIKE ${searchTerm}
                    OR to_char(date, 'YYYY-MM-DD') ILIKE ${searchTerm}
                    ORDER BY date DESC
                LIMIT ${ITEMS_PER_PAGE}
                OFFSET ${offset}
    `;

    return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
    query: string = "",
): Promise<number> {
    
    const searchTerm = `%${query}%`

    const rows = await sql`
        SELECT COUNT(*) FROM meetings
                WHERE 
                    presiding ILIKE ${searchTerm}
                    OR conducting ILIKE ${searchTerm}
                    OR meeting_type ILIKE ${searchTerm}
                    OR speakers::text ILIKE ${searchTerm}
    `;

    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE )
}

export async function getMeetingById(
    id: number
): Promise<SacramentMeeting | null> {
    const rows = await sql`
        SELECT
            id,
            to_char(date, 'YYYY-MM-DD') AS "date",
            meeting_type AS "meetingType",
            presiding, conducting, announcements,
            opening_hymn AS "openingHymn",
            opening_prayer AS "openingPrayer",
            ward_business AS "wardBusiness",
            stake_business AS "stakeBusiness",
            sacrament_hymn AS "sacramentHymn",
            speakers,
            closing_hymn AS "closingHymn",
            closing_prayer AS "closingPrayer"
        FROM meetings WHERE id = ${id}
    `
    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function getUserByEmail(email: string) {
    const rows = await sql`SELECT id, name, email, password_hash
                               FROM users
                               WHERE email = ${email}
                               LIMIT 1`
    
    const user = rows[0];

    if(!user) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.password_hash,
    };
}

export async function addMeeting(
    data: Omit<SacramentMeeting, "id">
) : Promise<SacramentMeeting | null> {
    const rows = await sql`
        INSERT INTO meetings(
            date,
            meeting_type,
            presiding,
            conducting,
            announcements,
            opening_hymn,
            opening_prayer,
            ward_business,
            stake_business,
            sacrament_hymn,
            speakers,
            closing_hymn,
            closing_prayer
        ) VALUES (
            ${data.date},
            ${data.meetingType},
            ${data.presiding},
            ${data.conducting},
            ${data.announcements},
            ${JSON.stringify(data.openingHymn)},
            ${data.openingPrayer},
            ${JSON.stringify(data.wardBusiness)},
            ${data.stakeBusiness},
            ${JSON.stringify(data.sacramentHymn)},
            ${JSON.stringify(data.speakers)},
            ${JSON.stringify(data.closingHymn)},
            ${data.closingPrayer}
        )
        RETURNING *
    `
    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function updateMeeting(
    id: string,
    updates: Partial<SacramentMeeting>
) : Promise<SacramentMeeting | null> {
    const columnMap: Record<string, string> = {
        date: "date",
        meetingType: "meeting_type",
        presiding: "presiding",
        conducting: "conducting",
        announcements: "announcements",
        openingHymn: "opening_hymn",
        openingPrayer: "opening_prayer",
        wardBusiness: "ward_business",
        stakeBusiness: "stake_business",
        sacramentHymn: "sacrament_hymn",
        speakers: "speakers",
        closingHymn: "closing_hymn",
        closingPrayer: "closing_prayer",
    };

    const entries = Object.entries(updates)

    if(entries.length === 0) return null;

    const fields = entries.map(([key], index) => `${columnMap[key]} = $${index + 1}`)

    const values = entries.map(([key, value]) =>
        ["openingHymn", "wardBusiness", "sacramentHymn", "speakers", "closingHymn"].includes(key)
            ? JSON.stringify(value)
            : value
    );

    values.push(id)
    
    const rows = await sql.query(
        `
        UPDATE meetings
        SET ${fields.join(", ")}
        WHERE id = $${values.length}
        RETURNING *
    `,
    values
    );
    
    return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
    const rows = await sql`DELETE FROM meetings WHERE id = ${id} RETURNING *`
    
    return rows.length > 0;
}