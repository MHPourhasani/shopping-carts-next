import EmptyState from "@/components/EmptyState";
import { ShopInterface } from "@/interfaces/general";
import { Metadata } from "next";
import shopImage from "@/assets/icons/svgs/receipt-page.svg";
import PageHeader from "@/components/PageHeader/PageHeader";
import ShopCardItem from "@/components/Shops/ShopCardItem";
import PATH from "@/utils/path";
import API from "@/utils/api";

export async function generateMetadata(): Promise<Metadata> {
    const shops: ShopInterface[] = await getShops();

    const title = "فروشگاه ها";
    const description = "در این صفحه همه فروشگاه ها قابل مشاهده است.";
    const url = PATH.shops();

    return {
        title: title,
        description: description,
        keywords: shops !== undefined ? shops.map((shop) => shop.name) : [],
        openGraph: { title: title, description: description, url: url },
        twitter: { title: title, description: description, site: url },
        other: { "twitter:url": url },
    };
}

const getShops = async () => {
    try {
        const response = await fetch(API.shop.shops_list(), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (response.ok) {
            const { results } = await response.json();
            return results;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const ShopsPage = async () => {
    const shops: ShopInterface[] = await getShops();

    return (
        <section className="flex w-full flex-1 flex-col items-start gap-4 lg:gap-8">
            <PageHeader title="فروشگاه ها" mobileBackButton={false} desktopBackButton={false} />

            {shops !== undefined && shops.length ? (
                <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
                    {shops.map((item) => (
                        <ShopCardItem key={String(item._id)} shop={item} className="w-full !max-w-full lg:w-auto lg:max-w-max" />
                    ))}
                </div>
            ) : (
                <EmptyState imgSrc={shopImage} title="هیچ فروشگاهی یافت نشد." />
            )}
        </section>
    );
};

export default ShopsPage;
