import * as z from "zod";
import { PostStatusEnum } from "../enums";

export const postSchema = z.object({
    title: z.string().min(1, "موضوع نباید خالی باشد"),
    slug: z.string().min(1, "لینک نباید خالی باشد"),
    content: z.string().min(1, "متن نباید خالی باشد"),
    excerpt: z.string().optional(),
    readingTime: z.number().min(1, "زمان مطالعه نمی‌تواند منفی باشد").default(1),
    status: z.enum(PostStatusEnum).default(PostStatusEnum.PUBLISHED),
    pinned: z.boolean().default(false),
    thumbnail: z.string().optional(),
    scheduledAt: z
        .union([z.string(), z.date(), z.undefined()])
        .transform((val) => (val ? new Date(val) : undefined))
        .optional(),
    publishedAt: z
        .union([z.string(), z.date(), z.undefined()])
        .transform((val) => (val ? new Date(val) : undefined))
        .optional(),
    createdAt: z.union([z.string(), z.date(), z.undefined()]).transform((val) => (val ? new Date(val) : undefined)),
    updatedAt: z
        .union([z.string(), z.date(), z.undefined()])
        .transform((val) => (val ? new Date(val) : undefined))
        .optional(),
    viewCount: z.number().min(0).optional(),
    likeCount: z.number().min(0).optional(),
    author: z.string().min(1, "شناسه نویسنده الزامی است"),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    relatedPosts: z.array(z.string()).optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;
