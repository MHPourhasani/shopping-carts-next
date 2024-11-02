import userModel from "@/models/user";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: any) {
    try {
        connectToDB();
        const id = params.id;
        const user = await userModel.findById(id);

        return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const { role } = await request.json();

    try {
        const updatedUser = await userModel.findByIdAndUpdate(params.id, { role }, { new: true });

        if (updatedUser) {
            return NextResponse.json(
                {
                    message: "نقش کاربر با موفقیت تغییر کرد.",
                    data: updatedUser,
                },
                {
                    status: 200,
                },
            );
        } else {
            return NextResponse.json({ message: "ویرایش کاربر با خطا مواجه شد." }, { status: 429 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}

export async function DELETE(_req: NextRequest, { params }: any) {
    connectToDB();
    const userId = params.id;
    await userModel.deleteOne({ _id: userId }, { new: true });

    return NextResponse.json({ message: "کاربر با موفقیت حذف شد." }, { status: 200 });
}
