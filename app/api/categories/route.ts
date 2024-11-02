import connectToDB from "@/utils/db";
import { NextResponse } from "next/server";
import categoryModel from "@/models/category";

export async function GET() {
    connectToDB();
    const mainCategories = await categoryModel.find({});

    try {
        return NextResponse.json({ results: mainCategories ? mainCategories : [] }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
