"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import addIcon from "@/assets/icons/svgs/add.svg";
import minusIcon from "@/assets/icons/svgs/minus.svg";
import Image from "next/image";
import Modal from "@/components/Modal";
import { Navigation } from "swiper/modules";
import ReviewsList from "@/components/Reviews/ReviewsList/ReviewsList";
import { capitalizeTheFirstLettersOfWords, isNumber, tomanFormat } from "@/utils/helper";
import AddReview from "@/components/Reviews/AddReview";
import EditIcon from "@/assets/icons/components/Edit";
import { SingleProductPropsInterface } from "@/interfaces/general";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ProductTags from "./ProductTags";
import { useEffect, useRef, useState } from "react";
import PATH from "@/utils/path";
import TickIcon from "@/assets/icons/components/Tick";
import Button from "@/components/common/Button";
import BackButton from "@/components/BackButton";
import LoveIcon from "@/assets/icons/components/Love";
import ArrowDownIcon from "@/assets/icons/components/ArrowDown";
import notImage from "@/assets/images/not-images.svg";
import Link from "next/link";
import Toman from "@/assets/icons/components/Toman";
import ProductCardItem from "./ProductCardItem";
import CompareIcon from "@/assets/icons/components/Compare";

const MobileSingleProduct = (props: SingleProductPropsInterface) => {
    const { isAddReview, setIsAddReview, reviews, setReviews, addToCartsHandler, productData, setProductData, addToFavoriteHandler } =
        props;
    const { _id, images, name, price, discountedPrice, tags, description, sizes, colors, relatedProducts } = productData.product;
    const { data: session } = useSession();
    const [imageActive, setImageActive] = useState(0);
    const [isChooseSize, setIsChooseSize] = useState(false);
    const [isChooseColor, setIsChooseColor] = useState(false);
    const router = useRouter();
    const params = useParams();
    const swiperRef = useRef<any>();

    useEffect(() => {
        swiperRef.current?.swiper.slideTo(imageActive);
    }, [imageActive]);

    return (
        <section className="flex w-full flex-col gap-4 pb-14">
            <div className="flex w-full items-center justify-between">
                <BackButton />

                <div className="flex items-center gap-4">
                    <Link
                        href={PATH.compare(_id.toString())}
                        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-bg-2 p-2 dark:bg-customBlack-50"
                    >
                        <CompareIcon className="fill-customBlack-200 dark:fill-white" />
                    </Link>
                    <span className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-bg-2 p-2 dark:bg-customBlack-50">
                        <LoveIcon onClick={addToFavoriteHandler} className="fill-customBlack-200 dark:fill-white" />
                    </span>
                </div>
            </div>

            <section className="flex w-full flex-col gap-6">
                <div className="flex aspect-square w-full flex-col items-center justify-center gap-2">
                    {images.length ? (
                        <Swiper
                            ref={swiperRef}
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            onRealIndexChange={(newIndex) => setImageActive(newIndex.realIndex)}
                            modules={[Navigation]}
                            className="w-full rounded-lg"
                        >
                            {images?.map((image: any, index: number) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <Image src={image} alt={name} width={500} height={500} className="h-full w-full rounded-lg" />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    ) : (
                        <Image src={notImage} alt="no image" width={500} height={500} className="h-full w-full rounded-lg" />
                    )}

                    <div className="no-scrollbar flex w-full gap-2 overflow-x-auto rounded-lg">
                        {productData?.product?.images?.map((image: any, index: number) => {
                            return (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={name}
                                    width={500}
                                    height={500}
                                    onClick={() => setImageActive(index)}
                                    className={`aspect-square w-20 cursor-pointer rounded-lg ${imageActive === index ? "opacity-100" : "opacity-50"}`}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="mb-2 w-full text-2xl font-bold text-customBlack-200 dark:text-white">
                        {capitalizeTheFirstLettersOfWords(name)}
                    </h1>

                    <section className="flex flex-col gap-2">
                        <div
                            onClick={() => setIsChooseSize(true)}
                            className="flex h-12 w-full items-center justify-between rounded-full bg-bg-2 px-4 dark:bg-secondary-600"
                        >
                            <span>سایز</span>
                            <span className="flex items-center gap-7">
                                <span className="font-semibold">{productData.size}</span>
                                <ArrowDownIcon className="size-6 stroke-secondary-600 dark:stroke-white" />
                            </span>
                        </div>

                        <Modal status={isChooseSize} title="انتخاب سایز" onClose={() => setIsChooseSize(false)}>
                            <div className="flex w-full flex-col gap-2 overflow-y-auto">
                                {sizes?.split(",").map((size: string) => {
                                    return (
                                        <span
                                            key={size}
                                            onClick={() => setProductData({ ...productData, size: size })}
                                            className={`flex h-12 w-full items-center justify-between gap-4 rounded-full px-4 ${
                                                size === productData.size
                                                    ? "bg-primary-100 font-semibold text-white"
                                                    : "bg-gray-100 dark:bg-secondary-600"
                                            }`}
                                        >
                                            {size}
                                            {size === productData.size && <TickIcon className="w-6 fill-white" />}
                                        </span>
                                    );
                                })}
                            </div>
                        </Modal>

                        <div
                            onClick={() => setIsChooseColor(true)}
                            className="flex h-12 w-full items-center justify-between rounded-full bg-bg-2 px-4 dark:bg-secondary-600"
                        >
                            <span>رنگ ها</span>
                            {productData.color ? (
                                <div className="flex items-center gap-7">
                                    <div style={{ backgroundColor: productData.color.hex }} className={`size-6 rounded-full`} />
                                    <ArrowDownIcon className="size-6 stroke-secondary-600 dark:stroke-white" />
                                </div>
                            ) : (
                                <p>هیچ رنگی نیست</p>
                            )}
                        </div>

                        <Modal status={isChooseColor} title="انتخاب رنگ" onClose={() => setIsChooseColor(false)}>
                            <div className="flex w-full flex-col gap-2 overflow-y-auto">
                                {colors?.map((color: { name: string; hex: string }, index) => {
                                    return (
                                        <p
                                            key={index}
                                            onClick={() => setProductData({ ...productData, color: color })}
                                            className={`flex h-12 w-full items-center justify-between gap-4 rounded-full px-4 ${
                                                color === productData.color
                                                    ? "bg-primary-100 font-semibold text-white"
                                                    : "bg-gray-100 dark:bg-secondary-600"
                                            }`}
                                        >
                                            {color.name}
                                            <span className="flex items-center gap-4">
                                                <div
                                                    style={{ backgroundColor: color.hex }}
                                                    className={`size-5 rounded-full border-[3px] border-white`}
                                                />
                                                {color === productData.color && <TickIcon className="w-6 fill-white" />}
                                            </span>
                                        </p>
                                    );
                                })}
                            </div>
                        </Modal>

                        <div className="flex h-12 w-full items-center justify-between rounded-full bg-bg-2 px-4 dark:bg-secondary-600">
                            <span>تعداد</span>
                            <div className="flex items-center gap-6">
                                <span
                                    onClick={() => setProductData({ ...productData, quantity: productData.quantity + 1 })}
                                    className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary-100"
                                >
                                    <Image src={addIcon} alt="add" />
                                </span>

                                <span>{productData.quantity}</span>

                                <span
                                    onClick={() =>
                                        setProductData({
                                            ...productData,
                                            quantity: productData.quantity === 1 ? 1 : productData.quantity - 1,
                                        })
                                    }
                                    className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary-100"
                                >
                                    <Image src={minusIcon} alt="minus" />
                                </span>
                            </div>
                        </div>
                    </section>

                    <div className="">
                        <h3 className="mb-4 font-semibold">توضیحات</h3>
                        <h2 className="text-gray-500 dark:text-gray-400">{description}</h2>
                    </div>

                    {tags && <ProductTags tags={tags.split(",")} />}
                </div>
            </section>

            <section className="my-5 flex w-full flex-col gap-4">
                <ReviewsList reviews={reviews} limit={5} isLoading={false} />

                <span
                    onClick={() => {
                        if (session?.user.userId) {
                            setIsAddReview(!isAddReview);
                        } else {
                            router.push(`${PATH.login()}?redirect=${PATH.singleProduct(_id.toString(), name)}`);
                        }
                    }}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <EditIcon className="size-5 fill-primary-100" />
                    <p className="text-primary-100">نظر خود را برای این محصول بنویسید.</p>
                </span>

                {isAddReview ? (
                    <AddReview
                        productId={String(params.slug)}
                        onSubmit={(comment: any) => {
                            setIsAddReview(false);
                            setReviews((prev: any) => [...prev, comment]);
                        }}
                    />
                ) : null}
            </section>

            <div className="fixed bottom-16 right-0 z-[2] flex w-full items-center justify-between gap-2 border-t bg-secondary-50 px-4 py-2 dark:bg-secondary-600">
                <Button variant="Primary" onClick={() => addToCartsHandler(productData)} className="w-auto px-4 font-light">
                    افزودن به سبد خرید
                </Button>

                <div className="flex items-center gap-2 text-xl font-semibold text-primary-100">
                    <span
                        className={`flex items-center gap-2 ${isNumber(discountedPrice) ? "text-base font-normal text-gray-600 line-through dark:text-gray-500" : "font-medium text-primary-100 dark:text-secondary-100"}`}
                    >
                        {price > 0 ? (
                            <>
                                {tomanFormat(price)}
                                {!(isNumber(discountedPrice) && discountedPrice > 0) && <Toman className="size-4 lg:size-5" />}
                            </>
                        ) : (
                            "رایگان"
                        )}
                    </span>
                    {isNumber(discountedPrice) && (
                        <span className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                            {discountedPrice > 0 ? (
                                <>
                                    {tomanFormat(discountedPrice)}
                                    <Toman className="size-4 lg:size-5" />
                                </>
                            ) : (
                                "رایگان"
                            )}
                        </span>
                    )}
                </div>
            </div>

            {relatedProducts && (
                <section className="flex w-full flex-col gap-4 py-4">
                    <h3 className="text-lg font-semibold">محصولات مرتبط</h3>

                    <div className="no-scrollbar flex h-full w-full flex-1 gap-4 overflow-x-auto">
                        {relatedProducts.map((p) => (
                            <ProductCardItem
                                product={p}
                                href={PATH.singleProduct(p._id.toString(), p.name)}
                                className="w-1/2 bg-secondary-50 dark:bg-secondary-700 shadow-none"
                            />
                        ))}
                    </div>
                </section>
            )}
        </section>
    );
};

export default MobileSingleProduct;
