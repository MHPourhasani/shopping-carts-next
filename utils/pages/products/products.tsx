"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Pagination from "@/components/Pagination";
import { IColor, IProduct } from "@/interfaces/general";
import ProductCardItem from "@/features/SingleProductPage/components/ProductCardItem";
import Button from "@/shared/components/common/Button";
import PATH from "@/shared/path";
import PageHeader from "@/components/PageHeader/PageHeader";
import { capitalizeTheFirstLettersOfWords } from "@/shared/helper";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import CloseIcon from "@/assets/icons/components/Close";
import FilterIcon from "@/assets/icons/components/Filter";
import CheckBox from "@/shared/components/common/CheckBox";
import BreadCrumb from "@/shared/components/common/BreadCrumb";

interface Props {
    products: IProduct[];
}

const Products = ({ products }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filteredOptions, setFilteredOptions] = useState<{ brands: string[]; colors: IColor[] }>({ brands: [], colors: [] });
    const [isShow, setIsShow] = useState<{ filter: boolean; brands: boolean; colors: boolean }>({
        filter: false,
        brands: false,
        colors: false,
    });
    let PageSize = window && window.innerWidth > 1024 ? 20 : 10;
    const mobileFilterRef = useRef<any>();

    const currentProductsData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return filteredProducts?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredProducts]);

    useEffect(() => {
        if (isShow.filter) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "auto";
            };
        }
    }, [isShow]);

    useEffect(() => {
        if (filteredOptions && (filteredOptions.brands.length || filteredOptions.colors.length)) {
            setFilteredProducts(
                products.filter(
                    (item) =>
                        filteredOptions.brands.some((brand) => brand === item.brand) ||
                        filteredOptions.colors.some((color) => item.colors.some((c) => c == color)),
                ),
            );
        } else {
            setFilteredProducts(products);
        }
    }, [filteredOptions, products]);

    const getFilterItems = () => {
        const brands = [...new Set(products.map((item) => item.brand))];
        const colors = [...new Set(products.map((item) => item.colors).flat())];

        return { brands, colors: colors.length ? colors : [] };
    };

    const selectBrandHandler = (checked: boolean, brand: string) => {
        if (checked) {
            setFilteredOptions({ ...filteredOptions, brands: [...filteredOptions.brands, brand] });
        } else {
            setFilteredOptions({
                ...filteredOptions,
                brands: filteredOptions.brands.filter((item) => item !== brand),
            });
        }
    };

    const selectColorHandler = (checked: boolean, color: IColor) => {
        if (checked) {
            setFilteredOptions({ ...filteredOptions, colors: [...filteredOptions.colors, color] });
        } else {
            setFilteredOptions({
                ...filteredOptions,
                colors: filteredOptions.colors.filter((item) => item.name !== color.name),
            });
        }
    };

    useOnClickOutside(mobileFilterRef, () => {
        setIsShow({ ...isShow, filter: false });
    });

    return (
        <>
            {isShow.filter && window.innerWidth < 1024 && (
                <div
                    ref={mobileFilterRef}
                    style={{ minWidth: "70%", maxWidth: "70%" }}
                    className="absolute left-0 right-0 top-0 z-10 flex h-full flex-col gap-8 rounded-l-xl rounded-r-xl bg-bg-2 p-4 dark:bg-secondary-600"
                >
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <FilterIcon className="h-5 stroke-secondary-700 dark:stroke-secondary-100" />
                            <h3 className="text-xl font-semibold">فیلتر</h3>
                        </span>
                        <CloseIcon
                            onClick={() => setIsShow({ ...isShow, filter: false })}
                            className="cursor-pointer fill-secondary-700 dark:fill-secondary-100"
                        />
                    </div>

                    {!!getFilterItems()?.brands && (
                        <div className="flex w-full flex-col gap-4 border-b">
                            <div
                                onClick={() => setIsShow({ ...isShow, brands: !isShow.brands })}
                                className="flex cursor-pointer items-center justify-between"
                            >
                                <h2>برند ها</h2>
                                <span className="flex items-center gap-2">
                                    {!!filteredOptions.brands.length && (
                                        <div
                                            style={{ backgroundColor: "#dc2626", width: "8px" }}
                                            className="aspect-square rounded-full bg-red-600"
                                        />
                                    )}
                                    <ArrowLeft className={`stroke-secondary-600 dark:stroke-white ${isShow.brands ? "-rotate-45" : ""}`} />
                                </span>
                            </div>

                            {isShow.brands && (
                                <ul className="mr-2 flex flex-col gap-2 dark:bg-secondary-500">
                                    {getFilterItems().brands.map((brand) => (
                                        <CheckBox
                                            key={brand}
                                            label={capitalizeTheFirstLettersOfWords(brand)}
                                            id={brand}
                                            checked={filteredOptions.brands.includes(brand)}
                                            onChange={(e) => selectBrandHandler(e.currentTarget.checked, brand)}
                                            className="!size-9"
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {!!getFilterItems().colors && (
                        <div className="flex w-full flex-col gap-4">
                            <div
                                onClick={() => setIsShow({ ...isShow, colors: !isShow.colors })}
                                className="flex cursor-pointer items-center justify-between"
                            >
                                <h2>رنگ ها</h2>
                                <span className="flex items-center gap-2">
                                    {!!filteredOptions.colors.length && (
                                        <div
                                            style={{ backgroundColor: "#dc2626", width: "8px" }}
                                            className="aspect-square rounded-full bg-red-600"
                                        />
                                    )}
                                    <ArrowLeft className={`stroke-secondary-600 dark:stroke-white ${isShow.colors ? "-rotate-45" : ""}`} />
                                </span>
                            </div>
                            {isShow.colors && (
                                <ul className="flex flex-col gap-2">
                                    {getFilterItems().colors.map((color) => {
                                        return (
                                            color.name &&
                                            color.hex && (
                                                <li className="flex items-center justify-between gap-4">
                                                    <CheckBox
                                                        key={color.name}
                                                        label={capitalizeTheFirstLettersOfWords(color?.name)}
                                                        id={color.name}
                                                        checked={filteredOptions.colors.includes(color)}
                                                        onChange={(e) => selectColorHandler(e.currentTarget.checked, color)}
                                                        className="!size-9"
                                                    />
                                                    <div
                                                        style={{ backgroundColor: color.hex }}
                                                        className="aspect-square size-5 rounded-full"
                                                    />
                                                </li>
                                            )
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            )}

            <section className="flex w-full flex-1 flex-col items-start gap-4 lg:gap-8">
                <BreadCrumb items={[{ title: "همه محصولات", path: PATH.products() }]} />

                <PageHeader title="همه محصولات" desktopBackButton={false}>
                    <Button
                        variant="Text"
                        onClick={() => setIsShow({ ...isShow, filter: !isShow.filter })}
                        className="w-auto rounded-md px-2 text-primary-100 dark:text-violet-400 lg:hidden"
                    >
                        <FilterIcon className="stroke-primary-100 dark:stroke-violet-400" />
                    </Button>
                </PageHeader>

                <div className="flex w-full gap-10 lg:items-start">
                    <aside
                        style={{ minWidth: "20%" }}
                        className="hidden h-auto max-h-[90vh] flex-col gap-8 overflow-y-auto rounded-xl bg-bg-2 p-4 shadow-lg dark:bg-secondary-700 lg:flex"
                    >
                        {!!getFilterItems()?.brands && (
                            <div className="flex w-full flex-col gap-4">
                                <div
                                    onClick={() => setIsShow({ ...isShow, brands: !isShow.brands })}
                                    className="flex cursor-pointer items-center justify-between"
                                >
                                    <h2>برند ها</h2>
                                    <span className="flex items-center gap-2">
                                        {!!filteredOptions.brands.length && (
                                            <div
                                                style={{ backgroundColor: "#dc2626", width: "8px" }}
                                                className="aspect-square rounded-full bg-red-600"
                                            />
                                        )}
                                        <ArrowLeft
                                            className={`stroke-secondary-600 dark:stroke-white ${isShow.brands ? "-rotate-45" : ""}`}
                                        />
                                    </span>
                                </div>

                                {isShow.brands && (
                                    <ul className="mr-2 flex flex-col gap-2">
                                        {getFilterItems().brands.map((brand) => (
                                            <CheckBox
                                                key={brand}
                                                label={capitalizeTheFirstLettersOfWords(brand)}
                                                id={brand}
                                                checked={filteredOptions.brands.includes(brand)}
                                                onChange={(e) => selectBrandHandler(e.currentTarget.checked, brand)}
                                                className="!size-9"
                                            />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {!!getFilterItems().colors && (
                            <div className="flex w-full flex-col gap-4">
                                <div
                                    onClick={() => setIsShow({ ...isShow, colors: !isShow.colors })}
                                    className="flex cursor-pointer items-center justify-between"
                                >
                                    <h2>رنگ ها</h2>
                                    <span className="flex items-center gap-2">
                                        {!!filteredOptions.colors.length && (
                                            <div
                                                style={{ backgroundColor: "#dc2626", width: "8px" }}
                                                className="aspect-square rounded-full bg-red-600"
                                            />
                                        )}
                                        <ArrowLeft
                                            className={`stroke-secondary-600 dark:stroke-white ${isShow.colors ? "-rotate-45" : ""}`}
                                        />
                                    </span>
                                </div>
                                {isShow.colors && (
                                    <ul className="flex flex-col gap-2">
                                        {getFilterItems().colors.map((color) => {
                                            return (
                                                color.name &&
                                                color.hex && (
                                                    <li className="flex items-center justify-between gap-4">
                                                        <CheckBox
                                                            key={color.name}
                                                            label={capitalizeTheFirstLettersOfWords(color?.name)}
                                                            id={color.name}
                                                            checked={filteredOptions.colors.includes(color)}
                                                            onChange={(e) => selectColorHandler(e.currentTarget.checked, color)}
                                                            className="!size-9"
                                                        />
                                                        <div
                                                            style={{ backgroundColor: color.hex }}
                                                            className="aspect-square size-5 rounded-full"
                                                        />
                                                    </li>
                                                )
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        )}
                    </aside>

                    <div className="flex w-full flex-1 flex-col items-center justify-center gap-10">
                        {!!currentProductsData.length && (
                            <div className="grid h-full w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {currentProductsData.map((product: IProduct) => {
                                    return (
                                        <ProductCardItem
                                            product={product}
                                            key={product._id.toString()}
                                            href={PATH.singleProduct(product._id.toString(), product.name)}
                                        />
                                    );
                                })}
                            </div>
                        )}

                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={filteredProducts.length}
                            pageSize={PageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Products;
