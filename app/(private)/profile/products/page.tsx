import AddIcon from "@/assets/icons/components/Add";
import Button from "@/components/common/Button";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProductListItem from "@/components/Products/ProductListItem";
import { ProductInterface } from "@/interfaces/general";
import { getServerAuthSession } from "@/utils/auth";
import PATH from "@/utils/path";
import { Metadata } from "next";
import Link from "next/link";

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
            return results;
        }
    } catch (error) {
        console.error(error);
    }
};

const ProfileProductsPage = async () => {
    const session = await getServerAuthSession();
    const data: { products: ProductInterface[] } = await getShop(session?.user.userId!);

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="محصولات" desktopBackButton={false}>
                <Link href={PATH.profile.products.add_product()}>
                    <Button variant="Text" className="text-primary-100">
                        افزودن محصول جدید
                        <AddIcon className="size-5 cursor-pointer stroke-primary-100 lg:size-6" />
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

                {data.products.length ? (
                    <div className="flex w-full flex-col">
                        {data.products.map((product) => (
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
