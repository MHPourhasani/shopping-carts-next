import PATH from "../../../shared/utils/path";
import CategoryIcon from "@/assets/icons/components/Category";
import UsersIcon from "@/assets/icons/components/Users";
import InfoIcon from "@/assets/icons/components/Info";
import SettingIcon from "@/assets/icons/components/Setting";
import PaperNote from "@/assets/icons/components/PaperNote";
import ReceiptIcon from "@/assets/icons/components/Receipt";
import LoveIcon from "@/assets/icons/components/Love";
import ShopIcon from "@/assets/icons/components/Shop";
import ProductsIcon from "@/assets/icons/components/Products";
import { UserRoleEnum } from "@/features/auth/enums";

const strokeColor = `stroke-customBlack-100 dark:stroke-secondary-100`;
const activeStrokeColor = `stroke-primary-100 dark:stroke-violet-300`;
const fillColor = `fill-customBlack-100 dark:fill-secondary-100`;
const activeFillColor = `fill-primary-100 dark:fill-violet-300`;

export const sidebarItems = (pathname: string) => {
    return [
        {
            title: "داشبورد",
            icon: <CategoryIcon className={pathname === PATH.dashboard.main() ? activeFillColor : fillColor} />,
            href: PATH.dashboard.main(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "سفارشات",
            icon: <ReceiptIcon className={pathname === PATH.dashboard.order.orders() ? activeStrokeColor : strokeColor} />,
            href: PATH.dashboard.order.orders(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "علاقه مندی ها",
            icon: <LoveIcon className={pathname === PATH.dashboard.favorites() ? activeFillColor : fillColor} />,
            href: PATH.dashboard.favorites(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "فروشگاه",
            icon: <ShopIcon className={pathname === PATH.dashboard.shop() ? activeFillColor : fillColor} />,
            href: PATH.dashboard.shop(),
            roles: [UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "محصولات",
            icon: <ProductsIcon className={pathname === PATH.dashboard.products.main() ? activeFillColor : fillColor} />,
            href: PATH.dashboard.products.main(),
            roles: [UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "نوشته ها",
            icon: <PaperNote className={pathname === PATH.dashboard.blog.blogs() ? activeFillColor : fillColor} />,
            href: PATH.dashboard.blog.blogs(),
            roles: [UserRoleEnum.AUTHOR, UserRoleEnum.ADMIN],
        },
        {
            title: "کاربران",
            icon: <UsersIcon className={pathname === PATH.dashboard.users.main() ? activeFillColor : fillColor} />,
            href: PATH.dashboard.users.main(),
            roles: [UserRoleEnum.ADMIN],
        },
        {
            title: "پشتیبانی",
            icon: <InfoIcon className={pathname === PATH.dashboard.support() ? activeFillColor : fillColor} />,
            href: PATH.dashboard.support(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
        {
            title: "تنظیمات",
            icon: <SettingIcon className={pathname === PATH.dashboard.settings() ? activeFillColor : fillColor} />,
            href: PATH.dashboard.settings(),
            roles: [UserRoleEnum.CUSTOMER, UserRoleEnum.AUTHOR, UserRoleEnum.SELLER, UserRoleEnum.ADMIN],
        },
    ];
};
