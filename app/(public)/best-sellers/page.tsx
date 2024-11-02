import ProductCardItem from "@/components/Products/ProductCardItem";
import { ProductInterface } from "@/interfaces/general";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import PATH from "@/utils/path";

export async function generateMetadata(): Promise<Metadata> {
    const data: ProductInterface[] = await getData();
    const products = data.filter((product: ProductInterface) => product.tags?.includes("best seller"));
    const productsName = products !== undefined ? products.map((item) => item.name) : [];
    const productsBrand = products !== undefined ? products.map((item) => item.brand) : [];

    const title = "پرفروش ترین ها";
    const description = "در این صفحه همه محصولات قابل مشاهده است.";
    const url = PATH.products();

    return {
        title: title,
        description: description,
        keywords: ["پرفروش ترین ها", "صفحه پرفروش ترین ها", ...productsName, ...productsBrand],
        alternates: { canonical: url },
        openGraph: { title: title, description: description, url: url },
        twitter: { title: title, description: description, site: url },
        other: { "twitter:url": url },
    };
}

const getData = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/products/`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        cache: "no-store",
    });
    const data = await res.json();
    return data;
};

const BestSellersPage = async () => {
    const products = await getData();
    const filteredProducts = products.filter((product: ProductInterface) => product.tags?.includes("best seller"));

    return (
        <section className="flex w-full flex-1 gap-8 lg:min-h-min">
            <div className="flex flex-col gap-4 lg:gap-8">
                <PageHeader title="Best Sellers" />

                <div className="grid w-full grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredProducts.map((product: ProductInterface) => (
                        <ProductCardItem
                            key={product._id.toString()}
                            product={product}
                            href={PATH.singleProduct(product._id.toString(), product.name)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellersPage;
