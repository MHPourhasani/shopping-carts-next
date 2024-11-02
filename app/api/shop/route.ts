import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import shopModel from "@/models/shop";
import userModel from "@/models/user";
import { UserRoleEnum } from "@/interfaces/general";
import ProductModel from "@/models/product";
import API from "@/utils/api";
import { getServerAuthSession } from "@/utils/auth";

export async function GET(req: NextRequest, {}: any) {
    connectToDB();
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");
    const limit = url.searchParams.get("limit") || 100;

    try {
        if (user_id) {
            const shop = await shopModel.findOne({ creator: user_id });

            if (shop) {
                const productsOfShop = await ProductModel.find({ shopper: shop._id });
                return NextResponse.json({ results: { shop, products: productsOfShop } }, { status: 200 });
            } else {
                return NextResponse.json({ message: "فروشگاه یافت نشد." }, { status: 404 });
            }
        } else {
            const shops = await shopModel.find().limit(+limit);
            return NextResponse.json({ results: shops ? shops : [] }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
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
    } catch (err: any) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
