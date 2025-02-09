"use client";
import { useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PATH from "@/utils/path";
import { sidebarItems } from "@/utils/sidebar";
import LogoutIcon from "@/assets/icons/components/Logout";

const Sidebar = () => {
    const userState = useAppSelector((state: any) => state.auth.user);
    const pathname = usePathname();

    return (
        <aside className="no-scrollbar hidden h-full min-w-[250px] max-w-[250px] flex-col items-center justify-between gap-4 overflow-y-auto rounded-3xl bg-white p-4 py-5 dark:bg-secondary-700 lg:flex">
            <div className="flex flex-col gap-8 w-full">
                <Link href={PATH.home()} className="self-start text-3xl pt-8 font-bold dark:text-white">
                    {process.env.shop_name}
                </Link>

                <div className="flex w-full flex-1 flex-col text-customBlack-100 dark:text-secondary-100">
                    {userState &&
                        userState.role &&
                        sidebarItems(pathname)
                            .filter((item) => item.roles.includes(userState.role))
                            .map((item) => {
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-2 py-4 ${
                                            isActive
                                                ? "bg-gradient-to-l text-primary-100 dark:text-violet-300"
                                                : ""
                                        }`}
                                    >
                                        {item.icon}
                                        <p>{item.title}</p>
                                    </Link>
                                );
                            })}
                </div>
            </div>

            <div className="flex w-full items-center gap-2">
                <LogoutIcon className="fill-red-600" />
                <button type="submit" onClick={() => signOut()} className="hover-transition text-red-600 hover:text-red-700">
                    خروج از حساب کاربری
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
