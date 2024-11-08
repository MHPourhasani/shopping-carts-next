import type { Metadata } from "next";
import Sidebar from "@/components/Profile/Sidebar";
import { getServerAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import PATH from "@/utils/path";
import DashboardHeader from "@/components/Profile/Header";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
    title: {
        default: "پروفایل",
        template: `%s | پروفایل`,
    },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerAuthSession();

    if (!session) {
        redirect(`${PATH.login()}?redirect=${PATH.profile.main()}`);
    }

    return (
        <Suspense fallback={<Loading />}>
            <main className="flex w-screen flex-1 bg-bg-2 dark:bg-secondary-800 lg:items-center lg:justify-center lg:overflow-hidden">
                <div className="flex w-full max-w-[1800px] gap-5 lg:h-[95vh] lg:px-4 xl:w-11/12">
                    <Sidebar />
                    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
                        <DashboardHeader />
                        <div className="no-scrollbar flex size-full flex-1 flex-col justify-start gap-4 overflow-y-auto bg-white p-4 pb-20 dark:bg-secondary-800 lg:rounded-3xl lg:p-8 dark:lg:bg-secondary-700">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </Suspense>
    );
}
