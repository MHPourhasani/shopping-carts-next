"use client";
import TrashIcon from "@/assets/icons/components/Trash";
import { ProductInterface, RequestTypeEnum, UserRoleEnum } from "@/interfaces/general";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import toastMessage from "@/utils/toastMessage";
import { handleRefreshAfterBack } from "@/utils/helper";
import API from "@/utils/api";

const ProductDeleteIcon = ({ product }: { product: ProductInterface }) => {
    const userState = useAppSelector((state: any) => state.auth.user);
    const shopState = useAppSelector((state: any) => state.shop.shop);

    const deleteProductHandler = async () => {
        const res = await fetch(API.product.single_product(product._id.toString(), RequestTypeEnum.CSR), {
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
        userState &&
        userState.role !== UserRoleEnum.USER &&
        product &&
        shopState &&
        product.shopper === shopState._id && (
            <TrashIcon onClick={deleteProductHandler} className="cursor-pointer fill-red-600 dark:fill-red-500" />
        )
    );
};

export default ProductDeleteIcon;
