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

                <div className="flex w-full items-center justify-between"></div>
            </div>
        </div>
    );
};

export default ProductOrderCard;
