import ProductCardItem from "@/features/SingleProductPage/components/ProductCardItem";
import { IProduct } from "@/features/SingleProductPage/interface/interface";
import PageHeader from "@/shared/components/PageHeader";
import PATH from "@/shared/utils/path";

interface Props {
    products: IProduct[];
}

const Favorites = ({ products }: Props) => {
    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="علاقه مندی های من" desktopBackButton={false}>
                {products.length && <span className="font-medium">{products.length} محصول</span>}
            </PageHeader>

            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {products.map((product: IProduct) => {
                    return (
                        <ProductCardItem
                            key={product._id.toString()}
                            product={product}
                            href={PATH.singleProduct(product._id.toString(), product.name)}
                            className="dark:lg:bg-customBlack-100"
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Favorites;
