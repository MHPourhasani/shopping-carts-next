import EmptyState from "@/shared/components/EmptyState";
import orderImage from "@/assets/icons/svgs/receipt-page.svg";
import PATH from "@/shared/utils/path";
import { Metadata } from "next";
import Orders from "@/features/ProfilePage/components/orders";
import Error500 from "@/shared/components/Error500";
import API from "@/shared/libs/api/endpoints";
import PageHeader from "@/shared/components/PageHeader";
import { IPaginatedResponse } from "@/shared/interfaces";
import { IOrder } from "@/features/Orders/interfaces";
import { get } from "@/shared/libs/api/axios";

export const metadata: Metadata = {
    title: "سفارشات",
};

const getOrders = async () => {
    const data = await get<IPaginatedResponse<IOrder>>(API.orders.list());
    return data.results;
};

const OrderPage = async () => {
    const orders = await getOrders();

    return session ? (
        orders !== undefined ? (
            <Orders orders={orders ? orders : []} />
        ) : (
            <Error500 />
        )
    ) : (
        <div className="flex w-full flex-1 flex-col gap-2">
            <PageHeader title="سفارشات" mobileBackButton={true} desktopBackButton={false} />
            <EmptyState
                imgSrc={orderImage}
                title="لطفاً وارد شوید"
                linkHref={`${PATH.login()}?redirect=${PATH.dashboard.order.orders()}`}
                linkTitle="ورود به حساب کاربری"
            />
        </div>
    );
};

export default OrderPage;
