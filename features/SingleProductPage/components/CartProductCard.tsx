"use client";
import Link from "next/link";
import Image from "next/image";
import notImage from "@/assets/images/not-images.svg";
import { toast } from "react-toastify";
import { capitalizeTheFirstLettersOfWords, tomanFormat } from "@/shared/utils/utils";
import PATH from "@/shared/utils/path";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCarts } from "@/redux/slices/cartsSlice";
import { ICart } from "@/interfaces/general";
import TrashIcon from "@/assets/icons/components/Trash";
import { useSession } from "next-auth/react";
import Minus from "@/assets/icons/components/Minus";
import AddIcon from "@/assets/icons/components/Add";
import Toman from "@/assets/icons/components/Toman";

interface IProps {
    _id: string;
    product: any;
    size: number;
    quantity: number;
    getData?: any;
    color: any;
}

const CartProductCard = (props: IProps) => {
    const { _id, product, size, quantity, color } = props;
    const { data: session } = useSession();
    const cartsState: any = useAppSelector((state) => state.carts.carts);
    const dispatch = useAppDispatch();

    const updateQuantity = async (operator: "+" | "-") => {
        const res = await fetch(`/api/carts/${session?.user.userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ operator, productId: _id }),
        });

        if (res.ok) {
            dispatch(
                setCarts(
                    cartsState.map((item: ICart) => {
                        if (item) {
                            if (item._id === _id) {
                                if (operator === "+") {
                                    return { ...item, quantity: quantity + 1 };
                                } else if (operator === "-") {
                                    if (quantity === 1) {
                                        toast.success("محصول با موفقیت حذف شد.");
                                        return undefined;
                                    } else {
                                        return { ...item, quantity: quantity - 1 };
                                    }
                                }
                            } else {
                                return item;
                            }
                        }
                    }),
                ),
            );
        }
    };

    return (
        <div className="bg-bg-2 dark:bg-secondary-700 flex w-full min-w-fit items-center justify-between gap-3 rounded-xl p-2 lg:p-4">
            <Link
                href={PATH.singleProduct(product._id.toString(), product.name)}
                className="size-24 hover:opacity-80 md:size-36 lg:size-28"
            >
                <Image
                    src={product?.images.length ? product?.images[0] : notImage}
                    alt={product?.name}
                    width={500}
                    height={500}
                    className="h-auto w-full rounded-[6px]"
                />
            </Link>

            <div className="flex flex-1 flex-col items-center justify-between gap-6 lg:gap-12">
                <section className="flex w-full items-center justify-between">
                    <Link
                        href={PATH.singleProduct(product._id.toString(), product.name)}
                        className="dark:hover:text-secondary-100 truncate text-lg font-semibold hover:text-gray-950 md:text-xl"
                    >
                        {capitalizeTheFirstLettersOfWords(product?.name)}
                    </Link>

                    <div className="flex gap-1 lg:text-lg">
                        <span className="font-semibold">{quantity}</span>x
                        <span className="flex items-center gap-2">
                            {tomanFormat(product?.price)} <Toman className="size-4" />
                        </span>
                    </div>
                </section>

                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4 text-sm md:text-base lg:text-lg">
                        <span className="flex items-center gap-1 text-gray-400">
                            سایز:
                            <p className="text-secondary-600 dark:text-secondary-100 font-semibold">{size}</p>
                        </span>
                        <span className="flex items-center gap-1 text-gray-400">
                            رنگ:
                            {color ? <p style={{ backgroundColor: color.hex }} className="size-5 rounded-full"></p> : "no colors"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <span
                            onClick={() => updateQuantity("+")}
                            className="hover-transition border-primary-100 flex aspect-square size-9 cursor-pointer items-center justify-center rounded-full border hover:border-violet-600 lg:size-10"
                        >
                            <AddIcon className="stroke-primary-100 hover:stroke-violet-600" />
                        </span>
                        <span
                            onClick={() => updateQuantity("-")}
                            className={`${quantity === 1 ? "border-red-500 hover:border-red-600" : "border-primary-100 hover:border-violet-600"} hover-transition flex aspect-square size-9 cursor-pointer items-center justify-center rounded-full border lg:size-10`}
                        >
                            {quantity === 1 ? (
                                <TrashIcon className="size-5 fill-red-500 hover:fill-red-600" />
                            ) : (
                                <Minus className="stroke-primary-100 hover:stroke-violet-600" />
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductCard;
