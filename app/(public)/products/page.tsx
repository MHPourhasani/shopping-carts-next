import { IProduct } from "@/features/SingleProduct/interface/interface";
import API from "@/shared/libs/endpoints";
import Products from "@/features/Products/components/Products";
import PATH from "@/shared/utils/path";
import { Metadata } from "next";
import { get } from "@/shared/libs/axios";
import { IPaginatedResponse } from "@/shared/interfaces";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
    const products: IProduct[] = await getProducts();
    const productsName = products !== undefined ? products.map((item) => item.name) : [];

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
    const data = await get<IPaginatedResponse<IProduct>>(API.product.products());
    return data.results;
};

const ProductsPage = async () => {
    const products = await getProducts();

    return !!products && !!products.length ? <Products products={products ? products : []} /> : "هیچ محصولی وجود ندارد.";
};

export default ProductsPage;
