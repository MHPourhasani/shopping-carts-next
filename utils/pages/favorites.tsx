import PageHeader from "@/components/PageHeader/PageHeader";
import ProductCardItem from "@/components/Products/ProductCardItem";
import { IProduct } from "@/interfaces/general";
import PATH from "@/shared/path";

interface Props {
    products: IProduct[];
}

const Favorites = ({ products }: Props) => {
    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="علاقه مندی های من" desktopBackButton={false}>
                {products.length && <span className="font-medium">{products.length} محصول</span>}
            </PageHeader>

            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {products.map((product: IProduct) => {
                    return (
                        <ProductCardItem
                            key={product._id.toString()}
                            product={product}
                            href={PATH.singleProduct(product._id.toString(), product.name)}
                            className="bg-secondary-600"
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Favorites;
