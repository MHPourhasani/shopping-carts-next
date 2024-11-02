import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/utils/db";
import notificationModel from "@/models/notification";
import { NotificationInterface } from "@/interfaces/general";

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const notificationId = params.id;
    const { userId, status } = await request.json();

    const findUser = await notificationModel.findOne({ user: userId });

    try {
        if (findUser) {
            await findUser.notifications.map((notification: NotificationInterface) => {
                if (notification._id.toString() !== notificationId) {
                    notification.isViewed = notification.isViewed;
                } else {
                    notification.isViewed = status;
                }
            });
            findUser.save();

            return NextResponse.json({ message: "وضعیت پیام به خوانده شده تغییر کرد.", data: findUser.notifications }, { status: 200 });
        }
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: any) {
    connectToDB();
    const notificationId = params.id;
    const { userId } = await request.json();

    try {
        const findUser = await notificationModel.findOne({ user: userId });

        if (findUser) {
            const updated = await notificationModel.findOneAndUpdate(
                { user: userId },
                { notifications: findUser.notifications.filter((n: NotificationInterface) => n._id === notificationId) },
                { new: true },
            );

            return NextResponse.json({ message: "پیام با موفقیت حذف شد.", data: findUser }, { status: 200 });
        }
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
