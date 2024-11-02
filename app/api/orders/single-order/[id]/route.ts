import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/utils/db";
import { CartInterface } from "@/interfaces/general";
import orderModel from "@/models/order";

export async function GET(request: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;
    const order_id = request.nextUrl.searchParams.get("order_id");

    if (order_id) {
        const findUser = await orderModel.findOne({ user: userId }).populate({ path: "orders", populate: "products" }).lean();
        return NextResponse.json({ order: findUser }, { status: 200 });
    } else {
        return NextResponse.json({ message: "آیدی سفارش نباید خالی باشد." }, { status: 429 });
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;
    const { operator, productId } = await request.json();

    const findCart = await orderModel.findOne({ user: userId });

    try {
        if (findCart) {
            const findProduct = findCart.products.find((item: CartInterface) => item._id.toString() === productId);

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

            return NextResponse.json({ message: "محصول با موفقیت آپدیت شد.", data: findCart }, { status: 200 });
        }
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;

    const findCart = await orderModel.findOne({ user: userId });
    await findCart.products.pull({});
    findCart.save();

    return NextResponse.json({ message: "همه محصولات با موفقیت حذف شدند." }, { status: 200 });
}
