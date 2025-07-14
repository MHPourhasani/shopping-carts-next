"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@/assets/icons/components/Home";
import ProfileIcon from "@/assets/icons/components/Profile";
import PATH from "@/shared/utils/path";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import ShopIcon from "@/assets/icons/components/Shop";
import PaperNote from "@/assets/icons/components/PaperNote";

const Navbar = () => {
    const userState = useAppSelector((state) => state.auth.user);
    const pathname = usePathname();
    let isActive = false;

    const navbarItems = [
        { title: "خانه", icon: <HomeIcon className="fill-inherit" />, href: PATH.home() },
        { title: "محصولات", icon: <ShopIcon className="fill-inherit" />, href: PATH.products() },
        { title: "بلاگ", icon: <PaperNote className="fill-inherit" />, href: PATH.blogs() },
        {
            title: "پروفایل",
            icon:
                !!userState && userState?.profile_image ? (
                    <Image
                        src={userState.profile_image}
                        alt="user"
                        width={100}
                        height={100}
                        className="aspect-square size-6 rounded-full"
                    />
                ) : (
                    <ProfileIcon />
                ),
            href: PATH.dashboard.main(),
        },
    ];

    return (
        <nav className="dark:bg-secondary-700 fixed bottom-0 z-40 flex h-16 w-full items-center justify-around bg-white lg:hidden">
            {navbarItems.map((navItem) => {
                isActive = pathname === navItem.href;

                return (
                    <Link
                        key={navItem.title}
                        href={navItem.href}
                        aria-label={navItem.title}
                        className={`relative ${isActive ? "fill-primary-100" : "fill-gray-500"}`}
                    >
                        {navItem.icon}
                    </Link>
                );
            })}
        </nav>
    );
};

export default Navbar;
