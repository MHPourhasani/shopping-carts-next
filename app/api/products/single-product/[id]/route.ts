import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/models/product";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const id = params.id;
    const product = await ProductModel.findById(id).populate(["relatedProducts"]).lean();

    try {
        if (product) {
            return NextResponse.json({ result: product }, { status: 200 });
        } else {
            return NextResponse.json({ message: "محصول یافت نشد." }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const id = params.id;
    const { data } = await request.json();

    const findProduct = await ProductModel.findById(id);

    try {
        if (findProduct) {
            const updatedProduct = await ProductModel.findByIdAndUpdate(id, { ...data }, { new: true });

            return NextResponse.json({ message: "محصول با موفقیت آپدیت شد.", result: updatedProduct }, { status: 200 });
        } else {
            return NextResponse.json({ message: "محصول یافت نشد." }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: any) {
    connectToDB();
    const productId = params.id;

    try {
        await ProductModel.findByIdAndDelete(productId);

        return NextResponse.json({ message: "محصول با موفقیت حذف شد." }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
