import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import API from "@/shared/libs/api/endpoints";
import { AUTH_TOKEN_KEY } from "@/shared/constant";

export async function POST(req: NextRequest) {
    const cookieStore = req.cookies;

    const tokenString = cookieStore.get(AUTH_TOKEN_KEY)?.value;

    if (!tokenString) {
        return NextResponse.json({ error: "No token cookie found" }, { status: 401 });
    }

    try {
        const { refresh } = JSON.parse(tokenString);

        if (!refresh) {
            return NextResponse.json({ error: "No refresh token inside cookie" }, { status: 401 });
        }

        const { data } = await axios.post(API.auth.refresh(), {
            refresh_token: refresh,
        });

        const newToken = {
            access: data.access,
            refresh: data.refresh,
        };

        const response = NextResponse.json({ access: data.access });

        response.cookies.set(AUTH_TOKEN_KEY, JSON.stringify(newToken), {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // مثلاً ۷ روز
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return response;
    } catch (err) {
        return NextResponse.json({ error: "Invalid token structure or refresh failed" }, { status: 401 });
    }
}
