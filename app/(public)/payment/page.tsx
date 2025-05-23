import EmptyState from "@/shared/components/EmptyState";
import { Metadata } from "next";
import orderImage from "@/assets/icons/svgs/receipt-page.svg";
import PATH from "@/shared/path";
import Link from "next/link";
import Image from "next/image";
import successfullyOrder from "@/public/images/png/successfully-order.png";
import { getServerAuthSession } from "@/shared/auth";
import { Button } from "@/components/ui/button";

const title = "پرداخت";

export const metadata: Metadata = {
    title: title,
    openGraph: { title: title },
    twitter: { title: title },
};

const PaymentPage = async () => {
    const session = await getServerAuthSession();

    return session ? (
        <div className="bg-primary-100 absolute inset-0 flex w-full flex-1 flex-col">
            <div className="flex w-full flex-1 flex-col items-center justify-center p-4">
                <Image src={successfullyOrder} alt="successfully order" />
            </div>

            <div className="bg-bg-2 dark:bg-secondary-800 flex w-full flex-1 flex-col items-center justify-center gap-4 rounded-t-3xl p-4">
                <h1 className="mb-5 text-3xl font-bold">سفارش با موفقیت ثبت شد.</h1>
                <p>شما یک ایمیل تایید دریافت خواهید کرد.</p>
                <Link href={PATH.profile.order.orders()} className="w-full">
                    <Button>جزئیات سفارش را ببینید</Button>
                </Link>
            </div>
        </div>
    ) : (
        <EmptyState
            imgSrc={orderImage}
            title="لطفاً وارد شوید"
            linkHref={`${PATH.login()}?redirect=${PATH.profile.order.orders()}`}
            linkTitle="ورود به حساب کاربری"
        />
    );
};

export default PaymentPage;
