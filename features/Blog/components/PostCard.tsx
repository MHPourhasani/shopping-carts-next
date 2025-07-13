import ClockIcon from "@/assets/icons/components/Clock";
import UserIcon from "@/assets/icons/components/User";
import { IPost } from "@/interfaces/general";
import { cn } from "@/shared/helper";
import PATH from "@/shared/path";
import Link from "next/link";

interface Props {
    post: IPost;
    className?: string;
}

const PostCard = ({ post, className }: Props) => {
    const { title, slug, author, content, createdAt } = post;

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
                <div dangerouslySetInnerHTML={{ __html: content.slice(0, 80) }} className="truncate break-all whitespace-pre-line"></div>
            </div>

            <div className="text-secondary-400 dark:text-secondary-100 flex items-center justify-between gap-4 border-t pt-2 text-sm">
                <span className="flex items-center gap-1 truncate">
                    <UserIcon className="fill-secondary-400 dark:fill-secondary-100 size-5" />
                    <p className="truncate">{author.first_name + " " + author.last_name || author.email}</p>
                </span>

                <span className="flex items-center gap-1 truncate">
                    <ClockIcon className="fill-secondary-400 dark:fill-secondary-100 size-5" />
                    {new Date(createdAt).toLocaleDateString("fa-IR")}
                </span>
            </div>
        </Link>
    );
};

export default PostCard;
