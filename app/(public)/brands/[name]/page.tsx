import PageHeader from "@/components/PageHeader/PageHeader";
import ProductCardItem from "@/components/Products/ProductCardItem";
import { ProductInterface } from "@/interfaces/general";
import { capitalizeTheFirstLettersOfWords } from "@/utils/helper";
import PATH from "@/utils/path";
import { Metadata } from "next";

interface Props {
    params: {
        name: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { name } = params;
    const brandName = name?.slice(0, 1)[0].toUpperCase() + name?.slice(1);

    const title = "محصولات " + brandName;
    const description = `در این صفحه محصولات مربوط به دسته بندی  ${brandName} قابل مشاهده است.`;
    const url = PATH.singleBrand(params.name);

    return {
        title: title,
        description: description,
        openGraph: { title: title, description: description, url: url },
        twitter: { title: title, description: description, site: url },
        other: {
            "twitter:url": url,
        },
    };
}

async function getData(params: string) {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/products/${params}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (res.ok) {
            const { results } = await res.json();
            return results;
        }
    } catch (error) {
        console.error(error);
    }
}

export default async function Brands({ params }: Props) {
    const productsData = await getData(params.name);

    return (
        <section className="flex w-full flex-1 flex-col gap-4 lg:min-h-min">
            <PageHeader title={`برند ${capitalizeTheFirstLettersOfWords(params.name)}`} />

            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {productsData.length
                    ? productsData.map((product: ProductInterface) => {
                          return (
                              <ProductCardItem
                                  key={product._id.toString()}
                                  product={product}
                                  href={PATH.singleProduct(product._id.toString(), product.name)}
                              />
                          );
                      })
                    : null}
            </div>
        </section>
    );
}
