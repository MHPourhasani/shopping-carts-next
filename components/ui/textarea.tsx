import { cn } from "@/shared/helper";
import { forwardRef } from "react";
import { Label } from "./label";

interface Props extends React.ComponentProps<"textarea"> {
    label: string;
    error?: string;
    hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ className, label, error, hint, ...props }, ref) => {
    return (
        <div>
            <Label>{label}</Label>
            <textarea
                className={cn(
                    "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
