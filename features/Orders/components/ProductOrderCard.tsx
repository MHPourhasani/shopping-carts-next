import Image from "next/image";
import noImage from "@/assets/images/jpg/no-image.jpg";
import { ISingleProductData } from "@/features/SingleProductPage/interface/interface";

const ProductOrderCard = ({ product }: { product: ISingleProductData }) => {
    return (
        <div className="bg-bg-2 dark:bg-secondary-700 dark:lg:bg-secondary-600 flex w-full gap-4 rounded-xl p-2 xl:p-4">
            <Image
                src={product.product.images.length ? product.product.images[0] : noImage}
                alt="product image"
                width={400}
                height={400}
                className="aspect-square size-24 rounded-lg"
            />

            <div className="flex flex-1 flex-col items-start justify-between">
                <p className="truncate font-medium">{product.product.name}</p>

                <div className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-1">
                        <p className="text-gray-500">سایز: </p>
                        <p className="text-customBlack-200 dark:text-secondary-100 font-semibold">{product.size}</p>
                    </span>

                    <span className="flex items-center gap-1">
                        <p className="text-gray-500">رنگ: </p>
                        <div style={{ backgroundColor: product.color.hex }} className="aspect-square size-5 rounded-full" />
                    </span>

                    <span className="flex items-center gap-1">
                        <p className="text-gray-500">تعداد: </p>
                        <p className="text-secondary-600 dark:text-secondary-100 font-semibold">{product.quantity}</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductOrderCard;
