"use client";
import { useAppSelector } from "@/redux/hooks";
import PATH from "@/shared/path";
import Image from "next/image";
import Link from "next/link";
import userIcon from "@/assets/icons/svgs/user.svg";
import HomeIcon from "@/assets/icons/components/Home";
import DashboardNotifications from "./notifications";

const DashboardHeader = () => {
    const userState = useAppSelector((state: any) => state.auth.user);

    return (
        <header className="hidden w-full items-center justify-end gap-4 lg:flex">
            <Link href={PATH.home()} aria-label="Home">
                <HomeIcon className="hover-transition relative fill-gray-500 hover:fill-primary-100" />
            </Link>

            <DashboardNotifications />

            <Link
                href={PATH.profile.main()}
                className={`flex aspect-square size-10 items-center justify-center rounded-full ${userState?.profile_image ? "" : "bg-bg-2 dark:bg-secondary-600"}`}
            >
                <Image
                    src={userState?.profile_image ? userState.profile_image : userIcon}
                    alt="user"
                    width={500}
                    height={500}
                    className={`${userState?.profile_image ? "h-full rounded-full object-cover" : "w-5"}`}
                />
            </Link>
        </header>
    );
};

export default DashboardHeader;
