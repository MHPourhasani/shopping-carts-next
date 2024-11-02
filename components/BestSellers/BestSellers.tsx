"use server";
import Link from "next/link";
import ProductsList from "../Products/ProductsList";

interface Props {
    products: any[];
}

const BestSellers = async ({ products }: Props) => {
    return (
        <section className="mt-4 flex w-full flex-col gap-4 px-4">
            <div className="flex w-full items-center justify-between">
                <h2 className="text-xl font-semibold">Best Sellers</h2>
                <Link
                    href={`/best-sellers`}
                    className="hover-transition text-sm text-gray-500 hover:text-primary-100 dark:text-secondary-100"
                >
                    {/* مشاهده همه */}
                </Link>
            </div>

            <ProductsList products={products ? products : []} />
        </section>
    );
};

export default BestSellers;
