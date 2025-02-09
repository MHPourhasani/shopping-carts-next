import blogModel from "@/models/blog";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const url = params.url;
    const findBlog = await blogModel.findOne({ link: url }).populate(["author", "relatedBlogs"]).lean();

    if (findBlog) {
        return NextResponse.json({ result: findBlog }, { status: 200 });
    } else {
        return NextResponse.json({ message: `بلاگ ${url} یافت نشد.` }, { status: 404 });
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const url = params.url;
    const { data } = await request.json();

    const findBlog = await blogModel.findOne({ link: url });

    try {
        if (findBlog) {
            const updatedBlog = await blogModel.findOneAndUpdate({ link: url }, { ...data }, { new: true });

            return NextResponse.json({ message: "بلاگ با موفقیت آپدیت شد.", result: updatedBlog }, { status: 200 });
        } else {
            return NextResponse.json({ message: "بلاگ یافت نشد." }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: any) {
    connectToDB();
    const id = params.url;

    try {
        await blogModel.deleteOne({ _id: id });
        return NextResponse.json({ message: "بلاگ با موفقیت حذف شد." }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
