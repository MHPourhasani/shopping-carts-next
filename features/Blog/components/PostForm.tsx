"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { handleRefreshAfterBack } from "../../../shared/utils/utils";
import Link from "next/link";
import PATH from "@/shared/utils/path";
import TextEditor from "@/shared/components/common/TextEditor";
import TrashIcon from "@/assets/icons/components/Trash";
import toastMessage from "@/shared/utils/toastMessage";
import EditIcon from "@/assets/icons/components/Edit";
import MultiSelect from "@/shared/components/common/MultiSelect";
import API from "@/shared/libs/endpoints";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { IPost } from "../interfaces";
import { Controller, useForm } from "react-hook-form";
import { PostFormValues, postSchema } from "../validation/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyLoad } from "@/shared/hooks/useLazyLoad";
import { del, post, put } from "@/shared/libs/axios";
import { PostStatusEnum } from "../enums";

interface IProps {
    initialData?: IPost;
}

const PostForm = ({ initialData }: IProps) => {
    const router = useRouter();
    const postsRef = useRef<HTMLDivElement>(null);

    const { lists: blogs } = useLazyLoad<IPost>({
        url: API.blogs.posts(),
        ref: postsRef,
    });

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: initialData
            ? {
                  slug: initialData.slug,
                  title: initialData.title,
                  content: initialData.content,
                  readingTime: initialData.readingTime ?? 1,
                  tags: initialData.tags ?? [],
                  keywords: initialData.keywords ?? [],
                  categories: initialData.categories ?? [],
                  status: initialData.status ?? PostStatusEnum.PUBLISHED,
                  pinned: initialData.pinned ?? false,
                  thumbnail: initialData.thumbnail ?? "",
                  scheduledAt: initialData.scheduledAt ?? undefined,
                  relatedPosts: initialData.relatedPosts ?? [],
              }
            : {
                  slug: "",
                  title: "",
                  content: "",
                  tags: [],
                  keywords: [],
                  categories: [],
                  pinned: false,
                  status: PostStatusEnum.DRAFT,
                  relatedPosts: [],
              },
    });

    const title = watch("title");
    const slug = watch("slug");

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, "-");
    };

    useEffect(() => {
        if (title) {
            const newSlug = generateSlug(title);
            setValue("slug", newSlug);
        }
    }, [title, setValue]);

    const onSubmit = async (data: PostFormValues) => {
        try {
            const transformData = { ...data, relatedPosts: data.relatedPosts?.map((p) => p.id) };

            if (initialData) {
                await put(API.blogs.singlePostById(initialData._id), transformData);
                toast.success("بلاگ با موفقیت ویرایش شد.");
            } else {
                await post(API.blogs.posts(), transformData);
                toast.success("بلاگ با موفقیت منتشر شد.");
            }

            router.back();
            handleRefreshAfterBack();
        } catch (error: any) {
            console.error(error);
        }
    };

    const deleteHandler = async () => {
        if (initialData) {
            const res = await del<{ success: boolean }>(API.blogs.singlePostById(initialData._id));

            if (res.success) {
                toast.success(toastMessage.post.successfullyDelete);
                router.back();
                handleRefreshAfterBack();
            } else {
                toast.error(toastMessage.post.failedDeleted);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-1 flex-col gap-4">
            <InputWithLabel label="موضوع" {...register("title")} error={errors.title?.message} />

            <div className="flex w-full flex-col items-start gap-2">
                <InputWithLabel label="لینک صفحه" {...register("slug")} error={errors.slug?.message} />

                <Link dir="ltr" href={PATH.singleBlog(slug)} className="text-primary-100">
                    {window.origin}
                    {PATH.singleBlog(slug)}
                </Link>
            </div>

            <InputWithLabel
                label="زمان مطالعه (دقیقه)"
                type="number"
                {...register("readingTime", { valueAsNumber: true })}
                error={errors.readingTime?.message}
            />

            <Controller
                name="content"
                control={control}
                render={({ field }) => <TextEditor label="متن" value={field.value} onChange={field.onChange} />}
            />
            <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                    <InputWithLabel
                        label="تگ‌ها (، جدا کنید)"
                        value={field.value?.join("، ") || ""}
                        onChange={(e) => field.onChange(e.target.value.split("،").map((t) => t.trim()))}
                    />
                )}
            />
            <Controller
                name="keywords"
                control={control}
                render={({ field }) => (
                    <InputWithLabel
                        label="کلمات کلیدی (، جدا کنید)"
                        value={field.value?.join("، ") || ""}
                        onChange={(e) => field.onChange(e.target.value.split("،").map((k) => k.trim()))}
                    />
                )}
            />

            <div className="flex flex-col gap-2">
                <label className="dark:text-secondary-100">بلاگ های مرتبط</label>
                <Controller
                    name="relatedPosts"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            defaultValues={field.value?.map((b) => ({ id: b._id, title: b.title }))}
                            options={blogs}
                            onChange={(selected) => field.onChange(selected)}
                        />
                    )}
                />
            </div>

            <div className="mt-8 flex gap-4">
                <Button className="cursor-pointer">
                    {initialData ? (
                        <>
                            به روزرسانی
                            <EditIcon className="fill-white" />
                        </>
                    ) : (
                        "انتشار بلاگ"
                    )}
                </Button>

                {initialData && (
                    <Button
                        variant="secondary"
                        onClick={deleteHandler}
                        className="cursor-pointer border-red-600 text-red-600 hover:border-red-500 dark:border-red-500 dark:text-red-500"
                    >
                        حذف
                        <TrashIcon className="fill-red-600 dark:fill-red-500" />
                    </Button>
                )}
            </div>
        </form>
    );
};

export default PostForm;
