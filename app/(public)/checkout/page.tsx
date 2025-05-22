import PageHeader from "@/shared/components/PageHeader";
import API from "@/shared/api";
import { getServerAuthSession } from "@/shared/auth";
import Checkout from "@/features/CheckoutPage/components/checkout";
import PATH from "@/shared/path";
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

    return (
        <section className="container flex w-full flex-1 flex-col gap-4 lg:gap-8">
            <PageHeader title="تسویه حساب" />
            <Checkout carts={carts ? carts : []} />;
        </section>
    );
};

export default CheckoutPage;
