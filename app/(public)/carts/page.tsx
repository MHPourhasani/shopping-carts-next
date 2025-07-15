import Carts from "@/features/CartPage/components/carts";
import { Metadata } from "next";
import API from "@/shared/libs/api/endpoints";
import { redirect } from "next/navigation";
import PATH from "@/shared/utils/path";
import { authTokenClient } from "@/shared/constant";

export const metadata: Metadata = {
    title: "سبد خرید",
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

const CartsPage = async () => {
    if (!authTokenClient?.access) {
        redirect(`${PATH.login()}?redirect=${PATH.carts()}`);
    }
    const carts = await getCarts(authTokenClient!.access);

    return <Carts carts={carts ? carts : []} />;
};

export default CartsPage;
