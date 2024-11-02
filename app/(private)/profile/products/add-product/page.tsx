import AddAndEditProduct from "@/components/Products/AddAndEditProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "افزودن محصول",
};

const AddProductPage = () => {
    return <AddAndEditProduct />;
};

export default AddProductPage;
