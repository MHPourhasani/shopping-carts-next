import { forwardRef } from "react";
import { Label } from "./label";
import { cn } from "@/shared/libs/utils";

interface Props extends React.ComponentProps<"textarea"> {
    label: string;
    error?: string;
    hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ className, label, error, hint, ...props }, ref) => {
    return (
        <div className="flex w-full flex-col items-start gap-2.5">
            <Label>{label}</Label>
            <textarea
                className={cn(
                    "border-input bg-bg-2 ring-offset-background dark:bg-customBlack-100 placeholder:text-muted-foreground flex min-h-20 w-full rounded-xl border px-3 py-2 text-base focus:bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className,
                )}
                ref={ref}
                {...props}
            />
            {error && <p className="text-red-600">{error}</p>}
            {hint && <p className="text-sky-600">{hint}</p>}
        </div>
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
