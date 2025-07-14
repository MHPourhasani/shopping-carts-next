import { cn } from "@/shared/utils/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "bg-bg-2 file:text-foreground dark:bg-customBlack-100 flex h-12 w-full rounded-xl border border-gray-500 px-4 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus:bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
