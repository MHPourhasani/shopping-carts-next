"use client";
import ClockIcon from "@/assets/icons/components/Clock";
import EditIcon from "@/assets/icons/components/Edit";
import TrashIcon from "@/assets/icons/components/Trash";
import UserIcon from "@/assets/icons/components/User";
import { handleRefreshAfterBack } from "@/shared/utils/utils";
import toastMessage from "@/shared/utils/toastMessage";
import Link from "next/link";
import { toast } from "react-toastify";
import { IPost } from "../interfaces";
import { del } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";

const PostListItem = ({ post, link }: { post: IPost; link: string }) => {
    const { _id, title, author, createdAt } = post;

    const deleteHandler = async () => {
        const res = await del(API.blogs.singlePostById(_id));
        console.log(res);

        toast.success(toastMessage.post.successfullyDelete);
        // if (res.ok) {
        //     handleRefreshAfterBack();
        // } else {
        //     toast.error(toastMessage.post.failedDeleted);
        // }
    };

    return (
        <div className="hover-transition bg-bg-2 hover:border-primary-100 dark:bg-secondary-700 dark:lg:bg-secondary-600 flex w-full gap-4 rounded-xl border border-transparent p-4">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <Link href={link}>
                        <h2 className="flex-1 truncate font-semibold lg:text-lg">{title}</h2>
                    </Link>
                    <span className="flex items-center gap-4">
                        <Link href={link}>
                            <EditIcon className="fill-customBlack-200 dark:fill-white" />
                        </Link>
                        <TrashIcon onClick={deleteHandler} className="cursor-pointer fill-red-600 dark:fill-red-500" />
                    </span>
                </div>

                <div className="border-secondary-100 text-secondary-400 dark:text-secondary-100 flex items-center justify-between gap-4 border-t pt-4 text-sm">
                    <span className="flex items-center gap-1 truncate">
                        <UserIcon className="fill-secondary-400 dark:fill-secondary-100 size-5" />
                        <p className="truncate">{author.first_name + " " + author.last_name || author.email}</p>
                    </span>
                    <span className="flex items-center gap-1 truncate">
                        {new Date(createdAt).toLocaleDateString("fa-IR")}
                        <ClockIcon className="fill-secondary-400 dark:fill-secondary-100 size-5" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostListItem;
