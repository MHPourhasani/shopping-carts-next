import CloseIcon from "@/assets/icons/components/Close";
import useOnClickOutside from "@/shared/hooks/useOnClickOutside";
import { cn } from "@/shared/utils/utils";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import ArrowDownIcon from "@/assets/icons/components/ArrowDown";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

type TOption = { id?: string | number; title: string; color?: string; icon?: string; image?: string };

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface MultiSelectProps {
    defaultValues?: TOption[];
    inputProps?: InputProps;
    options: TOption[];
    onChange: (selectedOption: TOption[]) => void;
    emptySearchText?: string;
    disabled?: boolean;
    className?: string;
}

const MultiSelect = (props: MultiSelectProps) => {
    const [search, setSearch] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<TOption[]>(
        props.options.map((item) => {
            return { ...item, selected: false };
        }),
    );
    const [selectedOptions, setSelectedOptions] = useState<TOption[]>(props.defaultValues ? props.defaultValues : []);
    const [index, setIndex] = useState(-1);
    const multiSelectRef = useRef<any>();

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
        if (selectedOptions.find((item) => item.title === option.title)) {
            props.onChange([...new Set(selectedOptions.filter((item) => item.title !== option.title))]);
            setSelectedOptions([...new Set(selectedOptions.filter((item) => item.title !== option.title))]);
        } else {
            props.onChange([...new Set([...selectedOptions, option])]);
            setSelectedOptions([...new Set([...selectedOptions, option])]);
        }
        setSearch("");
        setIndex(-1);
    };

    useEffect(() => {
        setFilteredOptions(props.options.filter((item) => item.title.includes(search)));
    }, [props.options, search]);

    useOnClickOutside(multiSelectRef, () => {
        setShowOptions(false);
    });

    return (
        <div
            ref={multiSelectRef}
            className={cn(
                `hover:border-secondary-600 dark:border-secondary-400 relative w-full max-w-full ${selectedOptions.length ? "bg-transparent" : "border-transparent"} ${props.disabled ? "bg-secondary-100 cursor-not-allowed" : "cursor-pointer"}`,
                props.className,
            )}
        >
            <div
                onClick={() => {
                    if (!props.disabled) setShowOptions(!showOptions);
                }}
                className={`flex min-h-12 w-full items-center gap-2 rounded-xl border-[1.5px] px-3 py-2 ${showOptions ? "rounded-b-none border-b-0" : "bg-secondary-50 dark:border-secondary-400 dark:bg-secondary-700 dark:lg:bg-secondary-500"}`}
            >
                <div className="flex w-full max-w-full flex-1 flex-wrap items-center gap-2">
                    {!!selectedOptions.length &&
                        selectedOptions.map((item) => (
                            <div
                                key={item.title}
                                className="bg-secondary-100 text-secondary-800 dark:bg-secondary-300 flex w-auto max-w-[200px] cursor-default items-center justify-between gap-4 rounded-md px-2 py-1"
                            >
                                <span className="flex items-center gap-2">
                                    {item.icon && <Image src={item.icon} alt={item.title} width={50} height={50} className="size-5" />}
                                    {item.image && (
                                        <Image src={item.image} alt={item.title} width={60} height={60} className="size-6 rounded" />
                                    )}
                                    {item.color && (
                                        <div style={{ backgroundColor: item.color }} className="aspect-square size-5 rounded-full" />
                                    )}
                                    <p dir="auto" className="dark:text-secondary-100 max-w-[200px] truncate">
                                        {item.title}
                                    </p>
                                </span>
                                <CloseIcon
                                    onClick={() => selectOptionHandler(item)}
                                    className={`size-3 cursor-pointer fill-[#A0A3BD] transition-all ease-out hover:fill-red-600 ${props.disabled ? "!cursor-not-allowed" : ""}`}
                                />
                            </div>
                        ))}

                    <input
                        {...props.inputProps}
                        onClick={(e: any) => {
                            e.stopPropagation();
                            setShowOptions(true);
                        }}
                        value={search}
                        onChange={changeHandler}
                        onKeyDown={keyDownHandler}
                        disabled={props.disabled}
                        className={cn(
                            `text-secondary-800 dark:text-secondary-100 min-w-[250px] flex-1 border-0 bg-transparent px-4 text-sm outline-none placeholder:text-right focus:border-0 focus:outline-none disabled:cursor-not-allowed ltr:placeholder:text-left`,
                            props.inputProps?.className,
                        )}
                    />
                </div>

                <span
                    onClick={() => {
                        if (!props.disabled) setShowOptions(!showOptions);
                    }}
                    className={`hover-transition hover:bg-secondary-100 dark:bg-secondary-600 flex size-6 items-center justify-center rounded-full ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <ArrowDownIcon
                        className={`hover-transition stroke-secondary-600 dark:stroke-secondary-100 ${showOptions ? "rotate-180" : ""}`}
                    />
                </span>
            </div>

            {showOptions && (
                <div
                    className={`no-scrollbar border-primary-500 text-secondary-800 dark:bg-secondary-600 absolute z-10 flex h-fit max-h-96 w-full flex-col overflow-y-auto rounded-b-[10px] border-[1.5px] border-t-0 bg-white shadow-md`}
                >
                    {filteredOptions.length ? (
                        filteredOptions.map((option) => (
                            <span
                                key={option.title}
                                onClick={() => selectOptionHandler(option)}
                                className={`hover:bg-secondary-100 dark:hover:bg-secondary-500 flex w-full cursor-pointer items-center px-4 py-3 text-sm ${filteredOptions.findIndex((item) => item === option) === index ? "bg-secondary-100 dark:bg-secondary-300" : ""}`}
                            >
                                <Checkbox
                                    checked={!!selectedOptions.find((item) => item.title === option.title)}
                                    // label={option.title}
                                />
                                <span>
                                    {option.icon && (
                                        <Image src={option.icon} alt={option.title} width={50} height={50} className="size-5" />
                                    )}
                                    {option.image && (
                                        <Image src={option.image} alt={option.title} width={70} height={70} className="size-7 rounded" />
                                    )}
                                    {option.color && (
                                        <div style={{ backgroundColor: option.color }} className="aspect-square size-5 rounded-full" />
                                    )}
                                </span>
                            </span>
                        ))
                    ) : (
                        <p dir="auto" className="dark:text-secondary-100 cursor-default px-4 py-3 text-sm">
                            {props.emptySearchText || "هیچ موردی یافت نشد."}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
