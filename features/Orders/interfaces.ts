import { PaymentMethodEnum } from "@/interfaces/enums";
import { OrderStatusEnum, PaymentStatusEnum } from "./enums";

export interface IOrderItem {
    productId: string;
    productSnapshot: {
        // اطلاعات snapshot محصول در زمان سفارش (برای حفظ داده‌ها حتی در صورت تغییر محصول)
        name: string;
        sku: string;
        image?: string;
        attributes: { [key: string]: string };
        // می‌توان فیلدهای اضافی مثل برند، توضیحات کوتاه، قیمت پایه و ... هم اضافه کرد اگر لازم باشد
    };
    quantity: number;
    price: number; // قیمت اصلی محصول برای هر واحد (قبل از تخفیف)
    finalPrice: number; // قیمت نهایی هر واحد پس از تخفیف یا تغییرات دیگر
    taxAmount?: number; // مالیات مربوط به این آیتم (اختیاری)
    weight?: number; // وزن محصول برای محاسبه هزینه ارسال (اختیاری)
}

export interface IOrder {
    _id: string;
    userId: string;
    items: IOrderItem[]; // لیست آیتم‌های سفارش با جزئیات snapshot محصول
    discountCode?: string; // کد تخفیف اعمال شده (در صورت وجود)
    discountAmount?: number; // مبلغ تخفیف کل
    subtotal: number; // مجموع قیمت آیتم‌ها بدون مالیات و تخفیف
    tax: number; // مالیات کل سفارش
    total: number; // مبلغ نهایی سفارش بعد از تخفیف و مالیات
    transactionId?: string; // شناسه تراکنش پرداخت
    paymentMethod?: PaymentMethodEnum; // روش پرداخت (مثلاً "online", "cod" و ...)
    paymentStatus?: PaymentStatusEnum; // وضعیت پرداخت
    shippingMethod?: string; // روش ارسال (پیک، تیپاکس، پست و ...)
    shippingCost?: number; // هزینه ارسال
    customerContact?: string; // شماره تلفن یا ایمیل مشتری
    status: OrderStatusEnum; // وضعیت سفارش
    address: string;
    note?: string;
    invoiceNumber?: string; // شماره فاکتور
    deliveryDateEstimate?: Date; // تاریخ تقریبی تحویل کالا
    isPaid?: boolean; // آیا پرداخت کامل انجام شده است یا خیر
    history?: Array<{
        status: OrderStatusEnum;
        changedAt: Date;
        changedBy?: string; // آیدی کاربر یا سیستم که تغییر وضعیت را ایجاد کرده
    }>;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date; // حذف نرم‌افزاری
}
