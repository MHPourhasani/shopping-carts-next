import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    inputClassName?: string;
}

const Input = (props: InputProps) => {
    return (
        <div className={`flex w-full flex-col gap-2 ${props.className}`}>
            {props.label && (
                <label htmlFor={props.name || "input"} className="dark:text-secondary-100">
                    {props.label}
                </label>
            )}
            <input
                {...props}
                id={props.name || "input"}
                className={`rounded-xl border-[1.5px] p-3 text-secondary-600 outline-none focus:outline-none disabled:bg-bg-2 dark:border-secondary-400 dark:bg-secondary-700 dark:text-white dark:disabled:bg-secondary-600 dark:lg:bg-secondary-500 ${props.inputClassName}`}
            />
            {props.error ? (
                <p className="text-red-600">{props.error}</p>
            ) : props.hint ? (
                <p className="text-primary-500 text-sm">{props.hint}</p>
            ) : undefined}
        </div>
    );
};

export default Input;
