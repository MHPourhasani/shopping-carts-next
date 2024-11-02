"use client";
import Error500 from "@/components/Error500";
import ProductOrderCard from "@/components/Order/ProductOrderCard";
import PageHeader from "@/components/PageHeader/PageHeader";
import { OrderInterface, UserRoleEnum } from "@/interfaces/general";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { covertPaymentToPersian, showFullDate, tomanFormat } from "../helper";
import Toman from "@/assets/icons/components/Toman";
import OrderPrint from "@/components/Order/Print";
import PrinterIcon from "@/assets/icons/components/Printer";
import Button from "@/components/common/Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SingleOrder = ({ data }: { data: OrderInterface }) => {
    const [order, setOrder] = useState<Partial<OrderInterface>>(data ? data : {});
    const [isLoading, setIsLoading] = useState(false);
    const userState = useAppSelector((state: any) => state.auth.user);
    const shopState = useAppSelector((state: any) => state.shop.shop);
    const params = useParams();
    const printRef = useRef(null);

    const printHandler: any = useReactToPrint({
        documentTitle: `Order-#${order.orderNo}-${showFullDate(order.createdAt!)?.replaceAll("-", "").replaceAll("/", "-").replaceAll(":", "-")}`,
        content: () => printRef.current,
        onBeforeGetContent: () => {
            return Promise.resolve();
        },
        print:
            window.innerWidth < 1024
                ? async () => {
                      handleDownloadPDF();
                  }
                : undefined,
    });

    useEffect(() => {
        if (!data.orderNo && shopState && userState && userState.role !== UserRoleEnum.USER) {
            (async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(`/api/orders/${params.id}?shop_id=${shopState._id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        cache: "no-store",
                    });
                    const data = await response.json();

                    if (response.ok) {
                        setOrder(data);
                        setIsLoading(false);
                    }
                } catch (error: any) {
                    console.error(error);
                }
            })();
        }
    }, [shopState, userState, data]);

    const handleDownloadPDF = () => {
        const input = document.getElementById("single-order-print");
        // Specify the id of the element you want to convert to PDF
        html2canvas(input!).then((canvas) => {
            let imgWidth = 208;
            let imgHeight = (canvas.height * imgWidth) / canvas.width;
            const imgData = canvas.toDataURL("img/png");
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(
                `Order-#${order.orderNo}-${showFullDate(order.createdAt!)?.replaceAll("-", "").replaceAll("/", "-").replaceAll(":", "-")}`,
            );
            // Specify the name of the downloaded PDF file
        });
    };

    return !isLoading ? (
        order.orderNo ? (
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
                        {order.products?.map((item: any) => <ProductOrderCard key={String(item._id)} product={item} />)}
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
                        <span className="flex items-center gap-2">
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

                <div className="hidden">
                    <OrderPrint ref={printRef} order={order} />
                </div>
            </section>
        ) : (
            <Error500 />
        )
    ) : (
        "در حال بارگزاری..."
    );
};

export default SingleOrder;
