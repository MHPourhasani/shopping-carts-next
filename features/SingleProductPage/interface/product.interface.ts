import { ObjectId } from "mongoose";

export interface IAttribute {
    name: string;
    slug: string;
    values: string[];
}

export interface IProductVariation {
    sku: string;
    price: number;
    quantity: number;
    image?: string;
    attributes: {
        [key: string]: string;
    };
}

export enum ProductStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export interface IProduct {
    _id: ObjectId | string;
    creator: ObjectId;
    name: string;
    slug: string;
    description: string;
    basePrice?: number;
    baseQuantity?: number;
    images: string[];
    category: string;
    brand?: string;
    tags?: string[];
    services?: string[];
    status: ProductStatus;
    attributes: IAttribute[];
    relatedProducts: IProduct[];
    variations: IProductVariation[];
    createdAt?: Date;
    updatedAt?: Date;
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
