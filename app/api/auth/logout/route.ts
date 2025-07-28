import { AUTH_TOKEN_KEY } from "@/shared/constants/auth";
import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true });

    res.cookies.set(AUTH_TOKEN_KEY, "", {
        path: "/",
        expires: new Date(0),
    });

    return res;
}
