import connectToDB from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";
import orderModel from "@/models/order";
import userModel from "@/models/user";
import { UserRoleEnum } from "@/interfaces/enums";

export async function GET(req: NextRequest) {
    connectToDB();
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");

    try {
        if (user_id) {
            const user = await userModel.findById(user_id);

            if (user && (user.role === UserRoleEnum.SHOPPER || user.role === UserRoleEnum.ADMIN)) {
                const findUser = await orderModel.findOne({ user: user_id });
                return NextResponse.json({ results: findUser ? findUser.orders : [] }, { status: 200 });
            }
        } else {
            return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد." }, { status: 429 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    connectToDB();
    const { userId, payment, products, address, description, pricePaid } = await request.json();

    try {
        const findUser = await orderModel.findOne({ user: userId });

        if (findUser) {
            const updateOrders = await orderModel.findOneAndUpdate(
                { user: userId },
                {
                    orders: [
                        ...findUser.orders,
                        {
                            orderNo: crypto.randomUUID(),
                            products,
                            payment,
                            address,
                            description,
                            pricePaid,
                            createdAt: new Date().getTime(),
                        },
                    ],
                },
                { new: true },
            );
            return NextResponse.json({ message: "سفارش با موفقیت ثبت شد.", results: updateOrders }, { status: 200 });
        } else {
            if (!userId) {
                return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد." }, { status: 422 });
            }

            const newOrder = {
                user: userId,
                orders: [
                    {
                        orderNo: crypto.randomUUID(),
                        products,
                        payment,
                        address,
                        description,
                        pricePaid,
                        createdAt: new Date().getTime(),
                    },
                ],
            };

            await orderModel.create(newOrder);

            return NextResponse.json({ message: "سفارش با موفقیت ثبت شد.", results: newOrder }, { status: 201 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
