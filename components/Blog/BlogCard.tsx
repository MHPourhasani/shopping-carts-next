import ClockIcon from "@/assets/icons/components/Clock";
import UserIcon from "@/assets/icons/components/User";
import { BlogInterface } from "@/interfaces/general";
import { cn } from "@/utils/helper";
import Link from "next/link";

interface Props {
    blog: BlogInterface;
    link: string;
    className?: string;
}

const BlogCard = ({ blog, link, className }: Props) => {
    const { subject, author, content, createdAt } = blog;

    return (
        <Link
            href={link}
            className={cn(
                `hover-transition flex flex-col justify-between gap-4 rounded-xl border border-transparent bg-bg-2 p-4 hover:border-primary-100 dark:bg-secondary-700 dark:lg:bg-secondary-600`,
                className,
            )}
        >
            <div className="flex flex-col gap-4">
                <h2 className="font-semibold lg:text-lg">{subject}</h2>
                <div dangerouslySetInnerHTML={{ __html: content.slice(0, 80) }} className="truncate"></div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t pt-2 text-sm text-secondary-400 dark:text-secondary-100">
                <span className="flex items-center gap-1 truncate">
                    <UserIcon className="size-5 fill-secondary-400 dark:fill-secondary-100" />
                    <p className="truncate">{author.first_name + " " + author.last_name || author.email}</p>
                </span>
                
                <span className="flex items-center gap-1 truncate">
                    <ClockIcon className="size-5 fill-secondary-400 dark:fill-secondary-100" />
                    {new Date(createdAt).toLocaleDateString("fa-IR")}
                </span>
            </div>
        </Link>
    );
};

export default BlogCard;
