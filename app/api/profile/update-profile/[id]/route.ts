import userModel from "@/models/user";
import API from "@/utils/api";
import { getServerAuthSession } from "@/utils/auth";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const { first_name, last_name, email, phone_number } = await request.json();
    const session = await getServerAuthSession();

    if (!first_name.trim()) {
        return NextResponse.json({ message: "نام نباید خالی باشد." }, { status: 422 });
    } else if (!last_name?.trim()) {
        return NextResponse.json({ message: "نام خانوادگی نباید خالی باشد." }, { status: 422 });
    } else if (!email?.trim()) {
        return NextResponse.json({ message: "ایمیل نباید خالی باشد." }, { status: 422 });
    } else if (!phone_number?.trim()) {
        return NextResponse.json({ message: "شماره موبایل نباید خالی باشد." }, { status: 422 });
    } else if (phone_number?.trim() < 11) {
        return NextResponse.json({ message: "شماره موبایل نباید کمتر از 11 رقم باشد." }, { status: 422 });
    } else {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(params.id, { first_name, last_name, email, phone_number }, { new: true });

            if (!updatedUser) {
                return NextResponse.json({ message: "ویرایش کاربر با خطا مواجه شد." }, { status: 404 });
            } else {
                await fetch(API.notification.create_notification(), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user: session?.user.userId,
                        notification: { title: "تغییر پروفایل", message: "کاربر با موفقیت ویرایش شد." },
                    }),
                });
                return NextResponse.json({ message: "کاربر با موفقیت ویرایش شد.", data: updatedUser }, { status: 200 });
            }
        } catch (error: any) {
            return NextResponse.json({ message: error }, { status: 500 });
        }
    }
}
