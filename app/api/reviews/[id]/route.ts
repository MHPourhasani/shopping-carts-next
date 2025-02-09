import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/shared/db";
import reviewModel from "@/models/review";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const product_id = params.id;

    try {
        const allReviews = await reviewModel.find({ product: product_id }).populate("author").lean();

        return NextResponse.json({ reviews: allReviews }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
