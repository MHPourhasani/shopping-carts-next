import ProductForm from "@/features/SingleProductPage/components/ProductForm";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import { get } from "@/shared/libs/api/axios";
import API from "@/shared/libs/api/endpoints";
import { Metadata } from "next";

interface Params {
    slug: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const product = await getSingleProduct(params.slug);

    return { title: `ویرایش محصول ${product.name}` };
}

const getSingleProduct = async (product_id: string) => {
    const data = await get<IProduct>(API.product.single_product(product_id));
    return data;
};

const EditProductPage = async ({ params }: { params: Params }) => {
    const product = await getSingleProduct(params.slug);

    return <ProductForm isEdit initialData={product} productId={params.slug} />;
};

export default EditProductPage;
