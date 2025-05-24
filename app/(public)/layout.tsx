import Footer from "@/features/Layout/components/Footer";
import Header from "@/features/Layout/components/Header/Header";
import React, { Suspense } from "react";
import Loading from "./loading";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<Loading />}>
            <div className="dark:bg-secondary-800 flex min-h-dvh w-full max-w-full flex-col items-center justify-start overflow-x-hidden bg-white">
                <section className="flex h-full w-full flex-1 flex-col items-center justify-center">
                    <div className="hidden w-full items-center justify-center lg:flex">
                        <Header />
                    </div>
                    <main className="flex w-full flex-1 flex-col pb-20 lg:pb-4">{children}</main>
                    <Footer />
                </section>
            </div>
        </Suspense>
    );
}
