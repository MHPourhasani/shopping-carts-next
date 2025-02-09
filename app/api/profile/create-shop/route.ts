import shopModel from "@/models/shop";
import API from "@/shared/api";
import { getServerAuthSession } from "@/shared/auth";
import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    connectToDB();
    const { name, phone_number, description, user_id } = await request.json();
    const session = await getServerAuthSession();

    try {
        const findShop = await shopModel.findOne({ creator: user_id });

        if (findShop) {
            return NextResponse.json({ message: "فروشگاه وجود دارد لطفا نام فروشگاه خود را تغییر دهید." }, { status: 429 });
        } else {
            if (!user_id) {
                return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد." }, { status: 422 });
            }

            const newShop = {
                creator: user_id,
                name,
                description,
                phone_number,
            };
            await shopModel.create(newShop);
            await fetch(API.notification.create_notification(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user: session?.user.userId,
                    notification: { title: "ساخت فروشگاه", message: "فروشگاه با موفقیت ساخته شد." },
                }),
            });
            return NextResponse.json({ message: "فروشگاه با موفقیت ساخته شد.", data: newShop }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
