import Error500 from "@/shared/components/Error500";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import API from "@/shared/libs/endpoints";
import { Metadata } from "next";
import { SingleProductProvider } from "@/features/SingleProductPage/context/ProductData";
import SingleProduct from "@/features/SingleProductPage/components/singleProduct";
import { get } from "@/shared/libs/axios";

export const revalidate = 30;
export const dynamic = "force-static";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params;
    const data = await getSingleProduct(slug);
    const product_name = data?.name.slice(0, 1)[0].toUpperCase() + data?.name.slice(1);

    const title = product_name;
    const description = data?.description ? data.description : "";

    return {
        title: title,
        description: description,
        keywords: data?.tags,
        openGraph: { title: title, description: description },
        twitter: { title: title, description: description },
    };
}

const getSingleProduct = async (slug: string) => {
    const product = await get<IProduct>(API.product.singleProduct(slug));
    return product;
};

const getReviews = async (product_id: string) => {
    try {
        const response = await fetch(API.product.reviews(product_id), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const { reviews } = await response.json();
            return reviews;
        }
    } catch (error: any) {
        console.error(error.message);
    }
};

const SingleProductPage = async ({ params }: Props) => {
    const product = await getSingleProduct(params.slug);
    const reviews = await getReviews(params.slug);

    return product !== undefined ? (
        <SingleProductProvider initialData={{ product, reviews }}>
            <SingleProduct />
        </SingleProductProvider>
    ) : (
        <Error500 />
    );
};

export default SingleProductPage;
