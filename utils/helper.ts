import { PaymentMethodEnum, UserRoleEnum } from "@/interfaces/general";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

export const capitalizeTheFirstLettersOfWords = (word: string) => {
    if (word) {
        return word
            .split(" ")
            .map((w) => {
                const capitalizeFirstLetter = w.slice(0, 1).toUpperCase();
                const othersLetter = w.slice(1);
                return capitalizeFirstLetter + othersLetter;
            })
            .join(" ");
    }
};

export function isNumber(value: any) {
    return typeof value === "number";
}

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const range = (start: number, end: number, step: number) => {
    const seq = [];

    for (let i = start; i <= end; i += step) {
        seq.push(i);
    }

    return seq;
};

export const handleRefreshAfterBack = () => {
    setTimeout(() => {
        window.location.reload();
    }, 100);
};

export const covertUserRoleToPersian = (role: UserRoleEnum) => {
    switch (true) {
        case role === UserRoleEnum.USER:
            return "کاربر";
        case role === UserRoleEnum.AUTHOR:
            return "نویسنده";
        case role === UserRoleEnum.SHOPPER:
            return "فروشنده";
        case role === UserRoleEnum.ADMIN:
            return "مدیر کل";
        default:
            return "----";
    }
};

export const covertPaymentToPersian = (method: PaymentMethodEnum) => {
    switch (true) {
        case method === PaymentMethodEnum.online:
            return "آنلاین";
        case method === PaymentMethodEnum.cash:
            return "نقدی";
        case method === PaymentMethodEnum.credit:
            return "اعتباری";
        default:
            return "----";
    }
};

export function stringToSlug(str: string) {
    return str
        .trim()
        .toLocaleLowerCase()
        .replace(/\u200C/g, " ")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function tomanFormat(value: string | number) {
    const formatted = new Intl.NumberFormat("fa-IR").format(+value);
    return formatted;
}

export const showFullDate = (date: string | Date | number) => {
    if (date) {
        return new Intl.DateTimeFormat("fa", {
            minute: "numeric",
            hour: "numeric",
            day: "numeric",
            month: "numeric",
            year: "numeric",
        })
            .format(new Date(date))
            .split(", ")
            .join(" - ");
    }
};
