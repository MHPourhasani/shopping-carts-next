import AddAndEditProduct from "@/features/SingleProductPage/components/AddAndEditProduct";
import { IProduct } from "@/features/SingleProductPage/interface/product.interface";
import API from "@/shared/api";
import { Metadata } from "next";

interface Params {
    id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const product: IProduct = await getSingleProduct(params.id);

    return { title: `ویرایش محصول ${product.name}` };
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
        if (res.ok) {
            const { product: data } = await res.json();
            return data;
        }
    } catch (error: any) {
        console.error(error.message);
    }
};

const EditProductPage = async ({ params }: { params: Params }) => {
    const product: IProduct = await getSingleProduct(params.id);

    return <AddAndEditProduct isEdit product={product} />;
};

export default EditProductPage;
