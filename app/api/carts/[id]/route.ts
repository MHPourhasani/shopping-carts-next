import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/shared/db";
import cartModel from "@/models/cart";
import { ICart } from "@/interfaces/general";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;

    try {
        const findCart = await cartModel
            .findOne({ user: userId })
            .populate({ path: "products", populate: { path: "product" } })
            .lean();

        //@ts-ignore
        return NextResponse.json({ results: findCart ? findCart.products : [] }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;
    const { operator, productId } = await request.json();

    const findCart = await cartModel.findOne({ user: userId });

    try {
        if (findCart) {
            const findProduct = findCart.products.find((item: ICart) => item._id.toString() === productId);

            if (operator === "+") {
                findProduct.quantity += 1;
            } else if (operator === "-") {
                if (findProduct.quantity === 1) {
                    await findCart.products.pull({ _id: productId });
                } else {
                    findProduct.quantity -= 1;
                }
            }
            findCart.save();

            return NextResponse.json({ results: findCart, message: "محصول با موفقیت آپدیت شد." }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;

    try {
        const findCart = await cartModel.findOne({ user: userId });
        await findCart.products.pull({});
        findCart.save();

        return NextResponse.json({ message: "همه محصولات سبد خرید حذف شدند." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
