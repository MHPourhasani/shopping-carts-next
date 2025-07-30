"use client";
import { useAppSelector } from "@/redux/hooks";
import PATH from "@/shared/utils/path";
import Image from "next/image";
import Link from "next/link";
import userIcon from "@/assets/icons/svgs/user.svg";
import HomeIcon from "@/assets/icons/components/Home";
import Notifications from "./notifications/Notifications";

const DashboardHeader = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <header className="bg-bg-2 dark:bg-secondary-800 fixed top-0 z-50 flex w-full items-center justify-between gap-4 p-4 lg:relative lg:justify-end lg:bg-transparent lg:p-0">
            <span className="lg:hidden">lk,</span>

            <div className="flex items-center justify-between gap-4 lg:justify-end">
                <Link href={PATH.home()} aria-label="Home" className="hidden lg:block">
                    <HomeIcon className="hover-transition hover:fill-primary-100 relative fill-gray-500" />
                </Link>

                <Notifications />

                <Link
                    href={PATH.profile.personalInfo()}
                    className={`hidden aspect-square size-10 items-center justify-center rounded-full lg:flex ${user?.profile_image ? "" : "bg-bg-2 dark:bg-secondary-600"}`}
                >
                    <Image
                        src={user?.profile_image ? user.profile_image : userIcon}
                        alt="user"
                        width={500}
                        height={500}
                        className={`${user?.profile_image ? "h-full rounded-full object-cover" : "w-5"}`}
                    />
                </Link>
            </div>
        </header>
    );
};

export default DashboardHeader;
