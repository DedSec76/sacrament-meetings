"use server";

import { z } from "zod";
import { addMeeting, deleteMeeting, updateMeeting } from "./meetings-db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MeetingType, } from "./types";
import { parseHymn } from "@/app/utils/parseHymn";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";

async function requireOwnerSession() {
    const session = await auth();
    if (!session?.user) throw new Error('Not authenticated');
    return session;
}

const MeetingFormSchema = z.object({
    date: z.string().min(1, "Date is required"),
    meeting_type: z.enum(["testimony", "regular", "stake", "general"]),
    presiding: z.string().min(2),
    conducting: z.string().min(3),
    announcements: z.string().min(5),
    opening_hymn: z.string().min(1),
    opening_prayer: z.string().min(3), 
    ward_business: z.string().min(1),
    stake_business: z.string().nullable().transform(value => value === "on"),
    sacrament_hymn: z.string().min(2), 
    speakers: z.string().min(2),
    closing_hymn: z.string().min(3),
    closing_prayer: z.string().min(3),
})

export type State = {
    errors: {
        date?: string[];
        meeting_type?: string[];
        presiding?: string[];
        conducting?: string[];
        announcements?: string[];
        opening_hymn?: string[];
        opening_prayer?: string[]; 
        ward_business?: string[];
        stake_business?: string[];
        sacrament_hymn?: string[]; 
        speakers?: string[];
        closing_hymn?: string[];
        closing_prayer?: string[];
    };
    message: string | null;

    values?: {
        date?: string;
        meeting_type?: MeetingType;
        presiding?: string;
        conducting?: string;
        announcements?: string;
        opening_hymn?: string;
        opening_prayer?: string; 
        ward_business?: string;
        stake_business?: boolean;
        sacrament_hymn?: string; 
        speakers?: string;
        closing_hymn?: string;
        closing_prayer?: string;
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid email or password.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function createMeeting(prevState: State, formData: FormData): Promise<State> {
    await requireOwnerSession();

    const validatedFields = MeetingFormSchema.safeParse({
        date: formData.get("date"),
        meeting_type: formData.get("meeting_type"),
        presiding: formData.get("presiding"),
        conducting: formData.get("conducting"),
        announcements: formData.get("announcements"),
        opening_hymn: formData.get("opening_hymn"),
        opening_prayer: formData.get("opening_prayer"),
        ward_business: formData.get("ward_business"),
        stake_business: formData.get("stake_business"),
        sacrament_hymn: formData.get("sacrament_hymn"), 
        speakers: formData.get("speakers"),
        closing_hymn: formData.get("closing_hymn"),
        closing_prayer: formData.get("closing_prayer"),
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing or invalid fields. Failed to create meeting",
            values: {},
        }
    }

    const openingHymn = parseHymn(validatedFields?.data?.opening_hymn);
    const sacramentHymn = parseHymn(validatedFields.data?.sacrament_hymn);
    const closingHymn = parseHymn(validatedFields.data?.closing_hymn);

    const announcements = validatedFields.data.announcements
        .split(",")
        .map(announcement => announcement.trim());

    const wardBusiness = validatedFields.data.ward_business
        .split(",")
        .map(description => ({
            description: description.trim(),
        }));

    const speakers = validatedFields.data.speakers
        .split("\n")
        .map(speaker => {
            const [name, topic, type] = speaker
                .split("|")
                .map(value => value.trim());

            return {
                name,
                topic,
                type: type as "speaker" | "musical-number",
            }
        })

    const meeting = {
        date: validatedFields.data.date,
        meetingType: validatedFields.data.meeting_type,
        presiding: validatedFields.data.presiding,
        conducting: validatedFields.data.conducting,
        announcements,
        openingHymn,
        openingPrayer: validatedFields.data.opening_prayer,
        wardBusiness,
        stakeBusiness: validatedFields.data.stake_business,
        sacramentHymn,
        speakers,
        closingHymn,
        closingPrayer: validatedFields.data.closing_prayer
    } 

    try {
        await addMeeting(meeting)

    } catch (error) {
        console.error(error);

        return {
            message: "Database Error: Failed to create meeting.",
            errors: {},
            values: {},
        }
    }

    revalidatePath("/dashboard/meetings");
    redirect("/dashboard/meetings"); 
}

export async function updateAMeeting(id: string, prevState: State, formData: FormData): Promise<State> {
    await requireOwnerSession();

    const validatedFields = MeetingFormSchema.safeParse({
        date: formData.get("date"),
        meeting_type: formData.get("meeting_type"),
        presiding: formData.get("presiding"),
        conducting: formData.get("conducting"),
        announcements: formData.get("announcements"),
        opening_hymn: formData.get("opening_hymn"),
        opening_prayer: formData.get("opening_prayer"),
        ward_business: formData.get("ward_business"),
        stake_business: formData.get("stake_business"),
        sacrament_hymn: formData.get("sacrament_hymn"), 
        speakers: formData.get("speakers"),
        closing_hymn: formData.get("closing_hymn"),
        closing_prayer: formData.get("closing_prayer"),
    })

    if(!validatedFields.success) {
        return {
            message: "Please correct the errors below",
            errors: validatedFields.error.flatten().fieldErrors,
            values: {}
        }
    }

    const openingHymn = parseHymn(validatedFields?.data?.opening_hymn);
    const sacramentHymn = parseHymn(validatedFields.data?.sacrament_hymn);
    const closingHymn = parseHymn(validatedFields.data?.closing_hymn);

    const announcements = validatedFields.data.announcements
        .split(",")
        .map(announcement => announcement.trim());

    const wardBusiness = validatedFields.data.ward_business
        .split(",")
        .map(description => ({
            description: description.trim(),
        }));

    const speakers = validatedFields.data.speakers
        .split("\n")
        .map(speaker => {
            const [name, topic, type] = speaker
                .split("|")
                .map(value => value.trim());

            return {
                name,
                topic,
                type: type as "speaker" | "musical-number",
            }
        })

    const meeting = {
        date: validatedFields.data.date,
        meetingType: validatedFields.data.meeting_type,
        presiding: validatedFields.data.presiding,
        conducting: validatedFields.data.conducting,
        announcements,
        openingHymn,
        openingPrayer: validatedFields.data.opening_prayer,
        wardBusiness,
        stakeBusiness: validatedFields.data.stake_business,
        sacramentHymn,
        speakers,
        closingHymn,
        closingPrayer: validatedFields.data.closing_prayer
    }

    try {
        await updateMeeting(id, meeting)
    } catch (error) {
        console.error(error)
        return {
            message: "Database Error: Failed to Update Meeting",
            errors: {},
            values: {},
        }
    }

    revalidatePath("/dashboard/meetings");
    redirect("/dashboard/meetings"); 
}

export async function deleteAMeeting(id: number) {
    await requireOwnerSession();
    
    try {
        const deleted = await deleteMeeting(id);

        if(!deleted) throw new Error("Meeting not found");

    } catch (error) {
        console.error("Error deleting Meeting:", error);
        throw new Error("Failed to delete meeting. Please try again later");
    }

    revalidatePath("/dashboard/meetings");
}