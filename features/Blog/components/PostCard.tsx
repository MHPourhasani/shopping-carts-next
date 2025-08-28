import ClockIcon from "@/assets/icons/components/Clock";
import UserIcon from "@/assets/icons/components/User";
import PATH from "@/shared/utils/path";
import Link from "next/link";
import { IPost } from "../interfaces";
import { cn } from "@/shared/libs/utils";

interface IProps {
    post: IPost;
    className?: string;
}

const PostCard = ({ post, className }: IProps) => {
    const { title, slug, author, excerpt, createdAt } = post;

    return (
        <Link
            href={PATH.singleBlog(slug)}
            className={cn(
                `hover-transition bg-bg-2 hover:border-primary-100 dark:bg-secondary-700 dark:lg:bg-secondary-600 flex flex-col justify-between gap-4 rounded-xl border border-transparent p-4`,
                className,
            )}
        >
            <div className="flex flex-col gap-4">
                <h2 className="font-semibold lg:text-lg">{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: excerpt ?? "" }} className="truncate break-all whitespace-pre-line"></div>
            </div>

            <div className="text-secondary-400 dark:text-secondary-100 flex items-center justify-between gap-4 border-t pt-2 text-sm">
                {author && (
                    <span className="flex items-center gap-1 truncate">
                        <UserIcon className="fill-secondary-400 dark:fill-secondary-100 size-5" />
                        <p className="truncate">{author.first_name + " " + author.last_name || author.email}</p>
                    </span>
                )}

                <span className="flex items-center gap-1 truncate">
                    <span className="pt-[3px]">{new Date(createdAt).toLocaleDateString("fa-IR")}</span>
                    <ClockIcon className="fill-secondary-400 dark:fill-secondary-100 size-5" />
                </span>
            </div>
        </Link>
    );
};

export default PostCard;
