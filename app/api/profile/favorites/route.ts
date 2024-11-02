import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import favoriteModel from "@/models/favorite";

export async function POST(request: NextRequest) {
    connectToDB();
    const { productId, userId } = await request.json();

    try {
        const findUser = await favoriteModel.findOne({ user: userId });

        if (findUser) {
            const updateFavorites = await favoriteModel.findOneAndUpdate(
                { user: userId },
                { products: [...findUser.products, productId] },
                { new: true },
            );

            return NextResponse.json({ message: "محصول با موفقیت به علاقه مندی ها اضافه شد.", data: updateFavorites }, { status: 200 });
        } else {
            if (!userId) {
                return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد." }, { status: 422 });
            }

            const newFavorite = {
                user: userId,
                products: [productId],
            };

            await favoriteModel.create(newFavorite);

            return NextResponse.json({ message: "محصول با موفقیت به علاقه مندی ها اضافه شد.", data: newFavorite }, { status: 201 });
        }
    } catch (err: any) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
