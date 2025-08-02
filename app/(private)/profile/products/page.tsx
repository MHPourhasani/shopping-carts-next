import AddIcon from "@/assets/icons/components/Add";
import PageHeader from "@/shared/components/PageHeader";
import ProductListItem from "@/features/SingleProduct/components/ProductListItem";
import PATH from "@/shared/utils/path";
import { Metadata } from "next";
import Link from "next/link";
import { IProduct } from "@/features/SingleProduct/interface/interface";
import { Button } from "@/components/ui/button";
import { get } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";
import { IPaginatedResponse } from "@/shared/interfaces";

export const metadata: Metadata = {
    title: "محصولات",
};

const getProducts = async () => {
    try {
        const data = await get<IPaginatedResponse<IProduct>>(API.product.products());
        return data.results;
    } catch (error) {
        console.error(error);
    }
};

const ProfileProductsPage = async () => {
    const products = await getProducts();

    return (
        <section className="flex w-full flex-1 flex-col gap-4 overflow-y-hidden">
            <PageHeader title="محصولات" desktopBackButton={false}>
                <Link href={PATH.profile.products.add_product()}>
                    <Button variant="text" className="text-primary-100 group cursor-pointer px-0">
                        <AddIcon className="stroke-primary-100 size-5 cursor-pointer transition-all ease-in-out group-hover:stroke-white lg:size-6" />
                        افزودن محصول جدید
                    </Button>
                </Link>
            </PageHeader>

            <div className="flex h-full flex-col gap-4 overflow-y-hidden">
                <div className="hidden w-full grid-cols-11 items-center gap-2 lg:grid">
                    <p className="col-span-3 pr-8">نام</p>
                    <p className="col-span-2">قیمت</p>
                    <p className="col-span-2">دسته بندی</p>
                    <p className="col-span-2">تاریخ</p>
                    <p className="col-span-2">عملیات</p>
                </div>

                {products && products.length ? (
                    <div className="custom-scrollbar flex w-full flex-1 flex-col overflow-y-auto">
                        {products.map((product) => (
                            <ProductListItem
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
    );
};

export default ProfileProductsPage;
