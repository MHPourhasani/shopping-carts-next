import CloseIcon from "@/assets/icons/components/Close";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import Image from "next/image";
import Toman from "@/assets/icons/components/Toman";
import { tomanFormat } from "@/shared/utils/utils";
import { Button } from "../../../components/ui/button";

interface Props {
    product: IProduct;
    onDelete: () => void;
    isTitles?: boolean;
    isCloseIcon?: boolean;
    onAddToCart: () => void;
}

const CompareItem = ({ product, onDelete, isTitles, isCloseIcon = true, onAddToCart }: Props) => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="relative flex flex-col items-center justify-center gap-4 p-4">
                {isCloseIcon && (
                    <CloseIcon
                        onClick={onDelete}
                        className="fill-secondary-700 dark:fill-secondary-100 absolute -top-2 -left-2 cursor-pointer lg:-top-5 lg:-left-5"
                    />
                )}
                <Image src={product?.images[0]} alt={product?.name} width={150} height={150} className="size-32 rounded-xl lg:size-40" />
                <h2 className="truncate text-lg font-semibold">{product?.name}</h2>
                <Button onClick={onAddToCart}>افزودن به سبد</Button>
            </div>

            <div className="flex flex-col gap-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-4 [&>*]:border-b [&>*]:pb-4 last:[&>*]:border-none">
                <div>
                    {isTitles && <h3>قیمت</h3>}
                    <span className="flex items-center gap-2">
                        {tomanFormat(product?.price)} <Toman className="size-4" />
                    </span>
                </div>
                <div>
                    {isTitles && <h3>قیمت تخفیف خورده</h3>}
                    <span className="flex items-center gap-2">
                        {tomanFormat(product?.discountedPrice ? product.discountedPrice : "")}
                        <Toman className="size-4" />
                    </span>
                </div>
                <div>
                    {isTitles && <h3>سایز</h3>}
                    <p>{product?.sizes}</p>
                </div>
                <div>
                    {isTitles && <h3>رنگ</h3>}
                    <p>{product?.colors.map((c) => c.name).join(", ")}</p>
                </div>
                <div>
                    {isTitles && <h3>دسته بندی</h3>}
                    <p>{product?.categories ? product.categories : "دسته بندی نشده"}</p>
                </div>
                <div>
                    {isTitles && <h3>تگ ها</h3>}
                    <p>{product?.tags ? product.tags : "تگی وجود ندارد."}</p>
                </div>
                <div>
                    {isTitles && <h3>توضیحات</h3>}
                    <p>{product?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default CompareItem;
