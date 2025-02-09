import userModel from "@/models/user";
import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import API from "@/shared/api";
import { getServerAuthSession } from "@/shared/auth";

export async function POST(req: NextRequest) {
    await connectToDB();
    const { email, password } = await req.json();
    const session = await getServerAuthSession();

    try {
        const user = await userModel.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            await fetch(API.notification.create_notification(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: session?.user.userId,
                    notification: { title: "ورود به حساب کاربری", message: "با موفقیت وارد شدید." },
                }),
            });
            return NextResponse.json({ user });
        } else {
            return NextResponse.json({ message: "کاربر یافت نشد." }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
