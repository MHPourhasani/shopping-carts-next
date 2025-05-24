import * as React from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/shared/helper";

interface Props extends React.ComponentProps<"input"> {
    label: string;
    error?: string;
    hint?: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, Props>(({ className, type, label, error, hint, ...props }, ref) => {
    const id = React.useId();

    return (
        <div className="flex flex-col items-start gap-2.5">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} className={cn("", className)} ref={ref} {...props} />

            {error && <p className="text-red-600">{error}</p>}
            {hint && <p className="text-sky-600">{hint}</p>}
        </div>
    );
});
InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };
