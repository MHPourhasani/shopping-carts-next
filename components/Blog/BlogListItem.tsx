"use client";
import ClockIcon from "@/assets/icons/components/Clock";
import EditIcon from "@/assets/icons/components/Edit";
import TrashIcon from "@/assets/icons/components/Trash";
import UserIcon from "@/assets/icons/components/User";
import { IBlog } from "@/interfaces/general";
import { handleRefreshAfterBack } from "@/shared/helper";
import toastMessage from "@/shared/toastMessage";
import Link from "next/link";
import { toast } from "react-toastify";

const BlogListItem = ({ blog, link }: { blog: IBlog; link: string }) => {
    const { _id, subject, author, createdAt } = blog;

    const deleteHandler = async () => {
        const res = await fetch(`/api/blogs/${_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success(toastMessage.blog.successfullyDelete);
            handleRefreshAfterBack();
        } else {
            toast.error(toastMessage.blog.failedDeleted);
        }
    };

    return (
        <div className="hover-transition flex w-full gap-4 rounded-xl border border-transparent bg-bg-2 p-4 hover:border-primary-100 dark:bg-secondary-700 dark:lg:bg-secondary-600">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <Link href={link}>
                        <h2 className="flex-1 truncate font-semibold lg:text-lg">{subject}</h2>
                    </Link>
                    <span className="flex items-center gap-4">
                        <Link href={link}>
                            <EditIcon className="fill-customBlack-200 dark:fill-white" />
                        </Link>
                        <TrashIcon onClick={deleteHandler} className="cursor-pointer fill-red-600 dark:fill-red-500" />
                    </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-secondary-100 pt-4 text-sm text-secondary-400 dark:text-secondary-100">
                    <span className="flex items-center gap-1 truncate">
                        <UserIcon className="size-5 fill-secondary-400 dark:fill-secondary-100" />
                        <p className="truncate">{author.first_name + " " + author.last_name || author.email}</p>
                    </span>
                    <span className="flex items-center gap-1 truncate">
                        <ClockIcon className="size-5 fill-secondary-400 dark:fill-secondary-100" />
                        {new Date(createdAt).toLocaleDateString("fa-IR")}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BlogListItem;
