import { ShopInterface } from "@/interfaces/general";
import PATH from "@/utils/path";
import Image from "next/image";
import Link from "next/link";

interface Props {
    shop: ShopInterface;
    className?: string;
}

const ShopCardItem = ({ shop, className }: Props) => {
    return (
        <Link
            href={PATH.singleShop(shop.name)}
            className={`flex w-full items-center gap-2 rounded-xl border p-2 lg:gap-4 lg:p-4 lg:dark:bg-secondary-700 ${shop.logo ? "max-w-80" : "max-w-60"} ${className}`}
        >
            {shop.logo && <Image src={shop.logo} alt={shop.name} width={200} height={200} className="size-20 rounded-lg lg:size-28" />}
            <span className="flex w-full flex-col items-start justify-between gap-4 lg:text-lg">
                <h4 className="truncate lg:font-semibold">{shop.name}</h4>
                {shop.description && <p className="w-full truncate text-gray-400 dark:text-gray-300">{shop.description}</p>}
            </span>
        </Link>
    );
};

export default ShopCardItem;
