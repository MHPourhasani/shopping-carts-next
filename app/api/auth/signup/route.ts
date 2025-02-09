import userModel from "@/models/user";
import connectToDB from "@/shared/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    await connectToDB();
    const { email, password, ...rest } = await request.json();
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
        return NextResponse.json({ message: "این ایمیل از قبل وجود دارد." }, { status: 422 });
    } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = { email, password: hashedPassword, ...rest };

        try {
            await userModel.create(newUser);
            return NextResponse.json({ message: "کاربر با موفقیت ثبت نام شد.", result: newUser }, { status: 201 });
        } catch (error: any) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
};
