import { ObjectId } from "mongoose";
import { ProductStatusEnum } from "./enums";

export interface IAttribute {
    name: string;
    slug: string;
    values: string[];
}

export interface IVariation {
    sku: string;
    price: number;
    quantity: number;
    image?: string; // یا File برای آپلود
    attributes: Record<string, string>; // { color: "red", size: "M" }
}

export interface ProductFormValues {
    name: string;
    slug: string;
    description?: string;
    basePrice?: number;
    baseQuantity?: number;
    images?: string[];
    categories?: string[];
    brand?: string;
    tags?: string[];
    services?: string[];
    status?: ProductStatusEnum;
    attributes: IAttribute[];
    variations: IVariation[];
    relatedProducts?: string[]; // فقط ID‌ها
}

export interface CreateProductDto {
    name: string;
    slug: string;
    description?: string;
    basePrice?: number;
    baseQuantity?: number;
    images?: string[];
    categories?: string[];
    brand?: string;
    tags?: string[];
    services?: string[];
    status?: ProductStatusEnum;
    attributes: IAttribute[];
    variations: IVariation[];
    relatedProducts?: string[];
}

export interface IProduct {
    _id: ObjectId | string;
    creator: ObjectId;
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
