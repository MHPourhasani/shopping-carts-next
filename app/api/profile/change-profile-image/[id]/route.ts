import userModel from "@/models/user";
import API from "@/shared/api";
import { getServerAuthSession } from "@/shared/auth";
import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const { profile_image_url } = await request.json();
    const session = await getServerAuthSession();

    try {
        if (profile_image_url !== undefined) {
            const updatedUser = await userModel.findByIdAndUpdate(params.id, { profile_image: profile_image_url }, { new: true });

            if (!updatedUser) {
                return NextResponse.json({ message: "تغییر عکس پروفایل با خطا مواجه شد." }, { status: 404 });
            } else {
                await fetch(API.notification.create_notification(), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user: session?.user.userId,
                        notification: { title: "تغییر عکس پروفایل", message: "عکس پروفایل با موفقیت تغییر کرد." },
                    }),
                });
                return NextResponse.json({ message: "عکس پروفایل با موفقیت تغییر کرد.", data: updatedUser }, { status: 200 });
            }
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
