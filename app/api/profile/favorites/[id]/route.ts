import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/utils/db";
import favoriteModel from "@/models/favorite";
import { FavoriteInterface } from "@/interfaces/general";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;
    try {
        const findFavorite = await favoriteModel.findOne({ user: userId }).populate("products").lean();

        return NextResponse.json({ data: findFavorite }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;
    const { productId } = await request.json();
    const findUser = await favoriteModel.findOne({ user: userId });
    const findFavorite = await findUser.products.find((item: FavoriteInterface) => item.toString() === productId);

    try {
        if (findUser) {
            if (findFavorite) {
                await favoriteModel.findOneAndUpdate({ user: userId }, { $pull: { products: productId } }, { new: true });

                return NextResponse.json({ message: "محصول با موفقیت از علاقه مندی ها حذف شد.", data: findFavorite }, { status: 200 });
            } else {
                const updateFavorites = await favoriteModel.findOneAndUpdate(
                    { user: userId },
                    { products: [...findUser.products, productId] },
                    { new: true },
                );

                return NextResponse.json({ message: "محصول با موفقیت به علاقه مندی ها اضافه شد.", data: updateFavorites }, { status: 200 });
            }
        } else {
            const newFavorite = { user: userId, products: [productId] };

            await favoriteModel.create(newFavorite);

            return NextResponse.json({ message: "محصول با موفقیت به علاقه مندی ها اضافه شد.", data: newFavorite }, { status: 201 });
        }
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;

    try {
        const findFavorite = await favoriteModel.findOne({ userId });
        await findFavorite.products.pull({});
        findFavorite.save();

        return NextResponse.json({ message: "همه محصولات با موفقیت حذف شدند." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
