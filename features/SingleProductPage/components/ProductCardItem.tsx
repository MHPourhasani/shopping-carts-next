"use client";
import notImage from "@/assets/images/not-images.svg";
import Image from "next/image";
import { capitalizeTheFirstLettersOfWords, handleRefreshAfterBack, isNumber, tomanFormat } from "@/shared/utils/utils";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import LoveIcon from "@/assets/icons/components/Love";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import PATH from "@/shared/utils/path";
import Toman from "@/assets/icons/components/Toman";
import { getTokenClient } from "@/shared/libs/axios";
import { cn } from "@/shared/libs/utils";

interface PropsInterface {
    product: IProduct;
    href: string | object;
    className?: string;
}

const ProductCardItem = ({ product, href, className }: PropsInterface) => {
    const { _id, name, basePrice, images } = product;
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const addToFavoriteHandler = async () => {
        if (!getTokenClient()?.access) {
            router.push(`${PATH.login()}?redirect=${PATH.singleProduct(_id.toString(), name)}`);
        }

        const res = await fetch(`/api/favorites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: _id }),
        });

        const { data, message } = await res.json();

        if (res.ok) {
            dispatch(setUser({ ...user, favorites: data }));
            toast.success(message);
            handleRefreshAfterBack();
        } else {
            toast.error(message);
        }
    };

    return (
        <section
            className={cn(
                `shadow-bg-2 dark:shadow-secondary-700 relative w-full min-w-[150px] rounded-xl shadow-xl lg:rounded-xl`,
                className,
            )}
        >
            <LoveIcon
                onClick={addToFavoriteHandler}
                className="hover-transition absolute top-3 right-3 h-auto w-5 cursor-pointer fill-gray-300 drop-shadow-xl hover:fill-red-600"
            />

            <Link href={href} className={`aspect-square w-full ${images.length ? "" : "bg-bg-2 dark:bg-secondary-700"}`}>
                <Image
                    src={images.length ? images[0] : notImage}
                    width={500}
                    height={500}
                    alt={name}
                    className="aspect-square w-full rounded-t-lg"
                />
            </Link>

            <Link href={href} className="flex flex-col gap-3 p-1.5">
                <h2 className="font-semibold">{capitalizeTheFirstLettersOfWords(name)}</h2>
                <div className="flex flex-col gap-2">
                    <span
                        className={`flex items-center gap-2 font-medium ${isNumber("discountedPrice") ? "text-sm text-gray-600 line-through dark:text-gray-500" : "text-gray-900 dark:text-white"}`}
                    >
                        {basePrice && basePrice > 0 ? (
                            <>
                                {tomanFormat(basePrice)}
                                <Toman className="size-4" />
                            </>
                        ) : (
                            "رایگان"
                        )}
                    </span>

                    {isNumber("discountedPrice") && (
                        <span className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                            {/* {discountedPrice && discountedPrice > 0 ? (
                                <>
                                    {tomanFormat(discountedPrice)}
                                    <Toman className="size-4 lg:size-5" />
                                </>
                            ) : ( */}
                            "رایگان"
                            {/* )} */}
                        </span>
                    )}
                </div>
            </Link>
        </section>
    );
};

export default ProductCardItem;
