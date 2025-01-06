import Error500 from "@/components/Error500";
import { ProductInterface } from "@/interfaces/general";
import API from "@/utils/api";
import SingleProduct from "@/utils/pages/products/singleProduct";
import { Metadata } from "next";

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
        keywords: data?.tags?.split(","),
        openGraph: { title: title, description: description },
        twitter: { title: title, description: description },
    };
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
    const product: ProductInterface = await getSingleProduct(params.slug);
    const reviews = await getReviews(params.slug);

    return product !== undefined ? <SingleProduct product={product} reviews={reviews} /> : <Error500 />;
};

export default SingleProductPage;
