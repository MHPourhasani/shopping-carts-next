import { IProduct } from "@/interfaces/general";
import API from "@/shared/api";
import Products from "@/utils/pages/products/products";
import PATH from "@/shared/path";
import { Metadata } from "next";

export const revalidate = 30;
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
    const products: IProduct[] = await getProducts();
    const productsName = products !== undefined ? products.map((item) => item.name) : [];
    const productsBrand = products !== undefined ? products.map((item) => item.brand) : [];

    const title = "محصولات";
    const description = "در این صفحه همه محصولات قابل مشاهده است.";
    const url = PATH.products();

    return {
        title: title,
        description: description,
        keywords: [...productsName, ...productsBrand],
        alternates: { canonical: url },
        openGraph: { title: title, description: description, url: url },
        twitter: { title: title, description: description, site: url },
        other: { "twitter:url": url },
    };
}

const getProducts = async () => {
    try {
        const response = await fetch(API.product.products_list(), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (response.ok) {
            const { results } = await response.json();
            return results;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const ProductsPage = async () => {
    const products = await getProducts();

    return products !== undefined ? <Products products={products ? products : []} /> : "هیچ محصولی وجود ندارد.";
};

export default ProductsPage;
