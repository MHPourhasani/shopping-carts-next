import BestSellers from "@/components/BestSellers/BestSellers";
import Categories from "@/components/Categories/Categories";
import Header from "@/components/ui/Header/Header";
import MainBanners from "@/components/MainBanners/MainBanners";
import ProductsList from "@/components/Products/ProductsList";
import PATH from "@/utils/path";
import { get } from "@/utils/scripts/api";
import Link from "next/link";
import { BannerInterface, BlogInterface, CategoryInterface, ProductInterface, RequestTypeEnum } from "@/interfaces/general";
import { Metadata } from "next";
import BlogCard from "@/components/Blog/BlogCard";
import API from "@/utils/api";

export async function generateMetadata(): Promise<Metadata> {
    const products: ProductInterface[] = await getProducts({});

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

const getCategories = () => {
    return get(API.category.categories_list())
        .then((res) => {
            return res.json();
        })
        .then(({ results }) => {
            return results;
        });
};

const getProducts = async ({ type, limit }: { type?: string; limit?: number }) => {
    return get(API.product.products_list(RequestTypeEnum.SSR) + `?type=${type}&limit=${limit}`)
        .then((res) => {
            return res.json();
        })
        .then(({ results }) => {
            return results;
        });
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
        return results ? results : [];
    } catch (error: any) {
        console.error(error);
    }
};

export default async function Home() {
    const banners: BannerInterface[] = await getBanners();
    const categories: CategoryInterface[] = await getCategories();
    const bestSellers: ProductInterface[] = await getProducts({ type: "best seller" });
    const products: ProductInterface[] = await getProducts({ limit: 6 });
    const blogs: BlogInterface[] = await getBlogs({ limit: 3 });

    return (
        <main className="flex w-full flex-1 flex-col items-start gap-6 pb-20 pt-4 2xl:items-center 2xl:justify-center">
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
                    {blogs.length
                        ? blogs.map((item) => (
                              <BlogCard
                                  key={String(item._id)}
                                  link={PATH.singleBlog(item.link)}
                                  blog={item}
                                  className={`${blogs.length > 1 ? "w-11/12 lg:w-full" : ""}`}
                              />
                          ))
                        : null}
                </div>
            </div>
        </main>
    );
}
