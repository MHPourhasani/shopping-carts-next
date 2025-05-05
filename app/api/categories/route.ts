import connectToDB from "@/shared/db";
import { NextResponse } from "next/server";
import categoryModel from "@/models/category";

export async function GET() {
    connectToDB();
    try {
        const mainCategories = await categoryModel.find();
        return NextResponse.json({ results: mainCategories ?? [] }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
