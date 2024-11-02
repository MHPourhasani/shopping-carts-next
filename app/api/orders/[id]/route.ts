import orderModel from "@/models/order";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
    connectToDB();
    const order_id = params.id;
    const user_id = request.nextUrl.searchParams.get("user_id");

    try {
        if (order_id) {
            if (user_id) {
                const findOrder = await orderModel
                    .findOne(
                        { user: user_id },
                        {
                            orders: {
                                $elemMatch: { orderNo: order_id },
                            },
                        },
                    )
                    .populate({ path: "orders.products", populate: { path: "product" } })
                    .lean();

                // @ts-ignore
                return NextResponse.json({ result: findOrder ? findOrder.orders[0] : {} }, { status: 200 });
            } else {
                return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد." }, { status: 429 });
            }
        } else {
            return NextResponse.json({ message: "آیدی سفارش نباید خالی باشد." }, { status: 429 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
