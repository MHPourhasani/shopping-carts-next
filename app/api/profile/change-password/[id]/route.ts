import userModel from "@/models/user";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import API from "@/utils/api";
import { RequestTypeEnum } from "@/interfaces/general";

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const user = params.id;
    const { newPassword } = await request.json();

    try {
        if (newPassword?.trim() && newPassword.length >= 8) {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            const updatedUser = await userModel.findByIdAndUpdate(params.id, { password: hashedPassword }, { new: true });

            if (!updatedUser) {
                return NextResponse.json({ message: "تغییر رمز عبور با خطا مواجه شد." }, { status: 429 });
            } else {
                await fetch(API.notification.create_notification(), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user,
                        notification: { title: "تغییر رمز عبور", message: "رمز عبور با موفقیت تغییر کرد." },
                    }),
                });

                return NextResponse.json({ message: "رمز عبور با موفقیت تغییر کرد.", data: updatedUser }, { status: 200 });
            }
        } else if (newPassword.length < 8) {
            return NextResponse.json({ message: "رمز عبور نباید کمتر از 8 کارامتر باشد." }, { status: 422 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
