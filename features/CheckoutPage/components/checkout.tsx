"use client";
import { redirect, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ICart } from "@/interfaces/general";
import PATH from "@/shared/utils/path";
import { removeAllCarts } from "@/redux/slices/cartsSlice";
import API from "../../../shared/libs/endpoints";
import Toman from "@/assets/icons/components/Toman";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IAddress } from "@/features/auth/interfaces";

const Checkout = ({ carts }: { carts: ICart[] }) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [error, setError] = useState({ information: "", address: "" });
    const [description, setDescription] = useState("");
    const router = useRouter();
    const taxPercent = Number(process.env.TAX_PERCENT) || 9;

    // if (!authTokenClient?.access) {
    //     redirect(`${PATH.login()}?redirect=${PATH.checkout()}`);
    // }

    const deleteAllCarts = async () => {
        try {
            await fetch(`/api/carts`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            dispatch(removeAllCarts());
        } catch (error: any) {
            console.error(error);
        }
    };

    const goToPayment = async () => {
        if (!user?.first_name || !user?.last_name || !user?.phone) {
            setError({ ...error, information: "Please enter empty field" });
        } else if (!user?.addresses.find((adr: IAddress) => adr.isDefault)) {
            setError({ ...error, address: "Please add an address" });
        } else {
            const res = await fetch(API.orders.list(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: carts,
                    address: user?.addresses.find((adr: IAddress) => adr.isDefault),
                    description: description ? description : undefined,
                    payment: { method: "online", transportCost: 10 },
                    pricePaid: calculateTotalPrice(),
                }),
            });

            if (res.ok) {
                deleteAllCarts();
                router.push(PATH.payment());
            }
        }
    };

    const calculateSubTotalPrice = () => {
        return carts.reduce((acc: any, curr: any) => acc + curr.quantity * curr.product?.price, 0)?.toFixed(2);
    };

    const calculateTotalPrice = () => {
        return (+calculateSubTotalPrice() + +calculateShippingPrice() + +calculateTaxPrice()).toFixed(2);
    };

    const calculateShippingPrice = () => {
        return (calculateSubTotalPrice() * 0.1).toFixed(2);
    };

    const calculateTaxPrice = () => {
        return (calculateSubTotalPrice() * (taxPercent / 100)).toFixed(2);
    };

    useEffect(() => {
        calculateSubTotalPrice();
        calculateTaxPrice();
        calculateTotalPrice();
    }, [carts]);

    return (
        <div className="flex w-full flex-1 flex-col items-start justify-between gap-4 lg:flex-row lg:gap-8">
            <div className="flex w-full flex-col gap-4 lg:flex-1">
                <div className="bg-bg-2 dark:bg-secondary-700 flex w-full flex-col items-start gap-4 rounded-xl p-4">
                    <div className="flex w-full items-center justify-between">
                        <span className="text-lg font-bold">اطلاعات مشتری</span>
                        <Link href={PATH.profile.edit_personal()} className="text-primary-100 lg:hidden">
                            ویرایش
                        </Link>
                        <Link href={PATH.profile.main()} className="text-primary-100 hidden lg:flex">
                            ویرایش
                        </Link>
                    </div>

                    <div className="flex w-full flex-col gap-3 text-gray-500">
                        <span className="flex w-full justify-between gap-4">
                            <span className="min-w-fit">نام</span>
                            <p className="truncate">{user?.first_name ? user.first_name : "empty"}</p>
                        </span>

                        <span className="flex w-full justify-between gap-4">
                            <span className="min-w-fit">نام خانوادگی</span>
                            <p className="truncate">{user?.last_name ? user.last_name : "empty"}</p>
                        </span>

                        <span className="flex w-full justify-between gap-4">
                            <span className="min-w-fit">شماره تماس</span>
                            <p>{user?.phone ? user.phone : "empty"}</p>
                        </span>

                        <span className="flex w-full justify-between gap-4">
                            <span className="min-w-fit">ایمیل</span>
                            <p className="truncate">{user?.email}</p>
                        </span>
                    </div>

                    {error.information && <p className="text-red-500">{error.information}</p>}
                </div>

                <div className="bg-bg-2 dark:bg-secondary-700 flex w-full flex-col items-start gap-4 rounded-xl p-4">
                    <div className="flex w-full items-center justify-between">
                        <span className="text-lg font-bold">آدرس</span>
                        <span onClick={() => router.push(PATH.profile.address())} className="text-primary-100 lg:hidden">
                            {user?.addresses.length ? "ویرایش" : "افزودن"}
                        </span>
                        <span
                            onClick={() => router.push(PATH.profile.address())}
                            className="text-primary-100 hidden cursor-pointer lg:flex"
                        >
                            {user?.addresses.length ? "ویرایش" : "افزودن"}
                        </span>
                    </div>

                    {user?.addresses.length ? (
                        <p className="break-all text-gray-500">{user?.addresses.filter((adr: IAddress) => adr.isDefault)[0].address}</p>
                    ) : null}

                    {error.address && <p className="text-red-500">{error.address}</p>}
                </div>

                <div className="bg-bg-2 dark:bg-secondary-700 flex w-full flex-col items-start gap-4 rounded-xl p-4">
                    <Textarea
                        label="توضیحات"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="dark:bg-secondary-600 max-h-96 min-h-60 w-full bg-gray-400"
                    />
                </div>
            </div>

            <div className="lg:bg-bg-2 lg:dark:bg-secondary-700 flex w-full flex-col gap-4 border-t !pt-4 lg:w-1/4 lg:rounded-xl lg:border-[0] lg:p-4">
                <span className="flex items-center justify-between">
                    <p className="dark:text-secondary-100">جمع</p>
                    <p className="flex items-center gap-2 dark:text-white">
                        {calculateSubTotalPrice()} <Toman />
                    </p>
                </span>

                <span className="flex items-center justify-between">
                    <p className="dark:text-secondary-100">هزینه حمل و نقل</p>
                    <p className="flex items-center gap-2 dark:text-white">
                        {calculateShippingPrice()} <Toman />
                    </p>
                </span>

                <span className="flex items-center justify-between">
                    <p className="dark:text-secondary-100">مالیات</p>
                    <p className="dark:text-white">{`% ${taxPercent} (${calculateTaxPrice()} ${(<Toman />)})`}</p>
                </span>

                <span className="flex items-center justify-between">
                    <p className="dark:text-secondary-100">جمع کل</p>
                    <p className="flex items-center gap-2 dark:text-white">
                        {calculateTotalPrice()} <Toman />
                    </p>
                </span>

                <Button onClick={goToPayment} className="mt-3">
                    پرداخت
                </Button>
            </div>
        </div>
    );
};

export default Checkout;
