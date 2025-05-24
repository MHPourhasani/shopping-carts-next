import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";
import shopModel from "@/models/shop";
import userModel from "@/models/user";
import ProductModel from "@/models/product";
import API from "@/shared/api";
import { getServerAuthSession } from "@/shared/auth";
import { UserRoleEnum } from "@/interfaces/enums";

export async function GET(req: NextRequest, {}: any) {
    connectToDB();
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");

    try {
        if (user_id) {
            const user = await userModel.findOne({ _id: user_id });

            if (user) {
                const shop = await shopModel.findOne({ creator: user_id });
                return NextResponse.json({ result: shop ? shop : null }, { status: 200 });
            } else {
                return NextResponse.json({ message: "فروشگاه یافت نشد." }, { status: 404 });
            }
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    connectToDB();
    const { userId, product } = await request.json();
    const session = await getServerAuthSession();

    try {
        if (!userId) {
            return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد." }, { status: 422 });
        }

        const user = await userModel.findOne({ _id: userId });
        if (user && user.role !== UserRoleEnum.USER) {
            const newShop = {
                creator: userId,
                ...product,
            };

            await shopModel.create(newShop);

            await fetch(API.notification.create_notification(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user: session?.user.userId,
                    notification: { title: "ثبت فروشگاه", message: "فروشگاه با موفقیت ثبت شد." },
                }),
            });

            return NextResponse.json({ message: "فروشگاه با موفقیت ثبت شد.", data: newShop }, { status: 201 });
        } else {
            return NextResponse.json({ message: "کاربر اجازه این دستور را ندارد." }, { status: 429 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
