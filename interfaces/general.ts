import { ObjectId } from "mongoose";
import { PaymentMethodEnum, UserRoleEnum } from "./enums";

export interface CategoryInterface {
    _id: ObjectId;
    name: string;
    src: string;
}

export interface BannerInterface {
    _id: ObjectId;
    name: string;
    src: string;
    type: string;
}

export interface AddressInterface {
    _id: string;
    address_title: string;
    address_value: string;
    isSelected: boolean;
}

export interface FavoriteInterface {
    _id: ObjectId;
    productId?: ObjectId;
}

export interface UserInterface {
    _id: ObjectId;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    emailValid?: boolean;
    profile_image?: string;
    phone_number?: string;
    addresses?: AddressInterface[];
    role: UserRoleEnum;
    createdAt: Date;
    updatedAt?: Date;
}

export interface ShopInterface {
    _id: ObjectId;
    creator: ObjectId;
    name: string;
    phone_number: string;
    description?: string;
    logo?: string;
    products?: ProductInterface[];
    createdAt: Date;
    updatedAt?: Date;
}

export interface NotificationInterface {
    _id: string;
    title: string;
    message: string;
    isViewed: boolean;
    createdAt: Date;
}

export interface CartInterface {
    _id: ObjectId;
    product: string;
    quantity: number;
    color: ColorInterface;
    size: number;
}

export interface BrandsInterface {
    _id: ObjectId;
    name: string;
    src: string;
}

export interface ProductInterface {
    _id: ObjectId | string;
    shopper: ShopInterface;
    name: string;
    brand: string;
    price: number;
    discountedPrice?: number | null;
    images: string[];
    sizes: string;
    colors: ColorInterface[];
    categories: string;
    tags?: string;
    services?: string;
    description?: string;
    relatedProducts?: ProductInterface[];
    createdAt: Date;
    updatedAt?: Date;
}

export interface SingleProductPropsInterface {
    isAddReview: boolean;
    setIsAddReview: any;
    productData: productData;
    setProductData: any;
    reviews: ReviewInterface[];
    setReviews: any;
    addToFavoriteHandler: () => void;
    addToCartsHandler: (productData: productData) => void;
}

export interface ColorInterface {
    name: string;
    hex: string;
}

export interface productData {
    _id?: ObjectId | string;
    product: ProductInterface;
    quantity: number;
    size: string;
    color: ColorInterface;
}

export interface ReviewInterface {
    _id: ObjectId;
    author: UserInterface;
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

export interface OrderInterface {
    _id: ObjectId;
    orderNo: string;
    products: productData[];
    payment: { method: PaymentMethodEnum; transportCost: number };
    pricePaid: number;
    address: AddressInterface;
    description: string;
    createdAt: Date;
}

export interface BlogInterface {
    _id: ObjectId;
    author: UserInterface;
    link: string;
    subject: string;
    content: string;
    tags?: string;
    keywords?: string;
    categories?: string;
    readingTime?: number;
    relatedBlogs?: BlogInterface[];
    createdAt: Date;
    updatedAt?: Date;
}

export type TOption = { id?: string | number; title: string };