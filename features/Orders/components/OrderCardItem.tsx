import ArrowLeft from "@/assets/icons/components/ArrowLeft";
import ReceiptIcon from "@/assets/icons/components/Receipt";
import { IUser } from "@/features/auth/interfaces";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { IOrder } from "../interfaces";

interface Props {
    order: IOrder;
    href: Url;
}

const OrderCardItem = ({ order, href }: Props) => {
    return (
        <Link
            href={href}
            className="bg-bg-2 dark:bg-secondary-700 dark:lg:bg-secondary-600 grid w-full grid-cols-11 items-center justify-between gap-2 rounded-xl p-4"
        >
            <div className="col-span-4 flex w-full flex-1 items-center gap-4">
                <span className="bg-primary-50 stroke-primary-100 flex aspect-square h-12 items-center justify-center rounded-full p-1.5">
                    <ReceiptIcon />
                </span>
                <div>
                    <p className="mb-2 truncate font-bold whitespace-pre-line">سفارش #{order.invoiceNumber}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-300">{order.items.length} محصول</p>
                </div>
            </div>

            <span className="col-span-2 truncate">{new Date(order.createdAt).toLocaleDateString("fa-IR")}</span>
            <span className="col-span-2 flex gap-1 truncate text-sm text-gray-400 dark:text-gray-300">
                {/* {user.first_name ?? ""}
                {user.last_name ?? ""} */}
            </span>
            <span className="col-span-2 text-sm text-gray-400 dark:text-gray-300">{order.items.length}</span>

            <ArrowLeft className="stroke-secondary-400 dark:stroke-secondary-100 h-auto w-6" />
        </Link>
    );
};

export default OrderCardItem;
