import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import API from "@/shared/libs/api/endpoints";
import { AUTH_TOKEN_KEY } from "@/shared/constant";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const { data } = await axios.post(API.auth.login(), { email, password });

        const res = NextResponse.json({ message: "Logged in" });

        res.cookies.set(AUTH_TOKEN_KEY, JSON.stringify(data), {
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return res;
    } catch (err) {
        return NextResponse.json({ message: "Login failed" }, { status: 500 });
    }
}
