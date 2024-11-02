"use client";
import { redirect, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { AddressInterface, CartInterface } from "@/interfaces/general";
import PATH from "@/utils/path";
import { removeAllCarts } from "@/redux/slices/cartsSlice";
import Textarea from "@/components/common/Textarea";
import PageHeader from "@/components/PageHeader/PageHeader";
import API from "../api";
import Toman from "@/assets/icons/components/Toman";

const Checkout = ({ carts }: { carts: CartInterface[] }) => {
    const { data: session } = useSession();
    const userState = useAppSelector((state: any) => state.auth.user);
    const dispatch = useAppDispatch();
    const [error, setError] = useState({ information: "", address: "" });
    const [description, setDescription] = useState("");
    const router = useRouter();
    const taxPercent = Number(process.env.TAX_PERCENT) || 9;

    if (!session) {
        redirect(`${PATH.login()}?redirect=${PATH.checkout()}`);
    }

    const deleteAllCarts = async () => {
        try {
            await fetch(`/api/carts/${session!.user.userId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            dispatch(removeAllCarts());
        } catch (error: any) {
            console.error(error);
        }
    };

    const goToPayment = async () => {
        if (!userState?.first_name || !userState?.last_name || !userState?.phone_number) {
            setError({ ...error, information: "Please enter empty field" });
        } else if (!userState?.addresses.find((adr: AddressInterface) => adr.isSelected)) {
            setError({ ...error, address: "Please add an address" });
        } else {
            const res = await fetch(API.orders.orders_list(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: session?.user.userId,
                    products: carts,
                    address: userState?.addresses.find((adr: AddressInterface) => adr.isSelected),
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
        <section className="flex flex-1 w-full flex-col gap-4">
            <PageHeader title="تسویه حساب" />

            <div className="flex w-full flex-1 flex-col items-start justify-between gap-4 lg:flex-row lg:gap-8">
                <div className="flex w-full flex-col gap-4 lg:flex-1">
                    <div className="flex w-full flex-col items-start gap-4 rounded-xl bg-bg-2 p-4 dark:bg-secondary-700">
                        <div className="flex w-full items-center justify-between">
                            <span className="text-lg font-bold">اطلاعات مشتری</span>
                            <Link href={PATH.profile.edit_personal()} className="text-primary-100 lg:hidden">
                                ویرایش
                            </Link>
                            <Link href={PATH.profile.main()} className="hidden text-primary-100 lg:flex">
                                ویرایش
                            </Link>
                        </div>

                        <div className="flex w-full flex-col gap-3 text-gray-500">
                            <span className="flex w-full justify-between gap-4">
                                <span className="min-w-fit">نام</span>
                                <p className="truncate">{userState?.first_name ? userState.first_name : "empty"}</p>
                            </span>

                            <span className="flex w-full justify-between gap-4">
                                <span className="min-w-fit">نام خانوادگی</span>
                                <p className="truncate">{userState?.last_name ? userState.last_name : "empty"}</p>
                            </span>

                            <span className="flex w-full justify-between gap-4">
                                <span className="min-w-fit">شماره تماس</span>
                                <p>{userState?.phone_number ? userState.phone_number : "empty"}</p>
                            </span>

                            <span className="flex w-full justify-between gap-4">
                                <span className="min-w-fit">ایمیل</span>
                                <p className="truncate">{userState?.email}</p>
                            </span>
                        </div>

                        {error.information && <p className="text-red-500">{error.information}</p>}
                    </div>

                    <div className="flex w-full flex-col items-start gap-4 rounded-xl bg-bg-2 p-4 dark:bg-secondary-700">
                        <div className="flex w-full items-center justify-between">
                            <span className="text-lg font-bold">آدرس</span>
                            <span onClick={() => router.push(PATH.profile.address())} className="text-primary-100 lg:hidden">
                                {userState?.addresses.length ? "ویرایش" : "افزودن"}
                            </span>
                            <span
                                onClick={() => router.push(PATH.profile.address())}
                                className="hidden cursor-pointer text-primary-100 lg:flex"
                            >
                                {userState?.addresses.length ? "ویرایش" : "افزودن"}
                            </span>
                        </div>

                        {userState?.addresses.length ? (
                            <p className="break-all text-gray-500">
                                {userState?.addresses.filter((adr: AddressInterface) => adr.isSelected)[0].address_value}
                            </p>
                        ) : null}

                        {error.address && <p className="text-red-500">{error.address}</p>}
                    </div>

                    <div className="flex w-full flex-col items-start gap-4 rounded-xl bg-bg-2 p-4 dark:bg-secondary-700">
                        <span className="text-lg font-bold">توضیحات</span>
                        <Textarea
                            defaultValue={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="max-h-96 min-h-60 w-full bg-gray-400 dark:bg-secondary-600"
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col gap-4 border-t !pt-4 lg:w-1/4 lg:rounded-xl lg:border-[0] lg:bg-bg-2 lg:p-4 lg:dark:bg-secondary-700">
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

                    <Button variant="Primary" onClick={goToPayment} className="mt-3">
                        پرداخت
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
