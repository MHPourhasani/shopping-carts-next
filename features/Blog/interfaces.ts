import { IUser } from "../Auth/interfaces";
import { PostStatusEnum } from "./enums";

export interface IPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    readingTime?: number;
    status: PostStatusEnum;
    pinned: boolean;
    thumbnail: string;
    scheduledAt: Date;
    tags: string[];
    categories: string[];
    author: IUser;
    viewCount: number;
    likeCount: number;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
    relatedPosts: IPost[];
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
