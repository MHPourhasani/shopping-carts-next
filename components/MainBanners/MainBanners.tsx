"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { BannerInterface } from "@/interfaces/general";
import PATH from "@/utils/path";

interface IProps {
    banners: BannerInterface[];
}

const MainBanners = ({ banners }: IProps) => {
    return (
        <section className="h-fit w-full rounded-xl px-4">
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="aspect-auto w-full rounded-xl lg:aspect-[100/30]"
            >
                {!!banners.length &&
                    banners.map((banner: BannerInterface) => {
                        return (
                            <SwiperSlide key={String(banner._id)} className="flex w-full items-center justify-start">
                                <Link href={`${PATH.banners()}/${banner.name}`}>
                                    <Image
                                        src={banner.src}
                                        alt={banner.name}
                                        width={500}
                                        height={500}
                                        priority
                                        className="aspect-[190/135] w-full rounded-xl lg:aspect-[100/30]"
                                    />
                                </Link>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </section>
    );
};

export default MainBanners;
