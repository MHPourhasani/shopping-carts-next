import connectToDB from "@/shared/db";
import ProductModel from "@/models/product";
import { NextRequest, NextResponse } from "next/server";
import shopModel from "@/models/shop";
import blogModel from "@/models/blog";

export async function GET(req: NextRequest) {
    connectToDB();
    try {
        if (req.nextUrl.searchParams) {
            const searchValue = req.nextUrl.searchParams.get("q");
            const products = await ProductModel.find({ name: { $regex: searchValue } });
            const shops = await shopModel.find({ name: { $regex: searchValue } });
            const blogs = await blogModel.find({ subject: { $regex: searchValue } }).populate("author");

            const count = products.length + shops.length + blogs.length;
            const results = { products, shops, blogs };

            return NextResponse.json({ count, results }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
