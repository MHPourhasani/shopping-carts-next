export enum UserRoleEnum {
    ADMIN = "ADMIN",
    USER = "USER",
    SHOPPER = "SHOPPER",
    AUTHOR = "AUTHOR",
}

export enum PaymentMethodEnum {
    cash = "cash",
    online = "online",
    credit = "credit",
}

export enum OrderStatusEnum {
    DONE,
    PENDING,
    PROCESS,
    REJECT,
}

export enum RequestTypeEnum {
    CSR,
    SSR,
}
