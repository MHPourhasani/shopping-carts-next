import { cn } from "@/shared/helper";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "border-input bg-background file:text-foreground placeholder:text-muted-foreground flex h-12 w-full rounded-lg border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
