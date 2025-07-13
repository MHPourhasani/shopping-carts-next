import { Types } from "mongoose";
import { PaymentMethodEnum, PostStatusEnum, UserRoleEnum } from "./enums";
import { IProduct, ISingleProductData } from "@/features/SingleProductPage/interface/interface";

export interface ICategory {
    _id: Types.ObjectId;
    name: string;
    src: string;
}

export interface IBanner {
    _id: Types.ObjectId;
    name: string;
    src: string;
    type: string;
}

export interface IAddress {
    _id: Types.ObjectId;
    title: string;
    address: string;
    city: string;
    postalCode: string;
    isDefault: boolean;
}

export interface IFavorite {
    _id: Types.ObjectId;
    productId?: Types.ObjectId;
}

export interface IUser {
    _id: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    is_email_verified?: boolean;
    is_phone_verified?: boolean;
    profile_image?: string;
    phone?: string;
    addresses: IAddress[];
    role: UserRoleEnum;
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
    _id: Types.ObjectId;
    product: string;
    quantity: number;
    color: any;
    size: number;
}

export interface IBrands {
    _id: Types.ObjectId;
    name: string;
    src: string;
}

export interface IconProps {
    className?: string;
    color?: string;
    style?: any;
    onClick?: any;
}

export interface IOrder {
    _id: Types.ObjectId;
    orderNo: string;
    products: ISingleProductData[];
    payment: { method: PaymentMethodEnum; transportCost: number };
    pricePaid: number;
    address: IAddress;
    description: string;
    createdAt: Date;
}

export interface IPost {
    _id: Types.ObjectId;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    status: PostStatusEnum;
    tags: string[];
    categories: string[];
    author: IUser;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
}

export type TOption = { id?: string | number; title: string };
