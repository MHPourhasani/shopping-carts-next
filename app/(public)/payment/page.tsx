import EmptyState from "@/shared/components/EmptyState";
import { Metadata } from "next";
import orderImage from "@/assets/icons/svgs/receipt-page.svg";
import PATH from "@/shared/utils/path";
import Link from "next/link";
import Image from "next/image";
import successfullyOrder from "@/public/images/png/successfully-order.png";
import { Button } from "@/components/ui/button";
import { getTokenServer } from "@/shared/libs/axios";
import { redirect } from "next/navigation";

const title = "پرداخت";

export const metadata: Metadata = {
    title: title,
    openGraph: { title: title },
    twitter: { title: title },
};

const PaymentPage = async () => {
    const authToken = await getTokenServer();
    if (!authToken?.access)
        return (
            <EmptyState
                imgSrc={orderImage}
                title="لطفاً وارد شوید"
                linkHref={`${PATH.login()}?redirect=${PATH.profile.order.main()}`}
                linkTitle="ورود به حساب کاربری"
            />
        );

    return (
        <div className="bg-primary-100 absolute inset-0 flex w-full flex-1 flex-col">
            <div className="flex w-full flex-1 flex-col items-center justify-center p-4">
                <Image src={successfullyOrder} alt="successfully order" />
            </div>

            <div className="bg-bg-2 dark:bg-secondary-800 flex w-full flex-1 flex-col items-center justify-center gap-4 rounded-t-3xl p-4">
                <h1 className="mb-5 text-3xl font-bold">سفارش با موفقیت ثبت شد.</h1>
                <p>شما یک ایمیل تایید دریافت خواهید کرد.</p>
                <Link href={PATH.profile.order.main()} className="w-full">
                    <Button>جزئیات سفارش را ببینید</Button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentPage;
