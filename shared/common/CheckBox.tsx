import { cn } from "@/utils/helper";
import { InputHTMLAttributes } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const CheckBox = (props: CheckBoxProps) => {
    return (
        <div className="flex w-full items-center gap-2">
            <input
                {...props}
                type="checkbox"
                className={cn(
                    `form-checkbox size-5 cursor-pointer rounded-md border-1.5 outline-none ring-0 ring-offset-0 checked:bg-primary-100 checked:ring-0 hover:bg-secondary-50 checked:hover:bg-primary-50 focus:bg-primary-100 focus:ring-0 disabled:border-none disabled:bg-secondary-400 disabled:hover:!bg-secondary-300 dark:bg-secondary-700 dark:checked:bg-secondary-700 dark:hover:bg-secondary-500`,
                    props.className,
                )}
            />
            {props.label && (
                <label
                    htmlFor={props.id}
                    className={`w-full max-w-full cursor-pointer truncate dark:text-secondary-100 ${props.disabled ? "text-secondary-300 dark:text-secondary-100" : ""}`}
                >
                    {props.label}
                </label>
            )}
        </div>
    );
};

export default CheckBox;
