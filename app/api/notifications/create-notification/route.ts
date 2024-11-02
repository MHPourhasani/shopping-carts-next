import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import notificationModel from "@/models/notification";

export async function POST(request: NextRequest) {
    connectToDB();
    const { notification, user } = await request.json();

    try {
        const findNotification = await notificationModel.findOne({ user });

        if (findNotification) {
            const updateNotifications = await notificationModel.findOneAndUpdate(
                { user },
                { notifications: [...findNotification.notifications, notification] },
                { new: true },
            );
            return NextResponse.json({ message: "پیام با موفقیت اضافه شد.", data: updateNotifications }, { status: 200 });
        } else {
            if (!user) {
                return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد." }, { status: 422 });
            }

            const newNotification = { user, notifications: [notification] };
            await notificationModel.create(newNotification);

            return NextResponse.json({ message: "پیام با موفقیت اضافه شد.", data: newNotification }, { status: 201 });
        }
    } catch (err: any) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
