import bannerModel from "@/models/banner";
import connectToDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    connectToDB();
    const mainBanners = await bannerModel.find({ type: "main" });
    try {
        return NextResponse.json({ results: mainBanners ? mainBanners : [] }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
