import AddAndEditProduct from "@/features/SingleProductPage/components/AddAndEditProduct";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import { get } from "@/shared/libs/api/client";
import API from "@/shared/libs/api/endpoints";
import { Metadata } from "next";

interface Params {
    id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const product = await get<IProduct>(API.product.single_product(params.id));

    return { title: `ویرایش محصول ${product.name}` };
}

const getSingleProduct = async (product_id: string) => {
    try {
        const data = await get<IProduct>(API.product.single_product(product_id));
        return data;
    } catch (error: any) {
        console.error(error.message);
    }
};

const EditProductPage = async ({ params }: { params: Params }) => {
    const product = await getSingleProduct(params.id);

    return <AddAndEditProduct isEdit initialData={product} productId={params.id} />;
};

export default EditProductPage;
