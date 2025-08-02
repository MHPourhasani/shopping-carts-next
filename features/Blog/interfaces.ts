import { IUser } from "../Auth/interfaces";
import { PostStatusEnum } from "./enums";

export interface IPost {
    _id: string;
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
