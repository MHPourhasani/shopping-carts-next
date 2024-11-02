import reviewModel from "@/models/review";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    connectToDB();
    try {
        const reviewsFromDB = await reviewModel.find();
        const allComments = reviewsFromDB.map(({ reviews }: any) => reviews);

        return NextResponse.json({ reviews: allComments.flat(1) }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    connectToDB();
    const { title, description, rating, author, product } = await request.json();

    try {
        const addedComment = new reviewModel({ author, product, title, description, rating });
        await addedComment.save();

        return NextResponse.json({ data: addedComment, message: "نظر با موفقیت ثبت شد." }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
