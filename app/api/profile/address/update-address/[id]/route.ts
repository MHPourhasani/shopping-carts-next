import { IAddress } from "@/interfaces/general";
import userModel from "@/models/user";
import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
    connectToDB();
    const addressId = params.id;
    const { userId, addressData } = await request.json();

    const findUser = await userModel.findById({ _id: userId });

    try {
        if (findUser) {
            await findUser.addresses.map((adr: IAddress) => {
                if (adr._id.toString() !== addressId) {
                    return adr;
                } else {
                    adr.address_title = addressData.address_title;
                    adr.address_value = addressData.address_value;
                }
            });

            findUser.save();

            return NextResponse.json({ message: "آدرس با موفقیت ویرایش شد.", data: findUser.addresses }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
