import connectToDB from "@/shared/db";
import productModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const brand = params.brand;

    try {
        const products = await productModel.find({ brand });

        return NextResponse.json({ results: products }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
