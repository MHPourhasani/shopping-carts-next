"use client";
import PATH from "@/shared/path";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopMenu = () => {
    const pathname = usePathname();
    let isActive = false;

    const items = [
        { title: "خانه", path: PATH.home() },
        { title: "محصولات", path: PATH.products() },
        { title: "بلاگ", path: PATH.blogs() },
        { title: "درباره ما", path: PATH.aboutUs() },
        { title: "تماس با ما", path: PATH.contactUs() },
    ];

    return (
        <nav className="hidden items-center gap-8 lg:flex">
            {items.map((item) => {
                isActive = pathname === item.path;

                return (
                    <div
                        key={item.path}
                        className={`hover-transition group hover:text-primary-100 flex flex-col gap-1 ${isActive ? "text-primary-100 dark:text-purple-400" : ""}`}
                    >
                        <Link href={item.path}>{item.title}</Link>
                        {isActive && (
                            <div className="flex h-1 w-full gap-0.5">
                                <span className="bg-primary-100 aspect-square h-full rounded-full dark:bg-purple-400"></span>
                                <span className="h- bg-primary-100 flex-1 rounded-full dark:bg-purple-400"></span>
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default DesktopMenu;
