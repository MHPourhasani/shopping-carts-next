"use client";
import CartProductCard from "@/features/SingleProductPage/components/CartProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { setCarts } from "@/redux/slices/cartsSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import EmptyState from "@/shared/components/EmptyState";
import emptyCart from "@/assets/icons/svgs/cart-illustration.svg";
import { ICart } from "@/interfaces/general";
import PATH from "../../../shared/path";
import toastMessage from "../../../shared/toastMessage";
import Toman from "@/assets/icons/components/Toman";
import { tomanFormat } from "../../../shared/helper";
import PageHeader from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";

interface IProps {
    carts: ICart[];
}

const Carts = ({ carts }: IProps) => {
    const cartsState: any = useAppSelector((state) => state.carts.carts);
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
        <section className="container flex w-full flex-1 flex-col gap-4">
            <PageHeader title="سبد خرید" desktopBackButton={false}>
                {cartsState.length ? (
                    <Button variant="text" onClick={deleteAllCarts} className="dark:text-secondary-50 w-fit text-sm">
                        حذف همه
                    </Button>
                ) : null}
            </PageHeader>

            {cartsState.length ? (
                <div className="flex flex-1 flex-col items-center justify-between gap-4 lg:flex-row lg:items-start">
                    <div className="flex w-full flex-col gap-2">
                        {cartsState.map((cart: ICart, index: number) => {
                            if (cart) {
                                return <CartProductCard key={index} {...cart} />;
                            }
                        })}
                    </div>

                    <div className="lg:bg-bg-2 lg:dark:bg-secondary-700 flex w-full flex-col gap-4 lg:w-40 lg:rounded-xl lg:p-4">
                        <span className="flex items-center justify-between lg:text-lg">
                            <p>هزینه محصولات</p>
                            <p dir="ltr" className="flex items-center gap-2 font-semibold">
                                <Toman className="size-5" /> {tomanFormat(calculateSubTotalPrice())}
                            </p>
                        </span>

                        <Link href={PATH.checkout()}>
                            <Button className="mt-5">تسویه حساب</Button>
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
