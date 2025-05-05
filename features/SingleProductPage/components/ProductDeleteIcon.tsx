"use client";
import TrashIcon from "@/assets/icons/components/Trash";
import { IProduct } from "@/features/SingleProductPage/interface/product.interface";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import toastMessage from "@/shared/toastMessage";
import { handleRefreshAfterBack } from "@/shared/helper";
import API from "@/shared/api";
import { UserRoleEnum } from "@/interfaces/enums";
import { RequestTypeEnum } from "@/shared/enums";

const ProductDeleteIcon = ({ product }: { product: IProduct }) => {
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
