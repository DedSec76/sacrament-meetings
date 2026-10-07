"use client"
import { authenticate } from "@/lib/action";
import { useActionState } from "react";

export function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="flex flex-col gap-5 text-center mt-8 bg-blue-900 p-12 rounded-lg">
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input className="bg-slate-800 outline-0 py-1 px-2" id="email" type="email" name="email" required />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input className="bg-slate-800 outline-0 py-1 px-2" id="password" type="password" name="password" required />
            </div>
            <button className="cursor-pointer rounded-lg py-2 font-bold text-black bg-blue-200 hover:bg-blue-400" aria-disabled={isPending} type="submit">
                { isPending ? "Signing in..." : "Sign In" }
            </button>
            {errorMessage && <p role="alert">{errorMessage}</p>}
        </form>
    )
}