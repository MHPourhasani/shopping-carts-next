"use client";
import { scrollToTop } from "@/shared/helper";
import Image from "next/image";
import appStoreIcon from "@/assets/images/app-store.svg";
import googlePlayIcon from "@/assets/images/google-play.svg";
import Link from "next/link";
import { useState } from "react";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";
import PATH from "@/shared/path";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
    const [email, setEmail] = useState("");

    const menuItems = [
        {
            title: "همراه ما باش!",
            items: [
                { title: "درباره ما", href: PATH.contactUs() },
                { title: "تماس با ما", href: PATH.aboutUs() },
            ],
        },
        {
            title: "خدمات مشتری",
            items: [
                { title: "سوالات متداول", href: PATH.fag() },
                { title: "قوانین و مقررات", href: PATH.terms() },
                { title: "حریم خصوصی", href: PATH.privacy() },
                { title: "گزارش باگ", href: PATH.bugReport() },
            ],
        },
    ];

    return (
        <footer className="bg-bg-2 dark:bg-secondary-700 hidden w-full justify-center border-t-2 border-gray-200 p-4 lg:flex dark:border-gray-400">
            <section className="container flex flex-col gap-8">
                <div className="flex w-full items-center justify-between">
                    <span className="text-2xl font-bold">{process.env.shop_name}</span>
                    <Button
                        variant="secondary"
                        onClick={scrollToTop}
                        className="border-secondary-100 text-secondary-400 dark:text-secondary-100 w-fit cursor-pointer rounded-lg border p-2 dark:bg-gray-700"
                    >
                        برگشت به بالا
                        <ArrowLeft className="stroke-secondary-400 dark:stroke-secondary-100 rotate-90" />
                    </Button>
                </div>

                <div className="flex w-full items-start justify-between">
                    <div className="flex flex-1">
                        {menuItems.map((menuItem, index) => (
                            <div key={index} className="flex w-full flex-col gap-6">
                                <p className="text-lg font-semibold">{menuItem.title}</p>

                                <ul className="flex flex-col gap-4 text-gray-500 dark:text-gray-400">
                                    {menuItem.items.map((item, index) => (
                                        <Link key={index} href={item.href} className="hover:text-primary-100">
                                            {item.title}
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="flex w-1/4 flex-col gap-6">
                        <p className="font-semibold">همراه ما باش!</p>
                        {/* <span></span> */}
                        <div>
                            <p>تخفیفات</p>

                            <span className="mt-2 flex items-center gap-2">
                                <Input
                                    dir="ltr"
                                    type="email"
                                    value={email}
                                    placeholder="ایمیل"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="placeholder:!text-right"
                                />
                                <Button disabled={!email.includes("@")} className="h-12 w-fit cursor-pointer rounded-lg">
                                    ارسال
                                </Button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bg-primary-100 flex w-full items-center justify-between rounded-lg p-4">
                    <p className="text-xl text-white">دانلود برنامه</p>
                    <span className="flex h-14 items-center gap-2">
                        <a href="" target="_blank" className="h-full">
                            <Image src={appStoreIcon} alt="app store" className="h-full w-auto" />
                        </a>

                        <a href="" target="_blank" className="h-full">
                            <Image src={googlePlayIcon} alt="google play" className="h-full w-auto" />
                        </a>
                    </span>
                </div>
                <div className="flex w-full items-center justify-between text-gray-500 dark:text-gray-400">
                    <p>
                        طراحی و توسعه یافته توسط{" "}
                        <a
                            href="https://mh-pourhasani.vercel.app/"
                            target="_blank"
                            className="hover-transition hover:text-primary-100 font-semibold"
                        >
                            محمد حسن پورحسنی
                        </a>
                    </p>
                    <p>Copyright © 2024</p>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
