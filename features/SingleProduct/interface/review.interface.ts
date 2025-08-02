import { IUser } from "@/features/Auth/interfaces";

export interface IReview {
    _id: string;
    user: IUser;
    product: string;
    title: string;
    rating: number;
    comment: string;
    approved: boolean;
    verifiedPurchase: boolean;
    createdAt: Date;
}
