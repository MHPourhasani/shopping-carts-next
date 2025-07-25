import ProductForm from "@/features/SingleProductPage/components/ProductForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "افزودن محصول",
};

const AddProductPage = () => {
    return <ProductForm />;
};

export default AddProductPage;
