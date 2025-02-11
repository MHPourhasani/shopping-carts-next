"use client";
import Error500 from "@/shared/components/Error500";
import ProductOrderCard from "@/components/Order/ProductOrderCard";
import PageHeader from "@/components/PageHeader/PageHeader";
import { IOrder } from "@/interfaces/general";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { covertPaymentToPersian, showFullDate, tomanFormat } from "../../shared/helper";
import Toman from "@/assets/icons/components/Toman";
import OrderPrint from "@/components/Order/Print";
import PrinterIcon from "@/assets/icons/components/Printer";
import Button from "@/shared/components/common/Button";
import { Margin, Resolution } from "react-to-pdf";
import JsPDF from "jspdf";

const SingleOrder = ({ order }: { order: IOrder }) => {
    const printRef = useRef(null);
    const fileName = `Order-#${order.orderNo}-${showFullDate(order.createdAt!)?.replaceAll("-", "").replaceAll("/", "-").replaceAll(":", "-")}`;

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

    return order.orderNo ? (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title={`سفارش #${order.orderNo}`}>
                <PrinterIcon onClick={printHandler} className="hidden h-auto w-7 cursor-pointer lg:flex" />
            </PageHeader>

            <div className="flex flex-col gap-4">
                <div className="flex flex-1 items-center justify-between">
                    <h2 className="text-lg font-semibold">سفارش</h2>
                    <p>{order.products?.length} محصول</p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    {order.products?.map((item) => <ProductOrderCard key={String(item._id)} product={item} />)}
                </div>
            </div>

            <div className="flex flex-col gap-4 border-t pt-4">
                <h2 className="text-lg font-semibold">پرداخت</h2>

                <div className="flex items-center justify-between">
                    <span className="text-secondary-500 dark:text-secondary-100">روش پرداخت</span>
                    {covertPaymentToPersian(order.payment!.method)}
                </div>

                <div className="flex items-center justify-between gap-2">
                    <span className="text-secondary-500 dark:text-secondary-100">مبلغ پرداخت شده</span>
                    <span className="flex items-center">
                        {tomanFormat(order.pricePaid!)}
                        <Toman className="size-4" />
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-secondary-500 dark:text-secondary-100">ایجاد شده در</span>
                    {showFullDate(order.createdAt!)}
                </div>

                <div className="flex flex-col gap-4">
                    <span className="text-secondary-500 dark:text-secondary-100">آدرس</span>
                    <p className="truncate">{order.address?.address_value}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <span className="text-secondary-500 dark:text-secondary-100">توضیحات</span>
                    <p>{order.description ? order.description : "------------"}</p>
                </div>
            </div>

            <Button variant="Secondary" onClick={printHandler} className="">
                دانلود PDF
            </Button>

            <div className="hidde w-full">
                <OrderPrint ref={printRef} order={order} />
            </div>
        </section>
    ) : (
        <Error500 />
    );
};

export default SingleOrder;
