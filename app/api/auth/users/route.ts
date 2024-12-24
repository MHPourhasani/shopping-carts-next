import { UserRoleEnum } from "@/interfaces/enums";
import userModel from "@/models/user";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    connectToDB();
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");
    const user = await userModel.findOne({ _id: user_id });

    try {
        if (user && user.role === UserRoleEnum.ADMIN) {
            const allUsers = await userModel.find({});
            const users = allUsers.filter((user) => String(user._id) !== user_id);

            return NextResponse.json({ data: users }, { status: 200 });
        } else {
            return NextResponse.json({ message: "شما اجازه دسترسی ندارید." }, { status: 403 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
