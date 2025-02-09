import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";
import notificationModel from "@/models/notification";

export async function GET(req: NextRequest) {
    connectToDB();
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");

    try {
        const user = await notificationModel.findOne({ user: user_id }).sort({ "notifications.createdAt": 1 });
        if (user) {
            return NextResponse.json({ results: user.notifications }, { status: 200 });
        } else {
            return NextResponse.json({ message: "کاربر وجود ندارد." }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    connectToDB();
    const { notification, user } = await request.json();

    try {
        const findNotification = await notificationModel.findOne({ user });

        if (findNotification) {
            const updateNotifications = await notificationModel.findOneAndUpdate(
                { user },
                {
                    notifications: [...findNotification.notifications_lists, notification],
                },
                { new: true },
            );
            return NextResponse.json({ message: "پیام با موفقیت ثبت شد.", data: updateNotifications }, { status: 200 });
        } else {
            if (!user) {
                return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد" }, { status: 422 });
            }

            const newNotification = { user, notifications: [notification] };
            await notificationModel.create(newNotification);

            return NextResponse.json({ message: "پیام با موفقیت ثبت شد.", data: newNotification }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
