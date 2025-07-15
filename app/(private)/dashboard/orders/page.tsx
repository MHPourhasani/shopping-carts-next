import { Metadata } from "next";
import Orders from "@/features/ProfilePage/components/orders";
import Error500 from "@/shared/components/Error500";
import API from "@/shared/libs/api/endpoints";
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

    return orders !== undefined ? <Orders orders={orders ? orders : []} /> : <Error500 />;
};

export default OrderPage;
