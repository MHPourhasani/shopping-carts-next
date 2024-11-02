import BestSellers from "@/components/BestSellers/BestSellers";
import Categories from "@/components/Categories/Categories";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/ui/Header/Header";
import MainBanners from "@/components/MainBanners/MainBanners";
import ProductsList from "@/components/Products/ProductsList";
import PATH from "@/utils/path";
import { get } from "@/utils/scripts/api";
import Link from "next/link";
import shopImage from "@/assets/icons/svgs/receipt-page.svg";
import { BannerInterface, BlogInterface, CategoryInterface, ProductInterface, RequestTypeEnum, ShopInterface } from "@/interfaces/general";
import ShopCardItem from "@/components/Shops/ShopCardItem";
import { Metadata } from "next";
import BlogCard from "@/components/Blog/BlogCard";
import API from "@/utils/api";

export async function generateMetadata(): Promise<Metadata> {
    const shops: ShopInterface[] = await getShops({});
    const products: ProductInterface[] = await getProducts({});

    return {
        keywords: [...products.map((item) => (item.tags ? item.tags : "")), ...shops.map((item) => item.name)],
    };
}

const getBanners = async () => {
    return get(API.banners.banners_list())
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data.results;
        });
};

const getCategories = () => {
    return get(API.category.categories_list())
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data.results;
        });
};

const getProducts = async ({ type, limit }: { type?: string; limit?: number }) => {
    return get(API.product.products_list(RequestTypeEnum.SSR) + `?type=${type}&limit=${limit}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data;
        });
};

const getShops = async ({ limit }: { limit?: number }) => {
    try {
        const response = await fetch(API.shop.shops_list() + `?limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        const { results } = await response.json();
        return results;
    } catch (error: any) {
        console.error(error);
    }
};

const getBlogs = async ({ limit }: { limit?: number }) => {
    try {
        const response = await fetch(API.blogs.blogs_list() + `?limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        const { results } = await response.json();
        return results;
    } catch (error: any) {
        console.error(error);
    }
};

export default async function Home() {
    const banners: BannerInterface[] = await getBanners();
    const categories: CategoryInterface[] = await getCategories();
    const bestSellers: ProductInterface[] = await getProducts({ type: "best seller" });
    const shops: ShopInterface[] = await getShops({ limit: 5 });
    const products: ProductInterface[] = await getProducts({ limit: 6 });
    const blogs: BlogInterface[] = await getBlogs({ limit: 5 });

    return (
        <main className="flex w-full flex-1 flex-col items-start gap-6 pb-20 pt-4 2xl:items-center 2xl:justify-center">
            <div className="w-full px-4 lg:hidden">
                <Header />
            </div>

            <MainBanners banners={banners ? banners : []} />
            <Categories categories={categories ? categories : []} />
            <BestSellers products={bestSellers ? bestSellers : []} />

            <section className="mt-4 flex w-full flex-col gap-4">
                <div className="flex w-full items-center justify-between px-4">
                    <h2 className="text-xl font-semibold">فروشگاه ها</h2>
                    <Link
                        href={PATH.shops()}
                        className="hover-transition text-sm text-gray-500 hover:text-primary-100 dark:text-secondary-100"
                    >
                        مشاهده همه
                    </Link>
                </div>

                <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto px-4">
                    {shops.length ? (
                        shops.map((shop) => <ShopCardItem key={String(shop._id)} shop={shop} />)
                    ) : (
                        <EmptyState imgSrc={shopImage} title="هیچ فروشگاهی یافت نشد." />
                    )}
                </div>
            </section>

            <div className="mt-4 flex w-full flex-col gap-4 px-4">
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-xl font-semibold">محصولات</h2>
                    <Link
                        href={PATH.products()}
                        className="hover-transition text-sm text-gray-500 hover:text-primary-100 dark:text-secondary-100"
                    >
                        مشاهده همه
                    </Link>
                </div>
                <ProductsList products={products ? products : []} />
            </div>

            <div className="mt-4 flex w-full flex-col gap-4">
                <div className="flex w-full items-center justify-between px-4">
                    <h2 className="text-xl font-semibold">آخرین بلاگ های منتشر شده</h2>
                    <Link
                        href={PATH.blogs()}
                        className="hover-transition text-sm text-gray-500 hover:text-primary-100 dark:text-secondary-100"
                    >
                        مشاهده همه
                    </Link>
                </div>
                <div className="no-scrollbar flex w-full gap-4 overflow-x-auto px-4 lg:grid lg:grid-cols-3 lg:overflow-hidden">
                    {blogs.map((item) => (
                        <BlogCard
                            key={String(item._id)}
                            link={PATH.singleBlog(item.link)}
                            blog={item}
                            className={`${blogs.length > 1 ? "w-11/12 lg:w-full" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
