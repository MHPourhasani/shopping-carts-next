import BestSellers from "@/components/BestSellers/BestSellers";
import Categories from "@/features/HomePage/components/Categories";
import Header from "@/components/ui/Header/Header";
import MainBanners from "@/features/HomePage/components/MainBanners";
import ProductsList from "@/features/SingleProductPage/components/ProductsList";
import PATH from "@/shared/path";
import { get } from "@/shared/apiCaller";
import Link from "next/link";
import { IBanner, IBlog, ICategory, IProduct } from "@/interfaces/general";
import { Metadata } from "next";
import BlogCard from "@/features/Blog/components/BlogCard";
import API from "@/shared/api";

export const revalidate = 30;
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
    const products: IProduct[] = await getProducts({});

    return {
        keywords: [...products.map((item) => (item.tags ? item.tags : ""))],
    };
}

const getBanners = async () => {
    return get(API.banners.banners_list())
        .then((res) => {
            return res.json();
        })
        .then(({ results }) => {
            return results;
        });
};

const getCategories = async () => {
    const res = await get(API.category.categories_list());
    const { results } = await res.json();
    return results;
};

const getProducts = async ({ limit }: { limit?: number }) => {
    console.log(API.product.products_list() + `?limit=${limit}`)
    return get(API.product.products_list() + `?limit=${limit}`)
        .then((res) => {
            return res.json();
        })
        .then(({ results }) => {
            return results;
        });
};

const getBlogs = async () => {
    try {
        const response = await fetch(API.blogs.blogs_list() + "?limit=3", {
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
    const banners: IBanner[] = await getBanners();
    const categories: ICategory[] = await getCategories();
    const bestSellers: IProduct[] = await getProducts({});
    const products: IProduct[] = await getProducts({ limit: 6 });
    const blogs: IBlog[] = await getBlogs();

    return (
        <section className="flex w-full flex-1 flex-col items-start gap-6 pb-20 pt-4 2xl:items-center 2xl:justify-center">
            <div className="w-full px-4 lg:hidden">
                <Header />
            </div>
            <MainBanners banners={banners ? banners : []} />
            <Categories categories={categories ? categories : []} />
            <BestSellers products={bestSellers ? bestSellers : []} />

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

            {blogs && blogs.length ? (
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
            ) : null}
        </section>
    );
}
