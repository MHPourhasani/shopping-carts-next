"use client";
import EditIcon from "@/assets/icons/components/Edit";
import PATH from "@/shared/utils/path";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import AddReviewForm from "./AddReviewForm";
import { useSingleProductData } from "../../context/ProductData";

const AddReview = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const params = useParams();
    const [isAddReview, setIsAddReview] = useState(false);
    const { data } = useSingleProductData();
    const { _id, name } = data!.product;

    return (
        <div className="">
            <div className="flex flex-col gap-4">
                <span
                    onClick={() => {
                        if (session?.user.userId) {
                            setIsAddReview(!isAddReview);
                        } else {
                            router.push(`${PATH.login()}?redirect=${PATH.singleProduct(_id.toString(), name)}`);
                            toast.success("لطفا وارد شوید");
                        }
                    }}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <EditIcon className="fill-primary-100 size-5" />
                    <p className="text-primary-100">نظر خود را برای این محصول بنویسید.</p>
                </span>

                {isAddReview ? (
                    <AddReviewForm
                        productId={String(params.slug)}
                        onSubmit={() => {
                            setIsAddReview(false);
                            // setReviews((prev: any) => [...prev, review]);
                        }}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default AddReview;
