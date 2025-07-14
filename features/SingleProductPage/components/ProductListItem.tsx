"use client";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import { showFullDate, tomanFormat } from "@/shared/utils/utils";
import PATH from "@/shared/utils/path";
import Image from "next/image";
import Link from "next/link";
import ProductEditIcon from "./ProductEditIcon";
import ProductDeleteIcon from "./ProductDeleteIcon";
import { useState } from "react";
import Toman from "@/assets/icons/components/Toman";
import ArrowDownIcon from "@/assets/icons/components/ArrowDown";
import notImage from "@/assets/images/not-images.svg";

interface PropsInterface {
    product: IProduct;
    href: string | object;
}

const ProductListItem = ({ product, href }: PropsInterface) => {
    const { name, basePrice, categories, images, createdAt, updatedAt } = product;
    const [open, setIsOpen] = useState(window.innerWidth > 1024 ? true : false);

    return (
        <div
            onClick={() => setIsOpen(window.innerWidth > 1024 ? true : !open)}
            className="odd:bg-secondary-50 dark:bg-secondary-700 dark:shadow-secondary-700 dark:odd:bg-secondary-600 flex w-full flex-col gap-4 rounded-xl bg-white p-2 lg:grid lg:grid-cols-11 lg:items-center lg:gap-2 lg:rounded-2xl"
        >
            <div className="flex items-center justify-between lg:col-span-3">
                <span className="flex items-center gap-4 lg:gap-5">
                    <Image
                        src={images[0] ? images[0] : notImage}
                        alt={name}
                        width={150}
                        height={150}
                        className="aspect-square size-14 rounded-lg lg:h-auto"
                    />
                    <Link href={href} className="truncate font-medium">
                        {name}
                    </Link>
                </span>

                <ArrowDownIcon
                    className={`stroke-secondary-600 size-5 lg:hidden dark:stroke-white ${open ? "rotate-180 transition-all ease-in-out" : ""}`}
                />
            </div>

            {open && (
                <div className="flex w-full gap-8 lg:col-span-8 lg:grid lg:gap-2">
                    <div className="flex min-w-[100px] flex-col gap-4 lg:hidden">
                        <p className="col-span-2">قیمت</p>
                        <p className="col-span-2">دسته بندی</p>
                        <p className="col-span-2 h-16">تاریخ</p>
                        <p className="col-span-2">عملیات</p>
                    </div>

                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-0">
                        <span className="flex items-center gap-2 truncate lg:basis-1/4">
                            {basePrice ? (
                                <>
                                    {tomanFormat(basePrice)} <Toman className="size-4" />
                                </>
                            ) : (
                                "در انبار موجود نیست"
                            )}
                        </span>
                        <span className="lg:basis-1/4 lg:text-sm">
                            {categories
                                ? categories.map((item) => (
                                      <Link key={item} href={PATH.home()}>
                                          {item}
                                      </Link>
                                  ))
                                : "دسته بندی نشده"}
                        </span>

                        <div className="flex flex-col truncate lg:basis-1/4 lg:text-sm">
                            {createdAt === updatedAt || !updatedAt ? (
                                <span className="flex flex-col gap-4">
                                    <p>منتشر شده در </p>
                                    {showFullDate(createdAt)}
                                </span>
                            ) : (
                                <span className="flex flex-col gap-4">
                                    <p>آخرین ویرایش </p>
                                    {showFullDate(updatedAt)}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-4 lg:basis-1/4">
                            <ProductEditIcon product={product} />
                            <ProductDeleteIcon product={product} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListItem;
