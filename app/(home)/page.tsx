import BestSellers from "@/features/ProductsPage/components/BestSellers";
import Categories from "@/features/HomePage/components/Categories";
import Header from "@/features/Layout/components/Header/Header";
import MainBanners from "@/features/HomePage/components/MainBanners";
import ProductsList from "@/features/SingleProductPage/components/ProductsList";
import PATH from "@/shared/utils/path";
import Link from "next/link";
import { Metadata } from "next";
import PostCard from "@/features/Blog/components/PostCard";
import API from "@/shared/libs/api/endpoints";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import { get } from "@/shared/libs/api/axios";
import { IPaginatedResponse } from "@/shared/interfaces";
import { IPost } from "@/features/Blog/interfaces";

export const revalidate = 30;
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
    return {
        // keywords: products.map((item) => (item.tags ?? "")),
    };
}

const getBanners = async () => {
    // const data = await get<IBanner[]>(API.banners.banners_list());
    return [];
};

const getCategories = async () => {
    // const data = await get<ICategory[]>(API.category.categories_list());
    return [];
};

const getProducts = async () => {
    const data = await get<IPaginatedResponse<IProduct>>(API.product.products(), { limit: 3 });
    return data.results;
};

const getBlogs = async () => {
    const data = await get<IPaginatedResponse<IPost>>(API.blogs.posts());
    return data.results;
};

export default async function Home() {
    const banners = await getBanners();
    const categories = await getCategories();
    const bestSellers = await getProducts();
    const products = await getProducts();
    const blogs = await getBlogs();

    return (
        <section className="flex w-full flex-1 flex-col items-start gap-6 pt-4 pb-20 2xl:items-center 2xl:justify-center">
            <div className="w-full lg:hidden">
                <Header />
            </div>
            <MainBanners banners={banners ? banners : []} />
            <Categories categories={categories ? categories : []} />
            <BestSellers products={bestSellers ? bestSellers : []} />

            <div className="container mt-4 flex w-full flex-col gap-4">
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-xl font-semibold">محصولات</h2>
                    <Link
                        href={PATH.products()}
                        className="hover-transition hover:text-primary-100 dark:text-secondary-100 text-sm text-gray-500"
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
                            className="hover-transition hover:text-primary-100 dark:text-secondary-100 text-sm text-gray-500"
                        >
                            مشاهده همه
                        </Link>
                    </div>
                    <div className="no-scrollbar flex w-full gap-4 overflow-x-auto px-4 lg:grid lg:grid-cols-3 lg:overflow-hidden">
                        {blogs.map((item) => (
                            <PostCard key={String(item._id)} post={item} className={`${blogs.length > 1 ? "w-11/12 lg:w-full" : ""}`} />
                        ))}
                    </div>
                </div>
            ) : null}
        </section>
    );
}
