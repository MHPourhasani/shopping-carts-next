import { ObjectId } from "mongoose";
import { PaymentMethodEnum, UserRoleEnum } from "./enums";

export interface ICategory {
    _id: ObjectId;
    name: string;
    src: string;
}

export interface IBanner {
    _id: ObjectId;
    name: string;
    src: string;
    type: string;
}

export interface IAddress {
    _id: string;
    address_title: string;
    address_value: string;
    isSelected: boolean;
}

export interface IFavorite {
    _id: ObjectId;
    productId?: ObjectId;
}

export interface IUser {
    _id: ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    emailValid?: boolean;
    profile_image?: string;
    phone_number?: string;
    addresses?: IAddress[];
    role: UserRoleEnum;
    createdAt: Date;
    updatedAt?: Date;
}

export interface IShop {
    _id: ObjectId;
    creator: ObjectId;
    name: string;
    phone_number: string;
    description?: string;
    logo?: string;
    products?: IProduct[];
    createdAt: Date;
    updatedAt?: Date;
}

export interface INotification {
    _id: string;
    title: string;
    message: string;
    isViewed: boolean;
    createdAt: Date;
}

export interface ICart {
    _id: ObjectId;
    product: string;
    quantity: number;
    color: IColor;
    size: number;
}

export interface IBrands {
    _id: ObjectId;
    name: string;
    src: string;
}

export interface IProduct {
    _id: ObjectId | string;
    shopper: IShop;
    name: string;
    brand: string;
    price: number;
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

export interface IColor {
    name: string;
    hex: string;
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

export interface IconProps {
    className?: string;
    color?: string;
    style?: any;
    onClick?: any;
}

export interface IOrder {
    _id: ObjectId;
    orderNo: string;
    products: ISingleProductData[];
    payment: { method: PaymentMethodEnum; transportCost: number };
    pricePaid: number;
    address: IAddress;
    description: string;
    createdAt: Date;
}

export interface IBlog {
    _id: ObjectId;
    author: IUser;
    link: string;
    subject: string;
    content: string;
    tags?: string;
    keywords?: string;
    categories?: string;
    readingTime?: number;
    relatedBlogs?: IBlog[];
    createdAt: Date;
    updatedAt?: Date;
}

export type TOption = { id?: string | number; title: string };
