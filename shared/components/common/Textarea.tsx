import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    textareaClassName?: string;
    error?: string;
    hint?: string;
}

const Textarea = (props: TextareaProps) => {
    return (
        <div className="flex w-full flex-col gap-2">
            <label htmlFor="textarea">{props.label}</label>
            <textarea
                id="textarea"
                {...props}
                className={`rounded-xl border-[1.5px] p-2 text-secondary-600 outline-none focus:outline-none disabled:bg-bg-2 dark:border-secondary-400 dark:bg-secondary-700 dark:text-white dark:disabled:bg-secondary-600 dark:lg:bg-secondary-500 ${props.textareaClassName}`}
            ></textarea>

            {props.error ? (
                <p className="text-red-600">{props.error}</p>
            ) : props.hint ? (
                <p className="text-primary-500 text-sm">{props.hint}</p>
            ) : undefined}
        </div>
    );
};

export default Textarea;
