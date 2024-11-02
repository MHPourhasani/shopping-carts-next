"use client";
import CartProductCard from "@/components/Products/CartProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { setCarts } from "@/redux/slices/cartsSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import EmptyState from "@/components/EmptyState";
import emptyCart from "@/assets/icons/svgs/cart-illustration.svg";
import { CartInterface } from "@/interfaces/general";
import Button from "@/components/common/Button";
import PATH from "../path";
import toastMessage from "../toastMessage";
import PageHeader from "@/components/PageHeader/PageHeader";
import Toman from "@/assets/icons/components/Toman";
import { tomanFormat } from "../helper";

interface IProps {
    carts: CartInterface[];
}

const Carts = ({ carts }: IProps) => {
    const cartsState: any = useAppSelector((state: any) => state.carts.carts);
    const dispatch = useAppDispatch();
    const { data: session } = useSession();

    useEffect(() => {
        dispatch(setCarts(carts));
    }, [carts]);

    const deleteAllCarts = async () => {
        try {
            const res = await fetch(`/api/carts/${session!.user.userId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                toast.success(toastMessage.product.deletedAllSuccessfully);
                dispatch(setCarts([]));
            }
        } catch (error: any) {
            toast.error(error);
        }
    };

    const calculateSubTotalPrice = () => {
        return cartsState.reduce((acc: any, curr: any) => acc + curr?.quantity * curr?.product?.price, 0)?.toFixed(2);
    };

    useEffect(() => {
        calculateSubTotalPrice();
    }, [cartsState]);

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="سبد خرید" desktopBackButton={false}>
                {cartsState.length ? (
                    <Button variant="Text" onClick={deleteAllCarts} className="w-fit text-sm dark:text-secondary-50">
                        حذف همه
                    </Button>
                ) : null}
            </PageHeader>

            {cartsState.length ? (
                <div className="flex flex-1 flex-col items-center justify-between gap-4 lg:flex-row lg:items-start">
                    <div className="flex w-full flex-col gap-2">
                        {cartsState.map((cart: CartInterface, index: number) => {
                            if (cart) {
                                return <CartProductCard key={index} {...cart} />;
                            }
                        })}
                    </div>

                    <div className="flex w-full flex-col gap-4 lg:w-40 lg:rounded-xl lg:bg-bg-2 lg:p-4 lg:dark:bg-secondary-700">
                        <span className="flex items-center justify-between lg:text-lg">
                            <p>هزینه محصولات</p>
                            <p dir="ltr" className="flex items-center gap-2 font-semibold">
                                <Toman className="size-5" /> {tomanFormat(calculateSubTotalPrice())}
                            </p>
                        </span>

                        <Link href={PATH.checkout()}>
                            <Button className="mt-5" variant="Primary">
                                تسویه حساب
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <EmptyState
                    imgSrc={emptyCart}
                    description="سبد خرید شما خالی است."
                    linkTitle="جست و جو در دسته بندی ها"
                    linkHref={PATH.home()}
                />
            )}
        </section>
    );
};

export default Carts;
