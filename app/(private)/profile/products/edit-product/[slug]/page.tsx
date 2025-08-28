import ProductForm from "@/features/SingleProduct/components/ProductForm";
import { IProduct } from "@/features/SingleProduct/interface/interface";
import { get } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";
import { Metadata } from "next";

interface Params {
    slug: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const product = await getSingleProduct(params.slug);

    return { title: `ویرایش محصول ${product.name}` };
}

const getSingleProduct = async (product_id: string) => {
    const data = await get<IProduct>(API.product.singleProduct(product_id));
    return data;
};

const EditProductPage = async ({ params }: { params: Params }) => {
    const product = await getSingleProduct(params.slug);

    return <ProductForm initialData={product} />;
};

export default EditProductPage;
