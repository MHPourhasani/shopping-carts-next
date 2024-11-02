import { AddressInterface } from "@/interfaces/general";
import userModel from "@/models/user";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const addressId = params.id;
    const { userId } = await request.json();

    const findUser = await userModel.findById({ _id: userId });

    try {
        if (findUser) {
            await findUser.addresses.map((adr: AddressInterface) => {
                if (adr._id.toString() !== addressId) {
                    adr.isSelected = false;
                } else {
                    adr.isSelected = !adr.isSelected;
                }
            });
            findUser.save();

            return NextResponse.json({ message: "آدرس با موفقیت انتخاب شد.", data: findUser.addresses }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
