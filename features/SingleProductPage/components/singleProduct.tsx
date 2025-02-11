"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { IReview, ISingleProductData } from "@/interfaces/general";
import MobileSingleProduct from "@/features/SingleProductPage/components/MobileSingleProduct";
import DesktopSingleProduct from "@/features/SingleProductPage/components/Desctop/DesktopSingleProduct";
import { usePathname, useRouter } from "next/navigation";
import toastMessage from "@/shared/toastMessage";
import PATH from "@/shared/path";
import { useSingleProductData } from "../context/ProductData";

export default function SingleProduct() {
    const { data: session } = useSession();
    const { data } = useSingleProductData();
    const router = useRouter();
    const pathname = usePathname();
    const product = data!.product;
    const reviews = data!.reviews;
    const [isAddReview, setIsAddReview] = useState(false);
    const [productData, setProductData] = useState<ISingleProductData>({
        product,
        quantity: 1,
        size: product.sizes!.split(",")[0],
        color: product.colors![0],
    });
    const [reviewsList, setReviewsList] = useState<IReview[]>(reviews);

    const addToFavoriteHandler = async () => {
        if (!session) {
            router.push(`${PATH.login()}?redirect=${pathname}`);
        } else {
            const res = await fetch(`/api/favorites/${session.user.userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id }),
            });

            const { message } = await res.json();

            if (res.ok) {
                toast.success(message);
            } else {
                toast.error("خطا در افزودن محصول به علاقه مندی ها");
            }
        }
    };

    const addToCartsHandler = async (product: ISingleProductData) => {
        if (!session) {
            router.push(`${PATH.login()}?redirect=${pathname}`);
        } else {
            const res = await fetch(`/api/carts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: session.user.userId, product }),
            });

            const { message } = await res.json();

            if (res.ok) {
                toast.success(message);
            } else {
                toast.error(toastMessage.product.failedAddedToCart);
            }
        }
    };

    const props = {
        isAddReview,
        setIsAddReview,
        productData,
        setProductData,
        reviews: reviewsList,
        setReviews: setReviewsList,
        addToFavoriteHandler,
        addToCartsHandler,
    };

    return (
        <section className="w-full">
            <div className="w-full lg:hidden">
                <MobileSingleProduct {...props} />
            </div>

            <div className="hidden w-full justify-center lg:flex">
                <DesktopSingleProduct {...props} />
            </div>
        </section>
    );
}
