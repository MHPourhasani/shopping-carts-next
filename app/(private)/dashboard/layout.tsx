import type { Metadata } from "next";
import DashboardHeader from "@/features/ProfilePage/components/Header";
import { Suspense } from "react";
import Loading from "./loading";
import Sidebar from "@/features/ProfilePage/components/Sidebar";
import { getTokenServer } from "@/shared/libs/api/axios";
import { redirect } from "next/navigation";
import PATH from "@/shared/utils/path";

export const metadata: Metadata = {
    title: {
        default: "داشبورد",
        template: `%s | داشبورد`,
    },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const authToken = await getTokenServer();
    if (!authToken?.access) redirect(PATH.login());

    return (
        <Suspense fallback={<Loading />}>
            <main className="bg-bg-2 dark:bg-secondary-800 flex w-screen flex-1 lg:items-center lg:justify-center lg:overflow-hidden">
                <div className="flex w-full max-w-[2000px] gap-5 lg:h-[95vh] lg:px-4 xl:w-11/12">
                    <Sidebar />
                    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
                        <DashboardHeader />
                        <div className="no-scrollbar dark:bg-secondary-800 dark:lg:bg-secondary-700 flex size-full flex-1 flex-col justify-start gap-4 overflow-y-auto bg-white p-4 pb-20 lg:rounded-3xl lg:p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </Suspense>
    );
}
