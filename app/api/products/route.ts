import ProductModel from "@/models/product";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    connectToDB();
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit") || 1000;

    try {
        const products = await ProductModel.find().limit(+limit);
        return NextResponse.json({ results: products }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    connectToDB();
    const { product } = await request.json();
    const { name, brand, price, discountedPrice, sizes, colors, categories } = product;

    try {
        const findProduct = await ProductModel.findOne({ name });
        if (findProduct) {
            return NextResponse.json({ message: "محصول با این نام وجود دارد." }, { status: 422 });
        }

        if (!name.trim()) {
            return NextResponse.json({ message: "لطفا نام محصول را وارد کنید." }, { status: 422 });
        } else if (!brand.trim()) {
            return NextResponse.json({ message: "لطفا نام برند را وارد کنید." }, { status: 422 });
        } else if (!price || price <= 0) {
            return NextResponse.json({ message: "لطفا قیمت محصول را وارد کنید." }, { status: 422 });
        } else if (discountedPrice >= price) {
            return NextResponse.json({ message: "قیمت تخفیف خورده نباید از قیمت اصلی بالاتر باشد." }, { status: 422 });
        } else if (!sizes.trim()) {
            return NextResponse.json({ message: "لطفا سایز(های) محصول را وارد کنید." }, { status: 422 });
        } else if (!colors.length) {
            return NextResponse.json({ message: "لطفا رنگ (های) محصول را وارد کنید." }, { status: 422 });
        } else {
            await ProductModel.create(product);

            return NextResponse.json({ message: "محصول با موفقیت اضافه شد.", result: product }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
