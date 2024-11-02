"use client";
import orderImage from "@/assets/icons/svgs/receipt-page.svg";
import EmptyState from "@/components/EmptyState";
import { OrderInterface, UserRoleEnum } from "@/interfaces/general";
import PATH from "@/utils/path";
import OrderCardItem from "@/components/Order/OrderCardItem";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

interface Props {
    orders: OrderInterface[];
}

const Orders = (props: Props) => {
    const [orders] = useState<OrderInterface[]>(props.orders);
    const userState = useAppSelector((state: any) => state.auth.user);

    return userState?.role === UserRoleEnum.SHOPPER || userState?.role === UserRoleEnum.ADMIN ? (
        <section className="no-scrollbar flex w-full flex-1 flex-col gap-4 overflow-y-auto lg:gap-8">
            <PageHeader title="سفارشات" mobileBackButton={true} desktopBackButton={false} />

            {orders && orders.length ? (
                <div className="flex w-full flex-1 flex-col gap-4">
                    {orders.map((item: OrderInterface) => {
                        return <OrderCardItem key={item.orderNo} href={PATH.profile.order.single_order(item.orderNo)} order={item} />;
                    })}
                </div>
            ) : (
                <EmptyState imgSrc={orderImage} title="سفارشی وجود ندارد." imgClassName="w-1/4" />
            )}
        </section>
    ) : (
        <EmptyState imgSrc={orderImage} title="شما دسترسی ندارید." imgClassName="w-1/4" />
    );
};

export default Orders;
