import { forwardRef } from "react";
import ProductOrderCard from "./ProductOrderCard";
import { covertPaymentToPersian, showFullDate, tomanFormat } from "@/shared/utils/utils";
import Toman from "@/assets/icons/components/Toman";
import { IOrder } from "../interfaces";

const OrderPrint = forwardRef(function OrderPrint({ order }: { order: IOrder }, ref: any) {
    return (
        <div id="single-order-print" ref={ref} dir="rtl" className="flex flex-col gap-8 p-8">
            <h1 className="mb-5 text-2xl font-bold">سفارش #{order.invoiceNumber}</h1>

            <div className="flex flex-col gap-4">
                <div className="flex flex-1 items-center justify-between">
                    <h2 className="text-lg font-semibold">سفارش</h2>
                    <p>{order.items.length} محصول</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {order.items.map((item) => (
                        <ProductOrderCard key={String(item.productId)} product={item} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 border-t pt-4">
                <h2 className="text-lg font-semibold">پرداخت</h2>

                <div className="flex items-center justify-between">
                    <span className="text-secondary-500 dark:text-secondary-100">روش پرداخت</span>
                    {covertPaymentToPersian(order.paymentMethod!)}
                </div>

                <div className="flex items-center justify-between gap-2">
                    <span className="text-secondary-500 dark:text-secondary-100">مبلغ پرداخت شده</span>
                    <span className="flex items-center gap-1">
                        {tomanFormat(order.total)}
                        <Toman className="size-4" />
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-secondary-500 dark:text-secondary-100">ایجاد شده در</span>
                    {showFullDate(order.createdAt)}
                </div>

                <div className="flex flex-col gap-4">
                    <span className="text-secondary-500 dark:text-secondary-100">آدرس</span>
                    <p className="truncate">{order.address}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="text-secondary-500 dark:text-secondary-100">توضیحات</span>
                    <p>{order.note ? order.note : "------------"}</p>
                </div>
            </div>
        </div>
    );
});

export default OrderPrint;
