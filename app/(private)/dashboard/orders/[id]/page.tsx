import API from "@/shared/libs/api/endpoints";
import SingleOrder from "@/features/ProfilePage/components/singleOrder";
import { Metadata } from "next";

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const order = await getOrder(params.id);

    return {
        title: `سفارش ${order.orderNo}`,
    };
}

const getOrder = async (order_id: string) => {
    try {
        const response = await fetch(API.orders.single_order(order_id), {
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
    const order = await getOrder(params.id);

    return <SingleOrder order={order} />;
};

export default SingleOrderPage;
