import ProductModel from "@/models/product";
import shopModel from "@/models/shop";
import API from "@/shared/api";
import { getServerAuthSession } from "@/shared/auth";
import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const name = params.name;
    const findShop = await shopModel.findOne({ name });

    if (findShop) {
        const productsOfShop = await ProductModel.find({ shopper: findShop._id });
        return NextResponse.json({ shop: findShop, products: productsOfShop }, { status: 200 });
    } else {
        return NextResponse.json({ message: `فروشگاه ${name} یافت نشد.` }, { status: 404 });
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const shopName = params.name;
    const { name, description, phone_number } = await request.json();
    const session = await getServerAuthSession();

    try {
        const findShop = await shopModel.findOne({ name: shopName });

        if (findShop) {
            if (!name || !description || !phone_number) {
                return NextResponse.json({ message: "All fields must be filled." }, { status: 429 });
            } else {
                const shopEdited = await shopModel.findOneAndUpdate({ name: shopName }, { name, description, phone_number }, { new: true });
                await fetch(API.notification.create_notification(), {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user: session?.user.userId,
                        notification: { title: "ویرایش فروشگاه", message: "فروشگاه با موفقیت آپدیت شد." },
                    }),
                });

                return NextResponse.json({ message: "فروشگاه با موفقیت آپدیت شد.", data: shopEdited }, { status: 200 });
            }
        } else {
            return NextResponse.json({ message: `فروشگاه ${name} یافت نشد.` }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: any) {
    connectToDB();
    const notificationId = params.name;
    const { userId } = await request.json();

    const findUser = await shopModel.findOne({ creator: userId });

    try {
        if (findUser) {
            await shopModel.findOneAndDelete({ _id: notificationId });

            return NextResponse.json({ message: "فروشگاه با موفقیت حذف شد." }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
