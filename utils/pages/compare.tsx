"use client";
import Button from "@/components/common/Button";
import CompareItem from "@/components/CompareItem";
import Modal from "@/components/Modal";
import { productData, IProduct } from "@/interfaces/general";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PATH from "../../shared/path";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import toastMessage from "../../shared/toastMessage";
import addIcon from "@/assets/icons/svgs/add.svg";
import minusIcon from "@/assets/icons/svgs/minus.svg";
import Toman from "@/assets/icons/components/Toman";
import { tomanFormat } from "../../shared/helper";

interface Props {
    product1: IProduct;
    product2: IProduct;
    products: IProduct[];
}

const Compare = ({ product1, product2, products }: Props) => {
    const [compareProducts, setCompareProducts] = useState<{ product1: null | IProduct; product2: null | IProduct }>({
        product1: null,
        product2: null,
    });
    const [openProductsModal, setOpenProductModal] = useState<number | undefined>(undefined);
    const [addToCartModal, setAddToCartModal] = useState<Partial<productData> | undefined>(undefined);
    const router = useRouter();
    const pathname = usePathname();
    const { data: session } = useSession();

    useEffect(() => {
        if (!product2) {
            setCompareProducts({ ...compareProducts, product1 });
        } else {
            setCompareProducts({ product1, product2 });
        }
    }, [product1, product2]);

    const selectProductsHandler = (product: IProduct) => {
        if (openProductsModal === 1) {
            setCompareProducts({ ...compareProducts, product1: product });
            router.push(PATH.compare(product._id.toString(), compareProducts.product2 ? compareProducts.product2?._id.toString() : ""));
        } else {
            setCompareProducts({ ...compareProducts, product2: product });
            router.push(PATH.compare(compareProducts.product1 ? compareProducts.product1._id.toString() : "", product._id.toString()));
        }
        setOpenProductModal(undefined);
    };

    const addToCartsHandler = async () => {
        if (!session) {
            router.push(`${PATH.login()}?redirect=${pathname}`);
        } else {
            const res = await fetch(`/api/carts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: session.user.userId, product: addToCartModal }),
            });

            const { message } = await res.json();

            if (res.ok) {
                toast.success(message);
            } else {
                toast.error(toastMessage.product.failedAddedToCart);
            }
        }
    };

    return (
        <>
            <div
                className={`grid w-full grid-cols-2 justify-stretch gap-4 ${compareProducts.product1 && compareProducts.product2 ? "items-stretch" : "items-start"}`}
            >
                {compareProducts.product1 ? (
                    <CompareItem
                        product={compareProducts.product1!}
                        isCloseIcon={!!compareProducts.product2}
                        onAddToCart={() =>
                            setAddToCartModal({
                                _id: compareProducts.product1?._id,
                                product: compareProducts.product1!,
                                quantity: 1,
                                size: compareProducts.product1!.sizes.split(", ")[0],
                                color: compareProducts.product1!.colors[0],
                            })
                        }
                        onDelete={() => setCompareProducts({ ...compareProducts, product1: null })}
                    />
                ) : (
                    <Button onClick={() => setOpenProductModal(1)}>انتخاب محصول اول</Button>
                )}

                {compareProducts.product2 ? (
                    <CompareItem
                        product={compareProducts.product2}
                        isCloseIcon={!!compareProducts.product1}
                        onAddToCart={() =>
                            setAddToCartModal({
                                _id: compareProducts.product2?._id,
                                product: compareProducts.product2!,
                                quantity: 1,
                                size: compareProducts.product2!.sizes.split(", ")[0],
                                color: compareProducts.product2!.colors[0],
                            })
                        }
                        onDelete={() => setCompareProducts({ ...compareProducts, product2: null })}
                    />
                ) : (
                    <Button onClick={() => setOpenProductModal(2)}>انتخاب محصول دوم</Button>
                )}
            </div>

            <Modal
                status={!!openProductsModal}
                title={`افزودن محصول ${openProductsModal === 1 ? "اول" : "دوم"}`}
                onClose={() => setOpenProductModal(undefined)}
            >
                <div className="flex flex-col gap-4">
                    {products.map((p) => (
                        <span onClick={() => selectProductsHandler(p)} className="flex cursor-pointer items-center gap-4">
                            <Image src={p.images[0]} alt={p.name} width={100} height={100} className="size-14 rounded-lg lg:size-20" />
                            <h3>{p.name}</h3>
                        </span>
                    ))}
                </div>
            </Modal>

            <Modal
                status={!!addToCartModal?.product}
                title={`افزودن محصول "${addToCartModal?.product?.name}" به سبد خرید`}
                onClose={() => setAddToCartModal(undefined)}
            >
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <p className="font-medium">انتخاب سایز</p>
                        <span className="flex flex-wrap items-center gap-2">
                            {addToCartModal?.product?.sizes.split(", ").map((s) => (
                                <p
                                    onClick={() => setAddToCartModal({ ...addToCartModal, size: s })}
                                    className={`flex aspect-square size-10 cursor-pointer items-center justify-center rounded-full text-lg ${
                                        s === addToCartModal.size
                                            ? "bg-primary-100 font-semibold text-white"
                                            : "bg-gray-100 dark:bg-secondary-600"
                                    }`}
                                >
                                    {s}
                                </p>
                            ))}
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="font-medium">انتخاب رنگ</p>
                        <div className="flex flex-wrap items-center gap-2">
                            {addToCartModal?.product?.colors.map((c) => (
                                <span
                                    onClick={() => setAddToCartModal({ ...addToCartModal, color: c })}
                                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-full p-2 text-lg ${
                                        c === addToCartModal.color ? "bg-primary-100 text-white" : "bg-gray-100 dark:bg-secondary-600"
                                    }`}
                                >
                                    <div
                                        style={{ backgroundColor: c.hex }}
                                        className="aspect-square size-7 rounded-full border-2 dark:border-white"
                                    />
                                    <p>{c.name}</p>
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col items-start gap-4">
                            <p className="font-medium">تعداد</p>
                            <div className="flex w-auto items-center gap-6 rounded-full bg-bg-2 p-2 dark:bg-secondary-500">
                                <span
                                    onClick={() => setAddToCartModal({ ...addToCartModal, quantity: addToCartModal!.quantity! + 1 })}
                                    className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary-100"
                                >
                                    <Image src={addIcon} alt="add" />
                                </span>

                                <span>{addToCartModal?.quantity}</span>

                                <span
                                    onClick={() =>
                                        setAddToCartModal({
                                            ...addToCartModal,
                                            quantity: addToCartModal!.quantity === 1 ? 1 : addToCartModal!.quantity! - 1,
                                        })
                                    }
                                    className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary-100"
                                >
                                    <Image src={minusIcon} alt="minus" />
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className="font-medium">قیمت</p>

                            <div className="flex items-center text-xl">
                                {tomanFormat(
                                    addToCartModal?.quantity! *
                                        // @ts-ignore
                                        (addToCartModal?.product?.discountedPrice
                                            ? addToCartModal?.product?.discountedPrice
                                            : addToCartModal?.product?.price),
                                )}
                                <Toman className="size-4 lg:size-5" />
                            </div>
                        </div>
                    </div>

                    <Button onClick={addToCartsHandler}>افزودن به سبد خرید</Button>
                </div>
            </Modal>
        </>
    );
};

export default Compare;
