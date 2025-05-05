import EmptyState from "@/shared/components/EmptyState";
import { getServerAuthSession } from "@/shared/auth";
import orderImage from "@/assets/icons/svgs/receipt-page.svg";
import PATH from "@/shared/path";
import { Metadata } from "next";
import Orders from "@/features/ProfilePage/components/orders";
import Error500 from "@/shared/components/Error500";
import API from "@/shared/api";
import PageHeader from "@/shared/components/PageHeader";

export const metadata: Metadata = {
    title: "سفارشات",
};

const getOrders = async (user_id: string) => {
    try {
        const res = await fetch(API.orders.orders_list() + `?user_id=${user_id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });

        if (res.ok) {
            const { results } = await res.json();
            return results;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const OrderPage = async () => {
    const session = await getServerAuthSession();
    const orders = await getOrders(session?.user.userId!);

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
                linkHref={`${PATH.login()}?redirect=${PATH.profile.order.orders()}`}
                linkTitle="ورود به حساب کاربری"
            />
        </div>
    );
};

export default OrderPage;
