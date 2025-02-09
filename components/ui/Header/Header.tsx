"use client";
import Image from "next/image";
import bagIcon from "@/assets/icons/svgs/bag.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfileIcon from "@/assets/icons/components/Profile";
import PATH from "@/shared/path";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useAppSelector } from "@/redux/hooks";
import DesktopMenu from "./DesktopMenu";
import Search from "@/components/Search";
import { Suspense } from "react";

const Header = () => {
    const { data: session } = useSession();
    const userState = useAppSelector((state: any) => state.auth.user);

    return (
        <header className="flex w-full flex-col items-center justify-center gap-8 dark:border-gray-400 lg:gap-12 lg:border-b-2 lg:p-4">
            <section className="custom-container flex items-center justify-between gap-20">
                <div className="flex items-center gap-8 lg:hidden">
                    <ThemeSwitch />
                </div>

                <div className="flex w-full items-center gap-24">
                    <Link href={PATH.home()} className="text-xl font-bold dark:text-white lg:text-3xl">
                        {process.env.shop_name}
                    </Link>

                    <Suspense fallback={"loading..."}>
                        <div className="hidden max-w-[600px] flex-1 lg:flex">
                            <Search />
                        </div>
                    </Suspense>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden lg:flex">
                        <ThemeSwitch />
                    </div>
                    <div className="group relative">
                        <Link
                            href={PATH.carts()}
                            className="flex size-10 items-center justify-center rounded-full bg-primary-100 p-2 lg:size-12"
                        >
                            <Image src={bagIcon} alt="bag" className="h-full w-full" />
                        </Link>

                        {/* {userState?.carts && (
                    <section className="absolute top-0 z-50 hidden w-80 flex-col rounded-xl shadow-xl group-hover:flex">
                        <div className="flex flex-col gap-2">
                            {userState.carts.products.map((product: any) => (
                                <div key={product._id} className="flex w-full items-center justify-between gap-3 bg-bg-2 p-2 lg:p-4">
                                    <Link
                                        href={`${PATH.products}/${product?.brand?.toLocaleLowerCase()}/${product?._id}`}
                                        className="h-36 w-36 hover:opacity-80 lg:h-32 lg:w-32"
                                    >
                                        <Image
                                            src={product?.images ? product?.images[0] : notImage}
                                            alt={product?.name}
                                            width={500}
                                            height={500}
                                            loading="lazy"
                                            className="h-auto w-full rounded-[4px] lg:rounded-[6px]"
                                        />
                                    </Link>

                                    <div className="flex flex-1 flex-col items-center justify-between gap-6 lg:gap-12">
                                        <section className="flex w-full items-center justify-between">
                                            <Link href={`${PATH.products}/${product?.brand?.toLocaleLowerCase()}/${product?._id}`}>
                                                <span className="text-lg font-semibold hover:text-gray-600 md:text-xl">
                                                    {capitalizeTheFirstLettersOfWords(product?.name)}
                                                </span>
                                            </Link>

                                            <div className="font-semibold lg:text-lg">
                                                <span>{product.quantity} x </span>
                                                <span>$ {product?.price}</span>
                                            </div>
                                        </section>

                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center gap-4 text-sm md:text-base lg:text-lg">
                                                <span className="flex items-center text-gray-400">
                                                    Size: <p className="ml-1 font-semibold text-secondary-600">{product.size}</p>
                                                </span>
                                                <span className="flex items-center text-gray-400">
                                                    Color: <p className="font-semibold text-secondary-600">{product?.color}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )} */}
                    </div>
                    <Link
                        href={session?.user.userId ? PATH.profile.main() : PATH.login()}
                        className="hidden items-center justify-center gap-2 rounded-xl border border-gray-200 p-3 shadow-lg shadow-gray-200 dark:bg-secondary-700 dark:shadow-none lg:flex lg:max-w-48"
                    >
                        <ProfileIcon className="stroke-black dark:stroke-white" />
                        <span className="truncate">
                            {userState ? `${userState.first_name ? userState.first_name : "کاربر"}` : "ورود | ثبت نام"}
                        </span>
                    </Link>
                </div>
            </section>

            <Suspense fallback={"loading..."}>
                <div className="flex w-full flex-1 lg:hidden">
                    <Search />
                </div>
            </Suspense>
            <DesktopMenu />
        </header>
    );
};

export default Header;
