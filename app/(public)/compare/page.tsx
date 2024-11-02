import PageHeader from "@/components/PageHeader/PageHeader";
import { ProductInterface } from "@/interfaces/general";
import API from "@/utils/api";
import Compare from "@/utils/pages/compare";

interface Props {
    searchParams: { p1: string; p2: string };
}

const getSingleProduct = async (product_id: string) => {
    try {
        const res = await fetch(API.product.single_product(product_id), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        const { product: data } = await res.json();
        return data;
    } catch (error: any) {
        console.error(error.message);
    }
};

const getProducts = async () => {
    try {
        const response = await fetch(API.product.products_list(), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.error(error);
    }
};

const ComparePage = async ({ searchParams }: Props) => {
    const product1: ProductInterface = await getSingleProduct(searchParams.p1);
    const product2: ProductInterface = await getSingleProduct(searchParams.p2);
    const products: ProductInterface[] = await getProducts();
    const props = { product1, product2, products };

    return (
        <section className="flex w-full flex-1 flex-col items-start gap-4 lg:gap-8">
            <PageHeader title="مقایسه محصولات" />

            <Compare {...props} />
        </section>
    );
};

export default ComparePage;
