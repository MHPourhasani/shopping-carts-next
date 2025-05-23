import AddIcon from "@/assets/icons/components/Add";
import PageHeader from "@/shared/components/PageHeader";
import ProductListItem from "@/features/SingleProductPage/components/ProductListItem";
import { getServerAuthSession } from "@/shared/auth";
import PATH from "@/shared/path";
import { Metadata } from "next";
import Link from "next/link";
import { IProduct } from "@/features/SingleProductPage/interface/product.interface";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "محصولات",
};

const getShop = async (user_id: string) => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/shop?user_id=${user_id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (response.ok) {
            const { results } = await response.json();

            console.log(results);
            return results;
        }
    } catch (error) {
        console.error(error);
    }
};

const ProfileProductsPage = async () => {
    const session = await getServerAuthSession();
    const products: IProduct[] = await getShop(session?.user.userId!);

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="محصولات" desktopBackButton={false}>
                <Link href={PATH.profile.products.add_product()}>
                    <Button variant="text" className="text-primary-100">
                        افزودن محصول جدید
                        <AddIcon className="stroke-primary-100 size-5 cursor-pointer lg:size-6" />
                    </Button>
                </Link>
            </PageHeader>

            <div className="flex flex-col gap-4">
                <div className="hidden w-full grid-cols-11 items-center gap-2 lg:grid">
                    <p className="col-span-3 pr-8">نام</p>
                    <p className="col-span-2">قیمت</p>
                    <p className="col-span-2">دسته بندی</p>
                    <p className="col-span-2">تاریخ</p>
                    <p className="col-span-2">عملیات</p>
                </div>

                {products.length ? (
                    <div className="flex w-full flex-col">
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
