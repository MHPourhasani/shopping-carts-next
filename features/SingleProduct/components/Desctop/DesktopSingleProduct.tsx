import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import { capitalizeTheFirstLettersOfWords, tomanFormat } from "@/shared/utils/utils";
import ProductTags from "../ProductTags";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PATH from "@/shared/utils/path";
import notImage from "@/assets/images/not-images.svg";
import LoveIcon from "@/assets/icons/components/Love";
import BreadCrumb from "@/shared/components/common/BreadCrumb";
import ProductCardItem from "../ProductCardItem";
import CompareIcon from "@/assets/icons/components/Compare";
import { ISingleProductProps } from "../../interface/interface";
import { Button } from "@/components/ui/button";
import Toman from "@/assets/icons/components/Toman";

const DesktopSingleProduct = (props: ISingleProductProps) => {
    const { addToCartsHandler, productData, addToFavoriteHandler, handleSelectAttributes } = props;
    const { _id, images, name, basePrice, tags, description, relatedProducts, attributes } = productData.product;
    const [imageActive, setImageActive] = useState(0);
    const router = useRouter();
    const swiperRef = useRef<any>();

    useEffect(() => {
        swiperRef.current?.swiper.slideTo(imageActive);
    }, [imageActive]);

    return (
        <section className="container flex w-full flex-1 flex-col gap-4">
            <BreadCrumb
                items={[
                    { title: "محصولات", path: PATH.products() },
                    {
                        title: name,
                        path: PATH.singleProduct(_id.toString(), name),
                    },
                ]}
            />

            <section className="flex min-h-[100vh-20px] w-full items-start justify-between gap-10 pb-10 xl:gap-16">
                <div className="flex aspect-square w-5/12 flex-col items-start justify-center gap-2">
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
                            {images.map((image: any, index: number) => {
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
                        {images.map((image: any, index: number) => {
                            return (
                                <Image
                                    key={index}
                                    src={image}
                                    alt={name}
                                    width={500}
                                    height={500}
                                    onClick={() => setImageActive(index)}
                                    className={`aspect-square w-28 cursor-pointer rounded-lg ${imageActive === index ? "opacity-100" : "opacity-50"}`}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="flex w-7/12 flex-col gap-8">
                    <div className="flex w-full flex-col gap-8">
                        <span className="text-secondary-600 flex w-full items-center justify-between text-xl font-bold">
                            <h1 className="text-customBlack-200 text-2xl xl:text-3xl dark:text-white">
                                {capitalizeTheFirstLettersOfWords(name)}
                            </h1>

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
                        </span>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold">توضیحات</h3>
                            <p
                                dangerouslySetInnerHTML={{ __html: description ?? "توضیحی برای این محصول وجود ندارد." }}
                                className="text-lg text-gray-500 dark:text-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                        {attributes.map((attr) => (
                            <div key={attr.slug} className="mb-4">
                                <h4 className="mb-1 text-sm font-semibold">{attr.name}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {attr.values.map((value) => (
                                        <button
                                            key={value.slug}
                                            className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
                                            onClick={() => handleSelectAttributes(attr.slug, value)}
                                        >
                                            {value.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <section className="flex flex-col gap-8">
                        {/* <div className="flex h-12 w-full items-center gap-8 rounded-full">
                            <span className="font-semibold">تعداد</span>
                            <div className="bg-bg-2 dark:bg-secondary-600 flex items-center gap-4 rounded-full p-2">
                                <span
                                    onClick={() => setProductData({ ...productData, quantity: productData.quantity + 1 })}
                                    className="bg-primary-100 flex size-9 cursor-pointer items-center justify-center rounded-full"
                                >
                                    <Image src={addIcon} alt="add" />
                                </span>

                                <span className="min-w-5 text-center">{productData.quantity}</span>

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
                        </div> */}
                    </section>

                    <div className="flex gap-4">
                        <Button
                            size="xl"
                            onClick={() => addToCartsHandler(productData)}
                            className="flex-1 cursor-pointer justify-between px-6"
                        >
                            <span className="flex items-center gap-2 text-lg font-bold">
                                {basePrice ? (
                                    <>
                                        {tomanFormat(basePrice)} <Toman className="text-white" />
                                    </>
                                ) : (
                                    "محصول در انبار موجود نیست"
                                )}
                            </span>
                            <span>افزودن به سبد خرید</span>
                        </Button>

                        <Button
                            variant="secondary"
                            size="xl"
                            onClick={() => {
                                addToCartsHandler(productData);
                                router.push(PATH.carts());
                            }}
                            className="flex-1 cursor-pointer"
                        >
                            خرید آنی
                        </Button>
                    </div>

                    {tags && <ProductTags tags={tags} />}
                </div>
            </section>

            {/* <SingleProductTab /> */}

            {relatedProducts && (
                <section className="flex w-full flex-col gap-6 border-t py-10">
                    <h3 className="text-xl font-semibold">محصولات مشابه</h3>

                    <div className="no-scrollbar overflow-x-aut flex w-full flex-1 gap-4">
                        {relatedProducts.map((p) => (
                            <ProductCardItem
                                key={p._id}
                                product={p}
                                href={PATH.singleProduct(String(p._id), p.name)}
                                className="w-1/4 xl:w-1/6"
                            />
                        ))}
                    </div>
                </section>
            )}
        </section>
    );
};

export default DesktopSingleProduct;
