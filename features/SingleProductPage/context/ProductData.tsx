"use client";
import { createContext, useContext, useState } from "react";
import { IProduct, IReview } from "../interface/product.interface";

interface IDataContext {
    data: IData;
    setData: (data: IData) => void;
}

interface IData {
    product: IProduct;
    reviews: IReview[];
}

const ProductDataContext = createContext<Partial<IDataContext>>({});

interface IProviderProps {
    children: React.ReactNode;
    initialData: IData;
}

export function SingleProductProvider({ children, initialData }: IProviderProps) {
    const [data, setData] = useState<IData>(initialData);

    return <ProductDataContext.Provider value={{ data, setData }}>{children}</ProductDataContext.Provider>;
}

export const useSingleProductData = () => {
    const context = useContext(ProductDataContext);
    if (!context) {
        throw new Error("useSingleProductData must be used within a SingleProductProvider");
    }
    return context;
};
