import PATH from "@/shared/path";
import ProductCardItem from "./ProductCardItem";
import { IProduct } from "@/interfaces/general";

interface Props {
    loading?: boolean;
    products?: IProduct[];
}

const ProductsList = async ({ products, loading }: Props) => {
    return (
        <section className="flex w-full flex-col gap-4 2xl:justify-center">
            {!loading ? (
                <section className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {products?.map((product: IProduct) => {
                        return (
                            <ProductCardItem
                                key={product._id.toString()}
                                product={product}
                                href={PATH.singleProduct(product._id.toString(), product.name)}
                            />
                        );
                    })}
                </section>
            ) : (
                <section className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {Array.from(Array(6).keys()).map((_item, index) => (
                        <div key={index} className="flex w-full flex-col gap-2 rounded-lg border p-1">
                            <div className="skeleton aspect-square size-full rounded-md" />
                            <div style={{ height: "16px", width: "70%" }} className="skeleton rounded-md" />
                            <div style={{ height: "16px", width: "60%" }} className="skeleton rounded-md" />
                        </div>
                    ))}
                </section>
            )}
        </section>
    );
};

export default ProductsList;
