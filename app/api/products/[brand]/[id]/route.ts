import connectToDB from "@/utils/db";
import productModel from "../../../../../models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const id = params.id;
    const product = await productModel.findById(id).populate("shopper");

    if (product) {
        return NextResponse.json({ product }, { status: 200 });
    } else {
        return NextResponse.json({ message: "محصول یافت نشد." }, { status: 404 });
    }
}

export async function POST(request: NextRequest) {
    connectToDB();
    const { productId, quantity, size, isFavorite } = await request.json();

    try {
        const newProduct = new productModel({
            productId,
            quantity,
            size,
            isFavorite,
        });

        const addProduct = await newProduct.save();

        return NextResponse.json({ message: "محصول با موفقیت اضافه شد.", data: addProduct }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
