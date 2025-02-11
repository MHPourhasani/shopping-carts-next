import { cn } from "@/shared/helper";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "Tertiary" | "Primary" | "Secondary" | "Text";
    children: React.ReactNode;
    className?: string;
}

const Button = (props: ButtonProps) => {
    const { variant = "Primary" } = props;

    return (
        <button
            {...props}
            className={cn(
                `hover-transition flex w-full flex-row-reverse items-center justify-center gap-2 rounded-full py-3 disabled:cursor-not-allowed`,
                {
                    "disabled:text-secondary-200 bg-primary-100 text-white hover:bg-violet-600 disabled:bg-bg-2 dark:disabled:bg-gray-400":
                        variant === "Primary",
                    "border-1.5 border-primary-100 text-primary-100 hover:border-violet-700 hover:bg-violet-50 hover:text-violet-600 disabled:border-secondary-300 disabled:text-secondary-300 dark:border-violet-400 dark:text-violet-400 dark:hover:border-violet-500 dark:hover:bg-violet-500 dark:hover:text-white":
                        variant === "Secondary",
                    "disabled:text-secondary-200 border-1.5 border-secondary-600 text-secondary-800 hover:border-secondary-700 hover:bg-gray-100 disabled:border-[#E5E5E5] dark:bg-secondary-700 dark:text-secondary-100 dark:hover:bg-secondary-600":
                        variant === "Tertiary",
                    "text-primary-600 disabled:text-secondary-200 hover:text-primary-100": variant === "Text",
                },
                `${props.className}`,
            )}
        >
            {props.children}
        </button>
    );
};

export default Button;
