import ArrowLeft from "@/assets/icons/components/ArrowLeft";
import ReceiptIcon from "@/assets/icons/components/Receipt";
import { OrderInterface } from "@/interfaces/general";

import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface Props {
    order: OrderInterface;
    href: Url;
}

const OrderCardItem = ({ order, href }: Props) => {
    return (
        <Link
            href={href}
            className="grid w-full grid-cols-11 items-center justify-between gap-2 rounded-xl bg-bg-2 p-4 dark:bg-secondary-700 dark:lg:bg-secondary-600"
        >
            <div className="col-span-4 flex w-full flex-1 items-center gap-4">
                <span className="flex aspect-square h-12 items-center justify-center rounded-full bg-primary-50 stroke-primary-100 p-1.5">
                    <ReceiptIcon />
                </span>
                <div>
                    <p className="mb-2 truncate whitespace-pre-line font-bold">سفارش #{order.orderNo}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-300">{order.products.length} محصول</p>
                </div>
            </div>

            <span className="col-span-2 mb-2 truncate whitespace-pre-line font-bold">
                {new Date(order.createdAt).toLocaleDateString("fa-IR")}
            </span>
            <span className="col-span-2 text-sm text-gray-400 dark:text-gray-300">{order.products.length} محصول</span>
            <span className="col-span-2 text-sm text-gray-400 dark:text-gray-300">{order.products.length}</span>

            <ArrowLeft className="h-auto w-6 stroke-secondary-400 dark:stroke-secondary-100" />
        </Link>
    );
};

export default OrderCardItem;
