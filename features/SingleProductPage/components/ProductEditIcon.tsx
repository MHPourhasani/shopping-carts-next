"use client";
import EditIcon from "@/assets/icons/components/Edit";
import { UserRoleEnum } from "@/interfaces/enums";
import { IProduct } from "@/features/SingleProductPage/interface/product.interface";
import { useAppSelector } from "@/redux/hooks";
import PATH from "@/shared/path";
import Link from "next/link";

const ProductEditIcon = ({ product }: { product: IProduct }) => {
    const userState = useAppSelector((state: any) => state.auth.user);
    const shopState = useAppSelector((state: any) => state.shop.shop);

    return (
        userState &&
        userState.role === UserRoleEnum.ADMIN &&
        userState.role === UserRoleEnum.SHOPPER &&
        product &&
        shopState && (
            <Link href={PATH.profile.products.edit_product(product._id.toString())}>
                <EditIcon className="fill-customBlack-200 dark:fill-white" />
            </Link>
        )
    );
};

export default ProductEditIcon;
