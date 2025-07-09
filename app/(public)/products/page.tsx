import { IProduct } from "@/features/SingleProductPage/interface/product.interface";
import API from "@/shared/api";
import Products from "@/features/ProductsPage/components/products";
import PATH from "@/shared/path";
import { Metadata } from "next";
import { get } from "@/shared/apiCaller";

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
        keywords: [...productsName],
        alternates: { canonical: url },
        openGraph: { title: title, description: description, url: url },
        twitter: { title: title, description: description, site: url },
        other: { "twitter:url": url },
    };
}

const getProducts = async () => {
    return get(API.product.products_list())
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data.results;
        });
};

const ProductsPage = async () => {
    const products = await getProducts();

    return !!products && !!products.length ? <Products products={products ? products : []} /> : "هیچ محصولی وجود ندارد.";
};

export default ProductsPage;
