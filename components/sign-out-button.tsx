import { signOut } from "@/auth";

export function SignOutButton() {
    return (
        <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
        }}>
            <button className="cursor-pointer hover:underline text-slate-200" type="submit">Sign Out</button>
        </form>
    )
}