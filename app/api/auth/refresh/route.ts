import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import API from "@/shared/libs/api/endpoints";
import { AUTH_TOKEN_KEY } from "@/shared/constant";

export async function POST(req: NextRequest) {
    const cookieStore = req.cookies;

    const tokenString = cookieStore.get(AUTH_TOKEN_KEY)?.value;
    console.log("Refresh API Cookie:", tokenString);

    if (!tokenString) {
        return NextResponse.json({ error: "No token cookie found" }, { status: 401 });
    }

    try {
        const { refresh } = JSON.parse(tokenString);
        console.log("Sending refresh token to API:", refresh);

        if (!refresh) {
            return NextResponse.json({ error: "No refresh token inside cookie" }, { status: 401 });
        }

        const { data } = await axios.post(API.auth.refresh(), {
            refresh_token: refresh,
        });

        const response = NextResponse.json({ access: data.access });

        response.cookies.set(AUTH_TOKEN_KEY, JSON.stringify(data), {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // مثلاً ۷ روز
            secure: process.env.NODE_ENV === "production",
        });

        return response;
    } catch (err: any) {
        console.error("Refresh failed error:", err.response?.data ?? err.message);
        return NextResponse.json({ error: "Invalid token structure or refresh failed" }, { status: 401 });
    }
}
