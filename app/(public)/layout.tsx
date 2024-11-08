import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header/Header";
import React, { Suspense } from "react";
import Loading from "./loading";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<Loading />}>
            <div className="flex min-h-screen w-full max-w-full flex-col items-center justify-start overflow-x-hidden bg-white dark:bg-secondary-800">
                <section className="flex h-full w-full flex-1 flex-col items-center justify-center">
                    <div className="hidden w-full items-center justify-center lg:flex">
                        <Header />
                    </div>
                    <main className="custom-container flex flex-1 flex-col p-4 pb-20 lg:pb-4">{children}</main>
                    <Footer />
                </section>
            </div>
        </Suspense>
    );
}
