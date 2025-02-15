"use client";
import { useRouter } from "next/navigation";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";

interface Props {
    className?: string;
}

const BackButton = ({ className }: Props) => {
    const router = useRouter();

    return (
        <span
            onClick={() => router.back()}
            className={`flex size-10 rotate-180 cursor-pointer items-center justify-center rounded-full bg-bg-2 dark:bg-secondary-600 ${className}`}
        >
            <ArrowLeft className="size-5 stroke-secondary-700 dark:stroke-white" />
        </span>
    );
};

export default BackButton;
