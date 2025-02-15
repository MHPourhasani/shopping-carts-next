"use client";
import orderImage from "@/assets/icons/svgs/receipt-page.svg";
import EmptyState from "@/components/EmptyState";
import { IOrder } from "@/interfaces/general";
import PATH from "@/shared/path";
import OrderCardItem from "@/components/Order/OrderCardItem";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { UserRoleEnum } from "@/interfaces/enums";

interface Props {
    orders: IOrder[];
}

const orderStatus = [""];

const Orders = (props: Props) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({});
    const [orders, setOrders] = useState(props.orders);
    const userState = useAppSelector((state: any) => state.auth.user);

    useEffect(() => {
        if (search.trim()) {
            setOrders((prev) => prev.filter((orders) => orders.orderNo.toLowerCase().includes(search.trim().toLowerCase())));
        } else {
            setOrders(props.orders);
        }
    }, [search, orders]);

    return userState?.role === UserRoleEnum.SHOPPER || userState?.role === UserRoleEnum.ADMIN ? (
        <section className="no-scrollbar flex w-full flex-1 flex-col gap-4 overflow-y-auto lg:gap-8">
            <PageHeader title="سفارشات" mobileBackButton={true} desktopBackButton={false} />

            <div className="flex items-center gap-4">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="جستجوی سفارش مورد نظر"
                    className="w-full rounded-xl px-4 py-3 outline-none"
                />

                <div></div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
                <div className="grid grid-cols-11 items-center justify-between gap-2 border-b border-gray-300 pb-2">
                    <span className="col-span-4">شماره سفارش</span>
                    <span className="col-span-2">تاریخ</span>
                    <span className="col-span-2">نام مشتری</span>
                    <span className="col-span-2">وضعیت</span>
                    <span></span>
                </div>

                {orders && orders.length ? (
                    <div className="flex w-full flex-1 flex-col gap-4">
                        {orders.map((item: IOrder) => {
                            return <OrderCardItem key={item.orderNo} href={PATH.profile.order.single_order(item.orderNo)} order={item} />;
                        })}
                    </div>
                ) : (
                    <EmptyState imgSrc={orderImage} title="سفارشی وجود ندارد." imgClassName="w-1/4" />
                )}
            </div>
        </section>
    ) : (
        <EmptyState imgSrc={orderImage} title="شما دسترسی ندارید." imgClassName="w-1/4" />
    );
};

export default Orders;
