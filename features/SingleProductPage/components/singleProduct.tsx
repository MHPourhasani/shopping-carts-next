"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from "react";
import DesktopSingleProduct from "@/features/SingleProductPage/components/Desctop/DesktopSingleProduct";
import { usePathname, useRouter } from "next/navigation";
import { useSingleProductData } from "../context/ProductData";
import { ISingleProductData } from "../interface/interface";
import { IReview } from "../interface/review.interface";

export default function SingleProduct() {
    const { data } = useSingleProductData();
    const product = data!.product;
    const reviews = data!.reviews;
    const [isAddReview, setIsAddReview] = useState(false);
    const [productData, setProductData] = useState<any>({
        product,
        quantity: 1,
        selectedAttributes: {},
    });
    const [reviewsList, setReviewsList] = useState<IReview[]>(reviews);

    const addToFavoriteHandler = async () => {
        // if (!session) {
        //     router.push(`${PATH.login()}?redirect=${pathname}`);
        // } else {
        //     const res = await fetch(`/api/favorites/${session.user.userId}`, {
        //         method: "PUT",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ productId: product._id }),
        //     });
        //     const { message } = await res.json();
        //     if (res.ok) {
        //         toast.success(message);
        //     } else {
        //         toast.error("خطا در افزودن محصول به علاقه مندی ها");
        //     }
        // }
    };

    const handleSelectAttributes = (slug: string, value: string) => {
        setProductData((prev: any) => ({
            ...prev,
            selectedAttributes: {
                ...prev.selectedAttributes,
                [slug]: value,
            },
        }));
    };

    const addToCartsHandler = async () => {
        // if (!session) {
        //     router.push(`${PATH.login()}?redirect=${pathname}`);
        // } else {
        //     const res = await fetch(`/api/carts`, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ user: session.user.userId, product }),
        //     });
        //     const { message } = await res.json();
        //     if (res.ok) {
        //         toast.success(message);
        //     } else {
        //         toast.error(toastMessage.product.failedAddedToCart);
        //     }
        // }
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
        handleSelectAttributes,
    };

    return (
        <section className="container w-full">
            <div className="w-full lg:hidden">{/* <MobileSingleProduct {...props} /> */}</div>

            <div className="hidden w-full justify-center lg:flex">
                <DesktopSingleProduct {...props} />
            </div>
        </section>
    );
}
