import blogModel from "@/models/blog";
import userModel from "@/models/user";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: any) {
    connectToDB();
    const id = params.id;
    const findUser = await userModel.findById(id);

    if (findUser) {
        const userBlogs = await blogModel.find({ author: id }).populate("author");

        return NextResponse.json({ user: findUser, blogs: userBlogs }, { status: 200 });
    } else {
        return NextResponse.json({ message: `کاربر یافت نشد.` }, { status: 404 });
    }
}
