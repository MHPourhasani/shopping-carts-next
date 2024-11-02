"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ProductInterface, ReviewInterface, productData } from "@/interfaces/general";
import MobileSingleProduct from "@/components/Products/MobileSingleProduct";
import DesktopSingleProduct from "@/components/Products/DesktopSingleProduct";
import { usePathname, useRouter } from "next/navigation";
import toastMessage from "@/utils/toastMessage";
import PATH from "@/utils/path";

interface Props {
    product: ProductInterface;
    reviews: ReviewInterface[];
}

export default function SingleProduct({ product, reviews }: Props) {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isAddReview, setIsAddReview] = useState(false);
    const [productData, setProductData] = useState<productData>({
        product: product,
        quantity: 1,
        size: product.sizes!.split(",")[0],
        color: product.colors![0],
    });
    const [reviewsList, setReviewsList] = useState<ReviewInterface[]>(reviews);

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

    const addToCartsHandler = async (product: productData) => {
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
        <section className="flex w-full flex-col">
            <div className="lg:hidden">
                <MobileSingleProduct {...props} />
            </div>

            <div className="hidden justify-center lg:flex">
                <DesktopSingleProduct {...props} />
            </div>
        </section>
    );
}
