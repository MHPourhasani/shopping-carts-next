export enum OrderStatusEnum {
    PENDING = "pending", // سفارش ثبت شده ولی هنوز پرداخت نشده
    PROCESSING = "processing", // پرداخت شده، در حال آماده‌سازی
    SHIPPED = "shipped", // ارسال شده
    CANCELLED = "cancelled", // لغو شده توسط کاربر یا مدیر
    FAILED = "failed", // پرداخت ناموفق یا خطای سیستمی
    RETURN_REQUESTED = "return_requested", // درخواست مرجوعی توسط کاربر
    RETURNED = "returned", // مرجوع شده و تأیید شده
    REFUNDED = "refunded", // مبلغ سفارش بازپرداخت شده
}

export enum PaymentStatusEnum {
    PENDING = "pending",
    PAID = "paid",
    FAILED = "failed",
}
