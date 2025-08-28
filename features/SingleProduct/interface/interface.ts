import { ProductStatusEnum } from "./enums";

export interface IAttributeValue {
    name: string;
    slug: string;
    description?: string;
}

export interface IAttribute {
    _id: string;
    name: string;
    slug: string;
    values: IAttributeValue[];
}

export interface IVariation {
    sku: string;
    price: number;
    quantity: number;
    attributes: {
        attributeDef: string;
        value: string;
    }[];
}

export interface IProduct {
    _id: string;
    creator: string;
    name: string;
    slug: string;
    description?: string;
    basePrice?: number;
    baseQuantity?: number;
    images: string[];
    categories: string[];
    brand?: string;
    tags?: string[];
    services?: string[];
    status: ProductStatusEnum;
    attributes: IAttribute[];
    relatedProducts: IProduct[];
    variations: IVariation[];
    updatedAt?: Date;
    createdAt: Date;
}

export interface ISingleProductData {
    product: IProduct;
    addToCartsHandler: any;
    selectedAttributes: { [key: string]: string };
    setProductData: any;
    addToFavoriteHandler: any;
    handleSelectAttributes: any;
}

export interface ISingleProductProps {
    isAddReview: any;
    setIsAddReview: any;
    productData: ISingleProductData;
    setProductData: any;
    reviews: any;
    setReviews: any;
    addToFavoriteHandler: any;
    addToCartsHandler: any;
    handleSelectAttributes: any;
}
