import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import addIcon from "@/assets/icons/svgs/add.svg";
import minusIcon from "@/assets/icons/svgs/minus.svg";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import ReviewsList from "@/components/Reviews/ReviewsList/ReviewsList";
import { capitalizeTheFirstLettersOfWords, tomanFormat } from "@/utils/helper";
import AddReview from "@/components/Reviews/AddReview";
import { ColorInterface, SingleProductPropsInterface } from "@/interfaces/general";
import EditIcon from "@/assets/icons/components/Edit";
import { useSession } from "next-auth/react";
import ProductTags from "./ProductTags";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PATH from "@/utils/path";
import Button from "@/components/common/Button";
import TickIcon from "@/assets/icons/components/Tick";
import notImage from "@/assets/images/not-images.svg";
import LoveIcon from "@/assets/icons/components/Love";
import BreadCrumb from "../common/BreadCrumb";
import Toman from "@/assets/icons/components/Toman";
import ProductCardItem from "./ProductCardItem";
import CompareIcon from "@/assets/icons/components/Compare";

const DesktopSingleProduct = (props: SingleProductPropsInterface) => {
    const { isAddReview, setIsAddReview, reviews, setReviews, addToCartsHandler, productData, setProductData, addToFavoriteHandler } =
        props;
    const { _id, images, name, price, tags, description, relatedProducts } = productData.product;
    const { data: session } = useSession();
    const [imageActive, setImageActive] = useState(0);
    const router = useRouter();
    const params = useParams();
    const swiperRef = useRef<any>();

    useEffect(() => {
        swiperRef.current?.swiper.slideTo(imageActive);
    }, [imageActive]);

    return (
        <section className="flex w-full flex-1 flex-col gap-4 p-4">
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

                <div className="w-7/12">
                    <div className="flex w-full flex-col gap-8">
                        <span className="flex w-full items-center justify-between text-xl font-bold text-secondary-600">
                            <p className="text-2xl dark:text-white xl:text-3xl">{capitalizeTheFirstLettersOfWords(name)}</p>

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
                        </span>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold">توضیحات</h3>
                            <p className="text-lg text-gray-500 dark:text-gray-400">{description ? description : ""}</p>
                        </div>
                    </div>

                    <section className="flex flex-col gap-8 py-8">
                        <div className="flex flex-col gap-4">
                            <span className="font-semibold">سایز ها</span>

                            <div className="flex flex-wrap gap-2">
                                {productData.product?.sizes?.split(",").map((size: string) => {
                                    return (
                                        <span
                                            key={size}
                                            onClick={() => setProductData({ ...productData, size: size })}
                                            className={`flex aspect-square h-12 cursor-pointer items-center justify-center rounded-full bg-bg-2 ${
                                                size === productData.size ? "bg-primary-100 font-semibold text-white" : "text-secondary-600"
                                            }`}
                                        >
                                            {size}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="font-semibold">رنگ ها</span>

                            <div className="flex flex-wrap gap-2">
                                {productData.product?.colors?.map((color: ColorInterface, index) => {
                                    return (
                                        <span
                                            key={index}
                                            title={color.name}
                                            onClick={() => setProductData({ ...productData, color: color })}
                                            style={{ backgroundColor: color.hex }}
                                            className={`group relative flex size-10 cursor-pointer flex-col items-center justify-center rounded-full dark:bg-customBlack-50`}
                                        >
                                            {color === productData.color && (
                                                <TickIcon
                                                    className={`absolute top-1/4 w-5 fill-white ${color !== productData.color && "opacity-30"}`}
                                                />
                                            )}
                                            <p className="absolute -top-9 hidden items-center justify-center rounded-md bg-gray-500 p-1 text-white group-hover:flex">
                                                {color.name}
                                            </p>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex h-12 w-full items-center gap-8 rounded-full">
                            <span className="font-semibold">تعداد</span>
                            <div className="flex items-center gap-6 rounded-full bg-bg-2 p-2 dark:bg-secondary-600">
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

                    <div className="flex gap-4">
                        <Button variant="Primary" onClick={() => addToCartsHandler(productData)} className="justify-between px-6">
                            <span className="flex items-center gap-2 text-lg font-bold">
                                {tomanFormat(price)} <Toman className="text-white" />
                            </span>
                            <span>افزودن به سبد خرید</span>
                        </Button>

                        <Button
                            variant="Tertiary"
                            onClick={() => {
                                addToCartsHandler(productData);
                                router.push(PATH.carts());
                            }}
                            className="border px-6 shadow-lg shadow-gray-50 dark:shadow-secondary-700"
                        >
                            خرید آنی
                        </Button>
                    </div>

                    {tags && <ProductTags tags={tags.split(",")} />}
                </div>
            </section>

            <section className="flex w-full gap-10 border-t py-10">
                <div className="w-7/12">
                    <ReviewsList reviews={reviews ? reviews.slice(0, 5) : []} isLoading={false} />
                </div>

                <div className="flex flex-1 flex-col gap-4">
                    <span
                        onClick={() => {
                            if (session?.user.userId) {
                                setIsAddReview(!isAddReview);
                            } else {
                                router.push(`${PATH.login()}?redirect=${PATH.singleProduct(_id.toString(), name)}`);
                                toast.success("لطفا وارد شوید");
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
                            onSubmit={(review: any) => {
                                setIsAddReview(false);
                                setReviews((prev: any) => [...prev, review]);
                            }}
                        />
                    ) : null}
                </div>
            </section>

            {relatedProducts && (
                <section className="flex w-full flex-col gap-6 border-t py-10">
                    <h3 className="text-xl font-semibold">محصولات مرتبط</h3>

                    <div className="no-scrollbar overflow-x-aut flex w-full flex-1 gap-4">
                        {relatedProducts.map((p) => (
                            <ProductCardItem product={p} href={PATH.singleProduct(p._id.toString(), p.name)} className="w-1/4 xl:w-1/6" />
                        ))}
                    </div>
                </section>
            )}
        </section>
    );
};

export default DesktopSingleProduct;
