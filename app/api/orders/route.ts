import connectToDB from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import orderModel from "@/models/order";
import userModel from "@/models/user";
import { ProductInterface, UserRoleEnum } from "@/interfaces/general";

export async function GET(req: NextRequest) {
    connectToDB();
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");
    const shop_id = url.searchParams.get("shop_id");

    const userOrders = await orderModel.findOne({ user: user_id });
    const user = await userModel.findById(user_id);

    if (shop_id && user.role !== UserRoleEnum.USER) {
        const getAllOrders = await orderModel
            .find({})
            .populate({ path: "orders.products", populate: { path: "product" } })
            .lean();

        const shopOrders = getAllOrders
            .flatMap((item) => item.orders)
            .filter((item) => {
                let order = item.products.some(({ product }: { product: ProductInterface }) => String(product.shopper) === shop_id);
                return order;
            });

        return NextResponse.json({ userOrders: userOrders ? userOrders : [], shopOrders: shopOrders ? shopOrders : [] }, { status: 200 });
    } else {
        return NextResponse.json({ userOrders: userOrders ? userOrders : [] }, { status: 200 });
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
            return NextResponse.json({ message: "سفارش با موفقیت ثبت شد.", data: updateOrders }, { status: 200 });
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

            return NextResponse.json({ message: "سفارش با موفقیت ثبت شد.", data: newOrder }, { status: 201 });
        }
    } catch (err: any) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
