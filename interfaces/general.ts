export interface ICategory {
    _id: string;
    name: string;
    src: string;
}

export interface IBanner {
    _id: string;
    name: string;
    src: string;
    type: string;
}

export interface IFavorite {
    _id: string;
    productId?: string;
}

export interface INotification {
    _id: string;
    title: string;
    message: string;
    isViewed: boolean;
    createdAt: Date;
}

export interface ICart {
    _id: string;
    product: string;
    quantity: number;
    color: any;
    size: number;
}

export interface IBrands {
    _id: string;
    name: string;
    src: string;
}

export type TOption = { id?: string | number; title: string };
