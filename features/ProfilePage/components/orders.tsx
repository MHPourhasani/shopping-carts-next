"use client";
import orderImage from "@/assets/icons/svgs/receipt-page.svg";
import EmptyState from "@/shared/components/EmptyState";
import PATH from "@/shared/utils/path";
import OrderCardItem from "@/features/Orders/components/OrderCardItem";
import PageHeader from "@/shared/components/PageHeader";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/assets/icons/components/Search";
import { IOrder } from "@/features/Orders/interfaces";
import { UserRoleEnum } from "@/features/auth/enums";

interface Props {
    orders: IOrder[];
}

const Orders = (props: Props) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({});
    const [orders, setOrders] = useState(props.orders);
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        if (search.trim()) {
            setOrders((prev) => prev.filter((orders) => orders._id.toLowerCase().includes(search.trim().toLowerCase())));
        } else {
            setOrders(props.orders);
        }
    }, [search, orders]);

    return user?.role === UserRoleEnum.SELLER || user?.role === UserRoleEnum.ADMIN ? (
        <section className="no-scrollbar flex w-full flex-1 flex-col gap-4 overflow-y-auto lg:gap-8">
            <PageHeader title="سفارشات" mobileBackButton={true} desktopBackButton={false} />

            <div className="relative flex w-full flex-col items-center justify-center">
                <Input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="جستجوی سفارش مورد نظر"
                    className="!pl-12"
                />

                <SearchIcon
                    // onClick={() => router.push(`${PATH.search()}?q=${searchValue}`)}
                    className="stroke-secondary-300 absolute top-1/4 left-4 h-auto w-5 cursor-pointer dark:stroke-gray-300"
                />
            </div>

            <div className="flex flex-1 flex-col gap-4">
                <div className="grid grid-cols-11 items-center justify-between gap-2 border-b border-gray-300 pb-2 lg:pr-16">
                    <span className="col-span-4">شماره سفارش</span>
                    <span className="col-span-2">تاریخ</span>
                    <span className="col-span-2">نام مشتری</span>
                    <span className="col-span-2">وضعیت</span>
                    <span></span>
                </div>

                {orders && orders.length ? (
                    <div className="flex w-full flex-1 flex-col gap-4">
                        {orders.map((item: IOrder) => {
                            return <OrderCardItem key={item._id} href={PATH.profile.order.single_order(item._id)} order={item} />;
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
