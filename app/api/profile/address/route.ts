import userModel from "@/models/user";
import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {}: any) {
    connectToDB();
    if (request.nextUrl.searchParams) {
        const userId = request.nextUrl.searchParams.get("userId");

        try {
            const findUser = await userModel.findOne({ _id: userId });

            return NextResponse.json(findUser?.addresses, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: error }, { status: 500 });
        }
    }
}

export const POST = async (request: NextRequest) => {
    await connectToDB();
    const { userId, addressData } = await request.json();
    const existUser = await userModel.findOne({ _id: userId });

    try {
        if (existUser) {
            return NextResponse.json(
                {
                    message: "آدرس با موفقیت اضافه شد.",
                    data: { ...addressData, isSelected: !existUser?.addresses.length ? true : false },
                },
                { status: 201 },
            );
        } else {
            return NextResponse.json({ message: "کاربر یافت نشد." }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
};
