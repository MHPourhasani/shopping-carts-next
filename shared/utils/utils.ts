import { UserRoleEnum } from "@/features/Auth/enums";
import { PaymentMethodEnum } from "@/interfaces/enums";

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
        case role === UserRoleEnum.CUSTOMER:
            return "مشتری";
        case role === UserRoleEnum.AUTHOR:
            return "نویسنده";
        case role === UserRoleEnum.SELLER:
            return "فروشنده";
        case role === UserRoleEnum.ADMIN:
            return "مدیر کل";
        default:
            return "کاربر";
    }
};

export const covertUserRoleToUserRoleEnum = (role: string) => {
    switch (true) {
        case role === "کاربر":
            return UserRoleEnum.CUSTOMER;
        case role === "نویسنده":
            return UserRoleEnum.AUTHOR;
        case role === "فروشنده":
            return UserRoleEnum.SELLER;
        case role === "مدیر کل":
            return UserRoleEnum.ADMIN;
        default:
            return UserRoleEnum.CUSTOMER;
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
