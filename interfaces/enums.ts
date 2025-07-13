export enum UserRoleEnum {
    ADMIN = "admin",
    CUSTOMER = "customer",
    AUTHOR = "author",
    SELLER = "seller",
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

export enum PostStatusEnum {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
}
