"use client";
import Error500 from "@/shared/components/Error500";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex w-full flex-1 flex-col items-start gap-6 pt-4 pb-20 2xl:items-center 2xl:justify-center">
            <Error500 />
        </div>
    );
}
