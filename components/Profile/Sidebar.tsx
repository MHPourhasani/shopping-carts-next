"use client";
import { useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import PATH from "@/utils/path";
import { sidebarItems } from "@/utils/sidebar";

const Sidebar = () => {
    const userState = useAppSelector((state: any) => state.auth.user);
    const pathname = usePathname();

    return (
        <aside className="no-scrollbar hidden h-full min-w-[250px] max-w-[250px] flex-col items-center justify-between gap-4 overflow-y-auto rounded-3xl bg-white py-5 dark:bg-secondary-700 lg:flex">
            <Link href={PATH.home()} className="self-start p-4 text-3xl font-bold dark:text-white">
                {process.env.shop_name}
            </Link>

            <div className="flex w-full flex-1 flex-col gap-2 text-customBlack-100 dark:text-secondary-100">
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
                                    className={`flex items-center gap-2 border-r-4 p-4 ${
                                        isActive
                                            ? "border-primary-100 bg-gradient-to-l from-violet-100 to-violet-50 text-primary-100 dark:from-violet-500 dark:text-white"
                                            : "border-transparent"
                                    }`}
                                >
                                    {item.icon}
                                    <p>{item.title}</p>
                                </Link>
                            );
                        })}
            </div>

            <div className="w-full px-4">
                <button
                    type="submit"
                    onClick={() => signOut()}
                    className="hover-transition w-full rounded-lg border border-red-600 py-3 text-red-600 hover:bg-red-500 hover:text-white"
                >
                    خروج از حساب کاربری
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
