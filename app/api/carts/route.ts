import connectToDB from "@/shared/db";
import cartModel from "@/models/cart";
import { NextRequest, NextResponse } from "next/server";
import { ICart } from "@/interfaces/general";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;
    const carts = await cartModel.find({ userId });

    try {
        return NextResponse.json({ carts }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    connectToDB();
    const { product, user } = await request.json();
    const { product: p } = await product;

    try {
        const findCart = await cartModel.findOne({ user });

        if (findCart) {
            const findProduct = await findCart.products.find((item: ICart) => item.product.toString() === p._id);

            if (findProduct && findProduct.size === +product.size && findProduct.color.hex === product.color.hex) {
                findProduct.quantity += product.quantity;

                const updateProduct = await cartModel.findOneAndUpdate(
                    { user },
                    {
                        products: [...findCart.products.filter((item: ICart) => item.product !== findProduct.product), findProduct],
                    },
                    { new: true },
                );

                return NextResponse.json({ message: "محصول با موفقیت آپدیت شد.", data: updateProduct }, { status: 200 });
            } else {
                const updateProduct = await cartModel.findOneAndUpdate(
                    { user },
                    { products: [...findCart.products, { ...product }] },
                    { new: true },
                );

                return NextResponse.json({ message: "محصول با موفقیت اضافه شد.", data: updateProduct }, { status: 200 });
            }
        } else {
            const productAdded = {
                user,
                products: [{ ...product }],
            };
            await cartModel.create(productAdded);

            return NextResponse.json({ message: "محصول با موفقیت اضافه شد.", data: productAdded }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;

    const carts = await cartModel.find({ userId });

    return NextResponse.json({ carts }, { status: 200 });
}
