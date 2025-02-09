import blogModel from "@/models/blog";
import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    connectToDB();
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit") || 100;

    try {
        const blogs = await blogModel.find().limit(+limit).populate("author");
        return NextResponse.json({ results: blogs ? blogs : [] }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    connectToDB();
    const { author, data } = await request.json();

    try {
        if (!author) {
            return NextResponse.json({ message: "لطفا وارد شوید." }, { status: 401 });
        }

        const newBlog = { author, ...data };
        await blogModel.create(newBlog);

        return NextResponse.json({ message: "بلاگ با موفقیت اضافه شد.", result: newBlog }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
