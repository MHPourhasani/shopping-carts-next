import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";
import favoriteModel from "@/models/favorite";
import { ObjectId } from "mongoose";

export async function POST(request: NextRequest) {
    connectToDB();
    const { productId, userId } = await request.json();

    try {
        const findUser = await favoriteModel.findOne({ user: userId });

        if (findUser) {
            const findProduct = findUser.products.find((p: ObjectId) => String(p) === productId);

            if (findProduct) {
                const updateFavorites = await favoriteModel.findOneAndUpdate(
                    { user: userId },
                    {
                        products: findUser.products.filter((p: ObjectId) => String(p) !== productId),
                    },
                    { new: true },
                );

                return NextResponse.json(
                    { message: "محصول با موفقیت از علاقه مندی ها حذف شد.", results: updateFavorites },
                    { status: 200 },
                );
            } else {
                const updateFavorites = await favoriteModel.findOneAndUpdate(
                    { user: userId },
                    {
                        products: [...findUser.products, productId],
                    },
                    { new: true },
                );

                return NextResponse.json(
                    { message: "محصول با موفقیت به علاقه مندی ها اضافه شد.", results: updateFavorites },
                    { status: 200 },
                );
            }
        } else {
            if (!userId) {
                return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد." }, { status: 422 });
            }

            const newFavorite = { user: userId, products: [productId] };
            await favoriteModel.create(newFavorite);

            return NextResponse.json({ message: "محصول با موفقیت به علاقه مندی ها اضافه شد.", results: newFavorite }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
