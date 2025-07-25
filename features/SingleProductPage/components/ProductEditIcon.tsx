"use client";
import EditIcon from "@/assets/icons/components/Edit";
import { UserRoleEnum } from "@/features/auth/enums";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import { useAppSelector } from "@/redux/hooks";
import PATH from "@/shared/utils/path";
import Link from "next/link";

const ProductEditIcon = ({ product }: { product: IProduct }) => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        user &&
        user.role === UserRoleEnum.ADMIN &&
        product && (
            <Link href={PATH.profile.products.edit_product(product._id.toString())}>
                <EditIcon className="fill-customBlack-200 dark:fill-white" />
            </Link>
        )
    );
};

export default ProductEditIcon;
