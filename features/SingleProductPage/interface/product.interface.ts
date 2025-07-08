import { IShop, IUser } from "@/interfaces/general";
import { ObjectId } from "mongoose";

export interface ISingleProductProps {
    isAddReview: boolean;
    setIsAddReview: any;
    productData: ISingleProductData;
    setProductData: any;
    reviews: IReview[];
    setReviews: any;
    addToFavoriteHandler: () => void;
    addToCartsHandler: (productData: ISingleProductData) => void;
}

export interface ISingleProductData {
    _id?: ObjectId | string;
    product: IProduct;
    quantity: number;
    size: string;
    color: IColor;
}

export interface IReview {
    _id: ObjectId;
    author: IUser;
    title: string;
    rating: number;
    description: string;
    createdAt: Date;
}

export interface IColor {
    name: string;
    hex: string;
}

export interface IProduct {
    _id: ObjectId | string;
    shopper: IShop;
    name: string;
    brand: string;
    basePrice: number;
    discountedPrice?: number | null;
    images: string[];
    sizes: string;
    colors: IColor[];
    categories: string;
    tags?: string;
    services?: string;
    description?: string;
    relatedProducts?: IProduct[];
    createdAt: Date;
    updatedAt?: Date;
}
