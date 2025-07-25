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
};
