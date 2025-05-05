"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import notProductSearchFound from "@/assets/icons/svgs/search-illustration.svg";
import ProductCardItem from "@/features/SingleProductPage/components/ProductCardItem";
import EmptyState from "@/shared/components/EmptyState";
import SearchIcon from "@/assets/icons/components/Search";
import PATH from "@/shared/path";
import Input from "@/shared/components/common/Input";
import { IBlog } from "@/interfaces/general";
import CloseIcon from "@/assets/icons/components/Close";
import API from "@/shared/api";
import BlogCard from "@/features/Blog/components/BlogCard";
import { IProduct } from "@/features/SingleProductPage/interface/product.interface";

const Search = () => {
    const [data, setData] = useState<{
        count: number;
        results: { products: IProduct[]; blogs: IBlog[] };
    }>({
        count: 0,
        results: { products: [], blogs: [] },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const searchParams = useSearchParams().get("q");
    const router = useRouter();

    useEffect(() => {
        getResults(searchParams || "");
    }, []);

    useEffect(() => {
        setSearchValue(searchParams ? searchParams : "");
    }, [searchParams]);

    const getResults = async (value: string) => {
        setIsLoading(true);
        const res = await fetch(API.search(value), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
    };

    const changeHandler = (e: any) => {
        setSearchValue(e.target.value);
    };

    const searchHandler = (e: any) => {
        if (e.keyCode === 13) {
            router.push(`${PATH.search()}?q=${searchValue}`);
            getResults(searchValue);
        }
    };

    return (
        <>
            <div className="flex w-full flex-col gap-4">
                <span className="relative flex h-12 w-full flex-col items-center">
                    <SearchIcon
                        onClick={searchHandler}
                        style={{ right: "16px" }}
                        className="absolute top-1/4 z-[1] h-auto w-5 cursor-pointer stroke-secondary-700 dark:stroke-secondary-100"
                    />
                    <Input
                        autoFocus
                        placeholder="جست و جو ..."
                        value={searchValue}
                        onChange={changeHandler}
                        onKeyDown={searchHandler}
                        style={{ paddingRight: "40px", paddingLeft: "40px" }}
                        inputClassName="!px-10 text-sm dark:bg-secondary-700 dark:lg:bg-secondary-600"
                    />
                    <CloseIcon
                        onClick={() => {
                            setSearchValue("");
                            router.push(`${PATH.search()}?q=`);
                            getResults("");
                        }}
                        style={{ left: "16px" }}
                        className="absolute top-1/4 h-auto w-5 translate-x-20 cursor-pointer fill-secondary-700 dark:fill-secondary-100"
                    />
                </span>

                {isLoading ? "در حال جست و جو..." : <p>{data.count ? `${data.count} نتیجه یافت شد.` : "هیچ نتیجه ای یافت نشد."}</p>}
            </div>

            <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">محصولات</h2>

                {!isLoading ? (
                    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {data.results.products?.length ? (
                            data.results.products.map((product) => {
                                return (
                                    <ProductCardItem
                                        key={product._id.toString()}
                                        product={product}
                                        href={PATH.singleProduct(product._id.toString(), product.name)}
                                    />
                                );
                            })
                        ) : (
                            <p>هیچ محصولی یافت نشد.</p>
                        )}
                    </div>
                ) : (
                    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {Array.from(Array(4).keys()).map((_item, index) => (
                            <div key={index} className="flex w-full flex-col gap-2 rounded-lg border p-1">
                                <div className="skeleton aspect-square size-full rounded-md" />
                                <div style={{ height: "16px", width: "70%" }} className="skeleton rounded-md" />
                                <div style={{ height: "16px", width: "60%" }} className="skeleton rounded-md" />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">بلاگ</h2>

                {!isLoading ? (
                    <div className="grid w-full gap-4 sm:grid-cols-3 lg:grid-cols-2">
                        {data.results.blogs?.length ? (
                            data.results.blogs.map((blog) => {
                                return <BlogCard key={blog._id.toString()} blog={blog} link={PATH.singleBlog(blog.link)} />;
                            })
                        ) : (
                            <p>هیچ بلاگی یافت نشد.</p>
                        )}
                    </div>
                ) : (
                    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
                        {Array.from(Array(2).keys()).map((_item, index) => (
                            <div key={index} className="flex w-full flex-col gap-4 rounded-lg border p-4">
                                <div style={{ height: "20px", width: "70%" }} className="skeleton rounded-md" />
                                <div style={{ height: "120px", width: "90%" }} className="skeleton rounded-md" />
                                <div style={{ height: "16px" }} className="skeleton w-full rounded-md" />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {!isLoading && !data.count && <EmptyState imgSrc={notProductSearchFound} description="متأسفانه، هیچ نتیجه ای یافت نشد." />}
        </>
    );
};

export default Search;
