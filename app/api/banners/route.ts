import bannerModel from "@/models/banner";
import connectToDB from "@/shared/db";
import { NextResponse } from "next/server";

export async function GET() {
    connectToDB();
    try {
        const mainBanners = await bannerModel.find({ type: "main" });
        return NextResponse.json({ results: mainBanners ?? [] }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
