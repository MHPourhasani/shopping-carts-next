"use client";
import orderImage from "@/assets/icons/svgs/receipt-page.svg";
import EmptyState from "@/components/EmptyState";
import { OrderInterface, UserRoleEnum } from "@/interfaces/general";
import PATH from "@/utils/path";
import OrderCardItem from "@/components/Order/OrderCardItem";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import API from "../api";
import { useSession } from "next-auth/react";

interface Props {
    orders: {
        userOrders?: OrderInterface[];
        shopOrders?: OrderInterface[];
    };
}

const Orders = (props: Props) => {
    const [orders, setOrders] = useState<any>({ userOrders: props.orders.userOrders, shopOrders: [] });
    const [isLoading, setIsLoading] = useState(true);
    const userState = useAppSelector((state: any) => state.auth.user);
    const shopState = useAppSelector((state: any) => state.shop.shop);
    const { data: session } = useSession();

    useEffect(() => {
        if (shopState && userState && userState.role !== UserRoleEnum.USER) {
            getShopOrders();
        }
    }, [shopState, userState]);

    const getShopOrders = async () => {
        try {
            const response = await fetch(API.orders.orders_list() + `?user_id=${session!.user.userId}&shop_id=${shopState._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const { shopOrders } = await response.json();
            setOrders({ ...orders, shopOrders: shopOrders });
        } catch (error: any) {
            toast.error(error);
        }
        setIsLoading(false);
    };

    return (
        <section className="no-scrollbar flex w-full flex-1 flex-col gap-4 overflow-y-auto lg:gap-8">
            <PageHeader title="سفارشات" mobileBackButton={true} desktopBackButton={false} />

            <div className="flex w-full flex-1 flex-col gap-4">
                {userState?.role !== UserRoleEnum.USER && <h2 className="text-lg font-semibold">سفارشات من</h2>}
                {orders.userOrders && orders.userOrders.orders.length ? (
                    <>
                        {orders.userOrders.orders.map((item: OrderInterface) => {
                            return <OrderCardItem key={item.orderNo} href={PATH.profile.order.single_order(item.orderNo)} order={item} />;
                        })}
                    </>
                ) : (
                    <EmptyState imgSrc={orderImage} title="سفارشی وجود ندارد." imgClassName="w-1/4" />
                )}
            </div>

            {userState?.role !== UserRoleEnum.USER && (
                <div className="mt-10 flex w-full flex-1 flex-col gap-4">
                    <h2 className="text-lg font-semibold">سفارشات فروشگاه</h2>
                    {!isLoading ? (
                        orders.shopOrders && orders.shopOrders.length ? (
                            <>
                                {orders.shopOrders.map((item: OrderInterface) => {
                                    return (
                                        <OrderCardItem
                                            key={item.orderNo}
                                            href={PATH.profile.order.single_order(item.orderNo)}
                                            order={item}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <EmptyState imgSrc={orderImage} title="سفارشی وجود ندارد." imgClassName="w-1/4" />
                        )
                    ) : (
                        <p>در حال بارگزاری...</p>
                    )}
                </div>
            )}
        </section>
    );
};

export default Orders;
