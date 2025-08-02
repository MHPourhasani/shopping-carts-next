"use client";
import ProductOrderCard from "@/features/Orders/components/ProductOrderCard";
import PageHeader from "@/shared/components/PageHeader";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { covertPaymentToPersian, showFullDate, tomanFormat } from "../../../shared/utils/utils";
import Toman from "@/assets/icons/components/Toman";
import OrderPrint from "@/features/Orders/components/Print";
import PrinterIcon from "@/assets/icons/components/Printer";
import JsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/features/Orders/interfaces";

const SingleOrder = ({ order }: { order: IOrder }) => {
    const printRef = useRef(null);
    const fileName = `Order-#${order.invoiceNumber}-${showFullDate(order.createdAt)?.replaceAll("-", "").replaceAll("/", "-").replaceAll(":", "-")}`;

    const printHandler: any = useReactToPrint({
        documentTitle: fileName,
        content: () => printRef.current,
        onBeforeGetContent: () => {
            return Promise.resolve();
        },
        print:
            window.innerWidth < 1024
                ? async () => {
                      const report = new JsPDF("portrait", "mm", "a4", true);

                      report.html(document.getElementById("single-order-print")!).then(() => {
                          report.save("report.pdf");
                      });
                  }
                : undefined,
    });

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title={`سفارش #${order.invoiceNumber}`}>
                <PrinterIcon onClick={printHandler} className="hidden h-auto w-7 cursor-pointer lg:flex" />
            </PageHeader>

            <div className="flex flex-col gap-4">
                <div className="flex flex-1 items-center justify-between">
                    <h2 className="text-lg font-semibold">سفارش</h2>
                    <p>{order.items?.length} محصول</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {/* {order.items?.map((item) => (
                        <ProductOrderCard key={String(item._id)} product={item} />
                    ))} */}
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
                    <span className="flex items-center">
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

            <Button variant="secondary" onClick={printHandler} className="">
                دانلود PDF
            </Button>

            <div className="hidde w-full">
                <OrderPrint ref={printRef} order={order} />
            </div>
        </section>
    );
};

export default SingleOrder;
