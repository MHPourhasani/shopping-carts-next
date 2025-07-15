"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import addIcon from "@/assets/icons/svgs/add.svg";
import minusIcon from "@/assets/icons/svgs/minus.svg";
import Image from "next/image";
import Modal from "@/shared/components/Modal";
import { Navigation } from "swiper/modules";
import ReviewsList from "@/features/SingleProductPage/components/Reviews/ReviewsList";
import { capitalizeTheFirstLettersOfWords, isNumber, tomanFormat } from "@/shared/utils/utils";
import AddReviewForm from "@/features/SingleProductPage/components/Reviews/AddReviewForm";
import EditIcon from "@/assets/icons/components/Edit";
import { useParams, useRouter } from "next/navigation";
import ProductTags from "./ProductTags";
import { useEffect, useRef, useState } from "react";
import PATH from "@/shared/utils/path";
import { ISingleProductProps } from "../interface/interface";
import { useAppSelector } from "@/redux/hooks";
import BackButton from "@/shared/components/BackButton";
import LoveIcon from "@/assets/icons/components/Love";
import notImage from "@/assets/images/not-images.svg";
import Link from "next/link";
import Toman from "@/assets/icons/components/Toman";
import ProductCardItem from "./ProductCardItem";
import CompareIcon from "@/assets/icons/components/Compare";
import { Button } from "@/components/ui/button";

const MobileSingleProduct = (props: ISingleProductProps) => {
    const { isAddReview, setIsAddReview, reviews, setReviews, addToCartsHandler, productData, setProductData, addToFavoriteHandler } =
        props;
    const { _id, images, name, basePrice, discountedPrice, tags, description, relatedProducts } = productData.product;
    const [imageActive, setImageActive] = useState(0);
    const router = useRouter();
    const params = useParams();
    const swiperRef = useRef<any>();
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        swiperRef.current?.swiper.slideTo(imageActive);
    }, [imageActive]);

    const handleAddNewReview = () => {
        if (user._id) {
            setIsAddReview(!isAddReview);
        } else {
            router.push(`${PATH.login()}?redirect=${PATH.singleProduct(_id.toString(), name)}`);
        }
    };

    return (
        <section className="flex w-full flex-col gap-4 pt-4 pb-14">
            <div className="flex w-full items-center justify-between">
                <BackButton />

                <div className="flex items-center gap-4">
                    <Link
                        href={PATH.compare(_id.toString())}
                        className="bg-bg-2 dark:bg-customBlack-50 flex size-10 cursor-pointer items-center justify-center rounded-full p-2"
                    >
                        <CompareIcon className="fill-customBlack-200 dark:fill-white" />
                    </Link>
                    <span className="bg-bg-2 dark:bg-customBlack-50 flex size-10 cursor-pointer items-center justify-center rounded-full p-2">
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
                    <h1 className="text-customBlack-200 mb-2 w-full text-2xl font-bold dark:text-white">
                        {capitalizeTheFirstLettersOfWords(name)}
                    </h1>

                    <section className="flex flex-col gap-2">
                        <Modal status={false} title="انتخاب سایز" onClose={() => console.log(false)}>
                            kjl
                        </Modal>

                        <div className="bg-bg-2 dark:bg-secondary-600 flex h-12 w-full items-center justify-between rounded-full px-4">
                            <span>تعداد</span>
                            <div className="flex items-center gap-6">
                                <span
                                    onClick={() => setProductData({ ...productData, quantity: productData.quantity + 1 })}
                                    className="bg-primary-100 flex size-9 cursor-pointer items-center justify-center rounded-full"
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
                                    className="bg-primary-100 flex size-9 cursor-pointer items-center justify-center rounded-full"
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

                    {tags && <ProductTags tags={tags} />}
                </div>
            </section>

            <section className="my-5 flex w-full flex-col gap-4">
                <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">نظرات</h3>
                    {reviews && !!reviews.length && <span className="text-sm">{reviews.length} نظر</span>}
                </div>

                <ReviewsList reviews={reviews} limit={5} isLoading={false} />
                <span onClick={handleAddNewReview} className="flex cursor-pointer items-center gap-2">
                    <EditIcon className="fill-primary-100 size-5" />
                    <p className="text-primary-100">نظر خود را برای این محصول بنویسید.</p>
                </span>

                {isAddReview ? (
                    <AddReviewForm
                        productId={String(params.slug)}
                        onSubmit={(comment: any) => {
                            setIsAddReview(false);
                            setReviews((prev: any) => [...prev, comment]);
                        }}
                    />
                ) : null}
            </section>

            <div className="bg-secondary-50 dark:bg-secondary-600 fixed right-0 bottom-16 z-[2] flex w-full items-center justify-between gap-2 border-t border-gray-500 px-4 py-2">
                <Button onClick={() => addToCartsHandler(productData)} className="w-auto cursor-pointer px-4 font-light">
                    افزودن به سبد خرید
                </Button>

                <div className="text-primary-100 flex items-center gap-2 text-xl font-semibold">
                    <span
                        className={`flex items-center gap-2 ${isNumber(discountedPrice) ? "text-base font-normal text-gray-600 line-through dark:text-gray-500" : "text-primary-100 dark:text-secondary-100 font-medium"}`}
                    >
                        {basePrice > 0 ? (
                            <>
                                {tomanFormat(basePrice)}
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
                                className="bg-secondary-50 dark:bg-secondary-700 w-1/2 shadow-none"
                            />
                        ))}
                    </div>
                </section>
            )}
        </section>
    );
};

export default MobileSingleProduct;
