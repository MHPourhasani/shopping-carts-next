import EmptyState from "@/components/EmptyState";
import { getServerAuthSession } from "@/shared/auth";
import orderImage from "@/assets/icons/svgs/receipt-page.svg";
import PATH from "@/shared/path";
import API from "@/shared/api";
import SingleOrder from "@/features/ProfilePage/components/singleOrder";
import { IOrder } from "@/interfaces/general";
import { Metadata } from "next";

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const session = await getServerAuthSession();
    const order: IOrder = await getOrder(params.id, session?.user.userId!);

    return {
        title: `سفارش ${order.orderNo}`,
    };
}

const getOrder = async (order_id: string, user_id: string) => {
    try {
        const response = await fetch(API.orders.single_order(order_id, user_id), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (response.ok) {
            const { result } = await response.json();
            return result;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const SingleOrderPage = async ({ params }: Props) => {
    const session = await getServerAuthSession();
    const order: IOrder = await getOrder(params.id, session?.user.userId!);

    return session ? (
        <SingleOrder order={order} />
    ) : (
        <div className="flex w-full flex-1 flex-col gap-2">
            <h1 className="mb-5 text-3xl font-bold">سفارشات</h1>
            <EmptyState
                imgSrc={orderImage}
                title="لطفاً وارد شوید"
                linkHref={`${PATH.login()}?redirect=${PATH.profile.order.orders()}`}
                linkTitle="ورود به حساب کاربری"
            />
        </div>
    );
};

export default SingleOrderPage;
