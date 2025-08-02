"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { IBanner } from "@/interfaces/general";
import PATH from "@/shared/utils/path";

interface IProps {
    banners: IBanner[];
}

const MainBanners = ({ banners }: IProps) => {
    return (
        <section className="container h-fit w-full rounded-xl">
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
                    banners.map((banner: IBanner) => {
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
