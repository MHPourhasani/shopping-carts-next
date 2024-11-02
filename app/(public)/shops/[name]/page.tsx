import PageHeader from "@/components/PageHeader/PageHeader";
import ProductCardItem from "@/components/Products/ProductCardItem";
import { ProductInterface, ShopInterface } from "@/interfaces/general";
import API from "@/utils/api";
import PATH from "@/utils/path";
import { Metadata } from "next";

interface Props {
    params: { name: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data: { shop: ShopInterface; products: ProductInterface[] } = await getShop(params.name);

    const title = `فروشگاه ${data.shop.name}`;
    const description = data.shop.description;
    const url = PATH.singleShop(params.name);

    return {
        title: title,
        description: description,
        alternates: { canonical: PATH.singleShop(params.name) },
        openGraph: { title: title, description: description, url: url },
        twitter: { title: title, description: description, site: url },
        other: { "twitter:url": url },
    };
}

const getShop = async (name: string) => {
    try {
        const response = await fetch(API.shop.single_shop(name), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const SingleShopPage = async ({ params }: Props) => {
    const data: { shop: ShopInterface; products: ProductInterface[] } = await getShop(params.name);
    const { name, createdAt, phone_number, description } = data.shop;

    const information = [
        { title: "شروع فعالیت", data: new Date(createdAt).toLocaleDateString("fa-IR") },
        { title: "شماره تماس", data: phone_number ? phone_number : "-------" },
        { title: "تعداد محصولات", data: data.products ? data.products.length : "--" },
        { title: "توضیحات", data: description ? description : "توضیحی وجود ندارد." },
    ];

    return (
        <section className="flex w-full flex-1 flex-col gap-8">
            <PageHeader title={`فروشگاه "${name}"`} desktopBackButton={false} />

            <section className="flex w-full flex-col gap-6 md:gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16 xl:gap-24">
                <div className="flex flex-col gap-4 rounded-xl p-4 dark:bg-secondary-700 lg:w-1/4 lg:bg-bg-2">
                    <h2 className="mb-4 hidden font-semibold lg:block lg:text-2xl">اطلاعات فروشگاه</h2>

                    {information.map((item) => (
                        <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-8">
                            <h2 className="text-gray-500 dark:text-gray-300">{item.title}</h2>
                            <p>{item.data}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4 lg:flex-1 lg:gap-8 lg:pt-4">
                    <h2 className="text-lg font-semibold lg:text-2xl">محصولات</h2>

                    {data.products?.length ? (
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {data.products.map((product) => (
                                <ProductCardItem
                                    key={product._id.toString()}
                                    product={product}
                                    href={PATH.singleProduct(product._id.toString(), product.name)}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="lg:text-lg">هیچ محصولی وجود ندارد.</p>
                    )}
                </div>
            </section>
        </section>
    );
};

export default SingleShopPage;
