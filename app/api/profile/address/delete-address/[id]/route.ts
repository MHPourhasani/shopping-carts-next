import userModel from "@/models/user";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: any) {
    connectToDB();
    const addressId = params.id;
    const { userId } = await request.json();

    const findUser = await userModel.findById({ _id: userId });

    try {
        if (findUser) {
            await findUser.addresses.pull({ _id: addressId });
            await findUser.save();

            return NextResponse.json({ message: "آدرس با موفقیت حذف شد.", data: findUser }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
