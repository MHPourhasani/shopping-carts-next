import PageHeader from "@/shared/components/PageHeader";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import API from "@/shared/libs/api/endpoints";
import Compare from "@/features/Compare/components/compare";

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
        const { result } = await res.json();
        return result;
    } catch (error: any) {
        console.error(error.message);
    }
};

const getProducts = async () => {
    try {
        const response = await fetch(API.product.products(), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        const { results } = await response.json();
        return results;
    } catch (error: any) {
        console.error(error);
    }
};

const ComparePage = async ({ searchParams }: Props) => {
    const product1: IProduct = await getSingleProduct(searchParams.p1);
    const product2: IProduct = await getSingleProduct(searchParams.p2);
    const products: IProduct[] = await getProducts();
    const props = { product1, product2, products };

    return (
        <section className="container flex w-full flex-1 flex-col items-start gap-4 lg:gap-8">
            <PageHeader title="مقایسه محصولات" desktopBackButton={false} />

            <Compare {...props} />
        </section>
    );
};

export default ComparePage;
