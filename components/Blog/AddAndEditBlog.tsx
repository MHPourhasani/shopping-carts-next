"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleRefreshAfterBack } from "../../utils/helper";
import { useAppSelector } from "@/redux/hooks";
import { BlogInterface } from "@/interfaces/general";
import Input from "../common/Input";
import Button from "../common/Button";
import Link from "next/link";
import PATH from "@/utils/path";
import TextEditor from "../common/TextEditor";
import TrashIcon from "@/assets/icons/components/Trash";
import toastMessage from "@/utils/toastMessage";
import EditIcon from "@/assets/icons/components/Edit";
import MultiSelect from "../common/MultiSelect";
import API from "@/utils/api";
import { RequestTypeEnum } from "@/interfaces/enums";

interface Props {
    blog?: BlogInterface;
    isEdit?: boolean;
}

const AddAndEditBlog = ({ blog, isEdit = false }: Props) => {
    const userState = useAppSelector((state: any) => state.auth.user);
    const [data, setData] = useState<any>(
        isEdit ? blog! : { link: "", subject: "", content: "", tags: "", keywords: "", relatedBlogs: [] },
    );
    const [isEditLink, setIsEditLink] = useState(true);
    const [allBlogs, setAllBlogs] = useState<Partial<BlogInterface[]>>([]);
    const router = useRouter();

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await fetch(API.blogs.blogs_list(RequestTypeEnum.CSR), {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    cache: "no-store",
                });
                if (response.ok) {
                    const { results } = await response.json();
                    setAllBlogs(results.filter((b: BlogInterface) => b._id !== data._id));
                }
            } catch (error: any) {
                console.error(error);
            }
        };

        getBlogs();
    }, []);

    const submitBlogHandler = async () => {
        try {
            if (!data.link!.trim()) {
                toast.error("لینک نباید خالی باشد.");
            } else if (!data.subject!.trim()) {
                toast.error("موضوع نباید خالی باشد.");
            } else {
                let res: any;

                if (isEdit) {
                    res = await fetch(`/api/blogs/${data.link}`, {
                        method: "PUt",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({ data }),
                    });
                } else {
                    res = await fetch("/api/blogs", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({ author: userState._id, data }),
                    });
                }

                const { message } = await res.json();

                if (res.ok) {
                    toast.success(isEdit ? "بلاگ با موفقیت ویرایش شد." : "بلاگ با موفقیت اضافه شد.");
                    router.back();
                    handleRefreshAfterBack();
                } else {
                    toast.error(message);
                }
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    const deleteHandler = async () => {
        const res = await fetch(`/api/blogs/${data._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success(toastMessage.blog.successfullyDelete);
            router.back();
            handleRefreshAfterBack();
        } else {
            toast.error(toastMessage.blog.failedDeleted);
        }
    };

    return (
        <div className="flex w-full flex-1 flex-col gap-4">
            <div className="flex w-full flex-col items-start gap-2">
                <div className="flex w-full items-end gap-2">
                    <Input name="link" label="لینک صفحه" value={data.link} disabled={!isEditLink} onChange={changeHandler} />
                    <Button variant="Tertiary" onClick={() => setIsEditLink(!isEditLink)} className="w-auto rounded-xl px-4">
                        {isEditLink ? "تأیید" : "ویرایش"}
                    </Button>
                </div>
                {data.link && (
                    <Link dir="ltr" href={PATH.singleBlog(data.link)} className="text-primary-100">
                        {process.env.API_BASE_URL}
                        {PATH.singleBlog(data.link)}
                    </Link>
                )}
            </div>

            <Input name="subject" label="موضوع" value={data.subject} onChange={changeHandler} />
            <TextEditor value={data.content!} onChange={(content) => setData({ ...data, content })} />
            <Input name="tags" label="تگ ها" value={data.tags} onChange={changeHandler} />
            <Input name="keywords" label="کلمات کلیدی" value={data.keywords} onChange={changeHandler} />

            <div className="flex flex-col gap-2">
                <label className="dark:text-secondary-100">بلاگ های مرتبط</label>
                <MultiSelect
                    defaultValues={
                        data.relatedBlogs
                            ? data.relatedBlogs.map((b: BlogInterface) => {
                                  return { id: String(b?._id), title: String(b?.subject) };
                              })
                            : undefined
                    }
                    options={allBlogs.map((b) => {
                        return { id: String(b?._id), title: String(b?.subject) };
                    })}
                    onChange={(selected) =>
                        setData({
                            ...data,
                            relatedBlogs: selected.map((item) => {
                                return { ...item, _id: item.id };
                            }),
                        })
                    }
                />
            </div>

            <div className="mt-8 flex gap-4">
                <Button onClick={submitBlogHandler}>
                    {isEdit ? (
                        <>
                            به روزرسانی
                            <EditIcon className="fill-white" />
                        </>
                    ) : (
                        "انتشار بلاگ"
                    )}
                </Button>
                {isEdit && (
                    <Button
                        variant="Tertiary"
                        onClick={deleteHandler}
                        className="border-red-600 text-red-600 hover:border-red-500 dark:border-red-500 dark:text-red-500"
                    >
                        حذف
                        <TrashIcon className="fill-red-600 dark:fill-red-500" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddAndEditBlog;
