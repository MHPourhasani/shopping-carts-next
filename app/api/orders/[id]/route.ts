import { OrderInterface, ProductInterface } from "@/interfaces/general";
import orderModel from "@/models/order";
import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
    connectToDB();
    const order_id = params.id;
    const user_id = request.nextUrl.searchParams.get("user_id");
    const shop_id = request.nextUrl.searchParams.get("shop_id");

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
            return NextResponse.json(findOrder ? findOrder.orders[0] : {}, { status: 200 });
        } else if (shop_id) {
            const getAllOrders = await orderModel
                .find({})
                .populate({ path: "orders.products", populate: { path: "product" } })
                .lean();

            const shopOrder = getAllOrders
                .flatMap((item) => item.orders)
                .filter((item: OrderInterface) => {
                    let order = item.products.some(({ product }: { product: ProductInterface }) => String(product.shopper) === shop_id);
                    return order;
                })
                .find((item) => item.orderNo === order_id);

            return NextResponse.json(shopOrder ? shopOrder : {}, { status: 200 });
        } else {
            return NextResponse.json({ message: "آیدی کاربر نباید خالی باشد." }, { status: 429 });
        }
    } else {
        return NextResponse.json({ message: "آیدی سفارش نباید خالی باشد." }, { status: 429 });
    }
}
