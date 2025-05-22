"use client";
import { useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PATH from "@/shared/path";
import { sidebarItems } from "@/features/ProfilePage/components/sidebarItems";
import LogoutIcon from "@/assets/icons/components/Logout";

const Sidebar = () => {
    const userState = useAppSelector((state: any) => state.auth.user);
    const pathname = usePathname();

    return (
        <aside className="no-scrollbar dark:bg-secondary-700 hidden h-full max-w-[250px] min-w-[250px] flex-col items-center justify-between gap-4 overflow-y-auto rounded-3xl bg-white p-4 py-5 lg:flex">
            <div className="flex w-full flex-col gap-8">
                <Link href={PATH.home()} className="self-start pt-8 text-3xl font-bold dark:text-white">
                    {process.env.shop_name}
                </Link>

                <div className="text-customBlack-100 dark:text-secondary-100 flex w-full flex-1 flex-col overflow-auto">
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
                                            isActive ? "text-primary-100 bg-gradient-to-l dark:text-violet-300" : ""
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
