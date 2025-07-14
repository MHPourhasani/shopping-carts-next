import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import arrow from "@/assets/icons/svgs/arrow.svg";
import close from "@/assets/icons/svgs/close.svg";
import useOnClickOutside from "@/shared/hooks/useOnClickOutside";
import { TOption } from "@/interfaces/general";
import { cn } from "@/shared/utils/utils";
import Image from "next/image";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

interface SingleSelectProps {
    defaultValue?: TOption;
    inputProps?: InputProps;
    options: TOption[];
    onChange: (selectedOption: TOption) => void;
    emptySearchText?: string;
    disabled?: boolean;
    className?: string;
}

const SingleSelect = (props: SingleSelectProps) => {
    const [search, setSearch] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<TOption[]>(props.options);
    const [selectedOption, setSelectedOption] = useState<TOption>({ title: "" });
    const [index, setIndex] = useState(-1);
    const singleSelectRef = useRef<any>();

    const changeHandler = (e: any) => {
        setSearch(e.target.value);
    };

    const keyDownHandler = (e: any) => {
        const findOption = props.options.find((item) => item.title === search);
        const findOptionBasedOnIndex = filteredOptions[index];

        switch (true) {
            case e.keyCode === 13 && !!findOption:
                selectOptionHandler(findOption);
                break;
            case e.keyCode === 13 && index > -1:
                if (findOptionBasedOnIndex) selectOptionHandler(findOptionBasedOnIndex);
                break;
            case e.keyCode === 38:
                if (index === -1) {
                    setIndex(filteredOptions.length - 1);
                } else {
                    setIndex((prev) => prev - 1);
                }
                break;
            case e.keyCode === 40:
                if (index === filteredOptions.length - 1) {
                    setIndex(-1);
                } else {
                    setIndex((prev) => prev + 1);
                }
                break;
            default:
                break;
        }
    };

    const selectOptionHandler = (option: TOption) => {
        props.onChange(option);
        setSelectedOption(option);
        setShowOptions(false);
        setSearch("");
        setIndex(-1);
    };

    useEffect(() => {
        if (props.defaultValue) {
            setSelectedOption(props.defaultValue);
        }
    }, [props.defaultValue]);

    useEffect(() => {
        setFilteredOptions(props.options.filter((item) => item.title.includes(search)));
    }, [props.options, search]);

    useOnClickOutside(singleSelectRef, () => {
        setShowOptions(false);
    });

    return (
        <div
            ref={singleSelectRef}
            className={cn(
                `hover:border-secondary-600 relative w-full ${props.defaultValue || selectedOption.title ? "border-secondary-600 bg-transparent" : "border-transparent"} ${props.disabled ? "bg-secondary-100 cursor-not-allowed" : "cursor-pointer"}`,
                props.className,
            )}
        >
            <div
                onClick={() => {
                    if (!props.disabled) setShowOptions(!showOptions);
                }}
                className={`border-1.5 flex h-auto max-h-full min-h-12 w-full items-center gap-2 rounded-[10px] px-3 ${showOptions ? "!border-primary-500 rounded-b-none border-b-0" : "dark:bg-secondary-400"}`}
            >
                <div className="flex flex-1 items-center gap-4">
                    {selectedOption.title && (
                        <span className="text-secondary-900 max-w-[200px] truncate text-[15px]">{selectedOption.title}</span>
                    )}

                    {!selectedOption.title && (
                        <input
                            dir="auto"
                            {...props.inputProps}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                setShowOptions(true);
                            }}
                            onChange={changeHandler}
                            onKeyDown={keyDownHandler}
                            disabled={props.disabled}
                            className={cn(
                                `text-secondary-900 w-full border-0 bg-transparent px-4 text-sm outline-none placeholder:text-left placeholder:text-right focus:border-0 focus:outline-none disabled:cursor-not-allowed`,
                                props.inputProps?.className,
                            )}
                        />
                    )}
                </div>

                <span
                    onClick={() => {
                        if (selectedOption.title && !props.disabled) {
                            setSelectedOption({ title: "" });
                        } else if (!props.disabled) {
                            setShowOptions(!showOptions);
                        }
                    }}
                    className={`hover-transition hover:bg-bg-2 dark:hover:bg-secondary-600 flex size-6 items-center justify-center rounded-full ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <Image
                        src={selectedOption.title ? close : arrow}
                        alt={selectedOption.title ? "close" : "arrow"}
                        className={`hover-transition ${showOptions && !selectedOption.title ? "rotate-180" : ""}`}
                    />
                </span>
            </div>

            {showOptions && (
                <div
                    className={`no-scrollbar border-primary-500 text-secondary-900 border-1.5 dark:bg-secondary-600 absolute z-10 flex h-fit max-h-96 w-full flex-col overflow-y-auto rounded-b-[10px] border-t-0 bg-white shadow-md`}
                >
                    {filteredOptions.length ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option.title}
                                onClick={() => selectOptionHandler(option)}
                                className={`hover:bg-secondary-250 w-full cursor-pointer truncate py-3 last-of-type:rounded-b-[10px] ${filteredOptions.findIndex((item) => item === option) === index ? "bg-secondary-250" : ""} ${selectedOption.title === option.title ? "text-secondary-200 cursor-not-allowed" : ""}`}
                            >
                                <span className={`w-full truncate px-4 text-sm`}>{option.title}</span>
                            </div>
                        ))
                    ) : (
                        <p dir="auto" className="cursor-default px-4 py-3 text-sm">
                            {props.emptySearchText || "آیتمی وجود ندارد."}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleSelect;
