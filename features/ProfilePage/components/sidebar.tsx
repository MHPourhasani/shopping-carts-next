"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import PATH from "@/shared/utils/path";
import { sidebarItems } from "@/features/ProfilePage/components/SidebarItems";
import LogoutIcon from "@/assets/icons/components/Logout";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/slices/authSlice";

const Sidebar = () => {
    const user = useAppSelector((state) => state.auth.user);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        // authTokenClient.remove();
        dispatch(setUser(null));
        router.push(PATH.home());
    };

    return (
        <aside className="no-scrollbar dark:bg-secondary-700 hidden h-full max-w-[250px] min-w-[250px] flex-col justify-between gap-4 overflow-y-auto rounded-3xl bg-white p-4 py-5 lg:flex">
            <div className="flex w-full flex-col gap-8">
                <Link href={PATH.home()} className="self-start text-3xl font-bold dark:text-white">
                    {process.env.shop_name}
                </Link>

                <div className="text-customBlack-100 dark:text-secondary-100 flex w-full flex-1 flex-col overflow-auto">
                    {user &&
                        user.role &&
                        sidebarItems(pathname)
                            .filter((item) => item.roles.includes(user.role))
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

            <Button
                variant="text"
                onClick={handleLogout}
                className="group w-full cursor-pointer justify-start !px-0 text-red-500 hover:text-red-600"
            >
                <LogoutIcon className="fill-red-600 group-hover:fill-red-700" />
                خروج از حساب کاربری
            </Button>
        </aside>
    );
};

export default Sidebar;
