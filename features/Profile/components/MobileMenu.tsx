"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import PATH from "@/shared/utils/path";
import { SidebarItems } from "@/features/Profile/components/SidebarItems";
import LogoutButton from "./LogoutButton";
import HamMenuIcon from "@/assets/icons/components/HamMenu";

const MobileMenu = () => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden">
                <HamMenuIcon className="size-5 stroke-gray-700 dark:stroke-gray-200" />
            </SheetTrigger>

            <SheetContent className="justify-between px-4 pt-4">
                <div className="flex flex-1 flex-col gap-4">
                    <Link href={PATH.home()} className="self-start text-2xl font-bold dark:text-white">
                        {process.env.shop_name}
                    </Link>

                    <SidebarItems />
                </div>

                <LogoutButton />
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
