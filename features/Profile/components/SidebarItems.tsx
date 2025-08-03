"use client";
import PATH from "@/shared/utils/path";
import CategoryIcon from "@/assets/icons/components/Category";
import UsersIcon from "@/assets/icons/components/Users";
import InfoIcon from "@/assets/icons/components/Info";
import SettingIcon from "@/assets/icons/components/Setting";
import PaperNote from "@/assets/icons/components/PaperNote";
import ReceiptIcon from "@/assets/icons/components/Receipt";
import LoveIcon from "@/assets/icons/components/Love";
import ShopIcon from "@/assets/icons/components/Shop";
import ProductsIcon from "@/assets/icons/components/Products";
import { UserRoleEnum } from "@/features/Auth/enums";
import { useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Loader from "@/shared/components/Loader";

const strokeColor = `stroke-customBlack-100 dark:stroke-secondary-100`;
const activeStrokeColor = `stroke-primary-100 dark:stroke-violet-300`;
const fillColor = `fill-customBlack-100 dark:fill-secondary-100`;
const activeFillColor = `fill-primary-100 dark:fill-violet-300`;

export const SidebarItems = () => {
    const user = useAppSelector((state) => state.auth.user);
    const pathname = usePathname();

    const items = [
        {
            title: "خلاصه فعالیت ها",
            icon: <CategoryIcon className={pathname === PATH.profile.main() ? activeFillColor : fillColor} />,
            href: PATH.profile.main(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "سفارشات",
            icon: <ReceiptIcon className={pathname === PATH.profile.order.main() ? activeStrokeColor : strokeColor} />,
            href: PATH.profile.order.main(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "علاقه مندی ها",
            icon: <LoveIcon className={pathname === PATH.profile.favorites() ? activeFillColor : fillColor} />,
            href: PATH.profile.favorites(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "فروشگاه",
            icon: <ShopIcon className={pathname === PATH.profile.shop() ? activeFillColor : fillColor} />,
            href: PATH.profile.shop(),
            roles: [UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "محصولات",
            icon: <ProductsIcon className={pathname === PATH.profile.products.main() ? activeFillColor : fillColor} />,
            href: PATH.profile.products.main(),
            roles: [UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "نوشته ها",
            icon: <PaperNote className={pathname === PATH.profile.blog.blogs() ? activeFillColor : fillColor} />,
            href: PATH.profile.blog.blogs(),
            roles: [UserRoleEnum.AUTHOR, UserRoleEnum.ADMIN],
        },
        {
            title: "کاربران",
            icon: <UsersIcon className={pathname === PATH.profile.users.main() ? activeFillColor : fillColor} />,
            href: PATH.profile.users.main(),
            roles: [UserRoleEnum.ADMIN],
        },
        {
            title: "پشتیبانی",
            icon: <InfoIcon className={pathname === PATH.profile.support() ? activeFillColor : fillColor} />,
            href: PATH.profile.support(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "تنظیمات",
            icon: <SettingIcon className={pathname === PATH.profile.settings() ? activeFillColor : fillColor} />,
            href: PATH.profile.settings(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
    ];

    return (
        <div className="text-customBlack-100 dark:text-secondary-100 flex w-full flex-1 flex-col overflow-auto">
            {user ? (
                user.role &&
                items
                    .filter((item) => item.roles.includes(user.role))
                    .map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 border-b border-gray-200 py-4 lg:border-0 ${
                                    isActive ? "text-primary-100 bg-gradient-to-l dark:text-violet-300" : ""
                                }`}
                            >
                                {item.icon}
                                <p>{item.title}</p>
                            </Link>
                        );
                    })
            ) : (
                <Loader />
            )}
        </div>
    );
};
