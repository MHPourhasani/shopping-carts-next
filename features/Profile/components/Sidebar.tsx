import Link from "next/link";
import PATH from "@/shared/utils/path";
import { SidebarItems } from "@/features/Profile/components/SidebarItems";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
    return (
        <aside className="no-scrollbar dark:bg-secondary-700 hidden h-full max-w-[250px] min-w-[250px] flex-col justify-between gap-4 overflow-y-auto rounded-3xl bg-white p-4 py-5 lg:flex">
            <div className="flex w-full flex-col gap-8">
                <Link href={PATH.home()} className="self-start text-3xl font-bold dark:text-white">
                    {process.env.shop_name}
                </Link>

                <SidebarItems />
            </div>

            <LogoutButton />
        </aside>
    );
};

export default Sidebar;
