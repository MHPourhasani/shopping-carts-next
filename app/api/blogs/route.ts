import blogModel from "@/models/blog";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    connectToDB();
    const url = new URL(req.url);
    const limit = url.searchParams.get("limit") || 100;

    const blogs = await blogModel.find().limit(+limit).populate("author");
    return NextResponse.json({ results: blogs }, { status: 200 });
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

        return NextResponse.json(
            {
                message: "بلاگ با موفقست اضافه شد.",
                data: newBlog,
            },
            { status: 201 },
        );
    } catch (err: any) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
