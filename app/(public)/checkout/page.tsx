import API from "@/utils/api";
import { getServerAuthSession } from "@/utils/auth";
import Checkout from "@/utils/pages/checkout";
import PATH from "@/utils/path";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "تسویه حساب",
};

const getCarts = async (user_id: string) => {
    try {
        const response = await fetch(API.cart.cart_products(user_id), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const { results } = await response.json();
            return results;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const CheckoutPage = async () => {
    const session = await getServerAuthSession();
    if (!session) {
        redirect(`${PATH.login()}?redirect=${PATH.checkout()}`);
    }
    const carts = await getCarts(session?.user.userId!);

    return <Checkout carts={carts ? carts : []} />;
};

export default CheckoutPage;
