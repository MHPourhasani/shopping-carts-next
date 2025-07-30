import type { Metadata } from "next";
import DashboardHeader from "@/features/Profile/components/Header";
import { Suspense } from "react";
import Loading from "./loading";
import Sidebar from "@/features/Profile/components/Sidebar";
import { getTokenServer } from "@/shared/libs/axios";
import { redirect } from "next/navigation";
import PATH from "@/shared/utils/path";

export const metadata: Metadata = {
    title: {
        default: "پروفایل",
        template: `%s | پروفایل`,
    },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const token = await getTokenServer();
    if (!token) redirect(PATH.login());

    return (
        <Suspense fallback={<Loading />}>
            <main className="bg-bg-2 dark:bg-secondary-800 flex w-screen flex-1 lg:items-center lg:justify-center lg:overflow-hidden">
                <div className="flex w-full max-w-600 gap-5 px-4 lg:h-[95vh]">
                    <Sidebar />
                    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2 pt-16 pb-20 lg:py-0">
                        <DashboardHeader />
                        <div className="no-scrollbar dark:bg-secondary-800 dark:lg:bg-secondary-700 flex size-full flex-1 flex-col justify-start gap-4 overflow-y-auto bg-white lg:rounded-3xl lg:p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </Suspense>
    );
}
