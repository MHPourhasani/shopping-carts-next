"use client";
import TrashIcon from "@/assets/icons/components/Trash";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import toastMessage from "@/shared/utils/toastMessage";
import { handleRefreshAfterBack } from "@/shared/utils/utils";
import API from "@/shared/libs/endpoints";
import { UserRoleEnum } from "@/features/auth/enums";

const ProductDeleteIcon = ({ product }: { product: IProduct }) => {
    const user = useAppSelector((state) => state.auth.user);

    const deleteProductHandler = async () => {
        const res = await fetch(API.product.singleProduct(product._id.toString()), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success(toastMessage.product.deletedProductSuccessfully(product.name));
            handleRefreshAfterBack();
        } else {
            toast.success(toastMessage.product.deletedProductFailed(product.name));
        }
    };

    return (
        user &&
        user.role !== UserRoleEnum.CUSTOMER &&
        product && <TrashIcon onClick={deleteProductHandler} className="cursor-pointer fill-red-600 dark:fill-red-500" />
    );
};

export default ProductDeleteIcon;
