import BreadCrumb from "@/components/common/BreadCrumb";
import { BlogInterface } from "@/interfaces/general";
import API from "@/utils/api";
import PATH from "@/utils/path";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import userIcon from "@/assets/icons/svgs/user.svg";
import ClockIcon from "@/assets/icons/components/Clock";
import BlogCard from "@/components/Blog/BlogCard";
import { showFullDate } from "@/utils/helper";
import PageHeader from "@/components/PageHeader/PageHeader";
import { RequestTypeEnum } from "@/interfaces/enums";

interface Props {
    params: { url: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data: BlogInterface = await getBlog(params.url);

    const title = "بلاگ " + data.subject;
    const description = data.content;
    const url = PATH.singleBlog(data.link);

    return {
        title: title,
        description: description,
        keywords: data.keywords,
        alternates: { canonical: url },
        openGraph: { title: title, description: description, url: url },
        twitter: { title: title, description: description },
        other: { "twitter:url": url },
    };
}

const getBlog = async (url: string) => {
    try {
        const response = await fetch(API.blogs.single_blog(url, RequestTypeEnum.SSR), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const { result } = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
    }
};

const getBlogs = async () => {
    try {
        const response = await fetch(API.blogs.blogs_list(RequestTypeEnum.SSR), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (response.ok) {
            const { results } = await response.json();
            return results;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const SingleBlogPage = async ({ params }: Props) => {
    const data: BlogInterface = await getBlog(params.url);
    const blogs: BlogInterface[] = await getBlogs();
    const filteredBlogs = blogs.filter((blog) => blog.link !== params.url);

    const { subject, link, author, updatedAt, createdAt, readingTime, tags, content, relatedBlogs } = data;

    return (
        <section className="flex w-full flex-1 flex-col gap-8">
            <BreadCrumb
                items={[
                    { title: "بلاگ", path: PATH.blogs() },
                    { title: subject, path: PATH.singleBlog(link) },
                ]}
            />

            <section className="flex w-full flex-col gap-4 lg:flex-row lg:gap-8">
                <div className="flex flex-col gap-8 md:flex-1 lg:border-l lg:pl-8">
                    <PageHeader title={subject} desktopBackButton={false} />

                    <div className="flex items-center gap-4 pb-4 text-sm">
                        <Link href={PATH.singleBlogAuthor(String(author._id))} className="flex items-center gap-1">
                            <span
                                className={`flex aspect-square size-7 items-center justify-center rounded-full bg-bg-2 dark:bg-secondary-700`}
                            >
                                <Image
                                    src={author.profile_image ? author.profile_image : userIcon}
                                    alt="user"
                                    width={500}
                                    height={500}
                                    className={`${author.profile_image ? "h-full rounded-full object-cover" : "w-1/2"}`}
                                />
                            </span>
                            <p className="hidden text-gray-300 lg:flex">نویسنده: </p>
                            <p className="hover-transition truncate hover:text-primary-100 dark:hover:text-violet-400">
                                {author.first_name} {author.last_name}
                            </p>
                        </Link>

                        {readingTime && (
                            <span className="flex items-center gap-1 text-secondary-400 dark:text-gray-300">
                                <ClockIcon className="size-5 fill-secondary-400 dark:fill-secondary-100" />
                                <p className="hidden lg:flex">زمان مطالعه: </p>
                                {readingTime}
                            </span>
                        )}

                        <span className="flex items-center gap-1 text-secondary-400 dark:text-gray-300">
                            <ClockIcon className="size-5 fill-secondary-400 dark:fill-secondary-100" />
                            <p className="hidden lg:flex">{updatedAt ? "تاریخ به روزرسانی" : "تاریخ انتشار"}: </p>
                            {updatedAt ? showFullDate(updatedAt) : showFullDate(createdAt)}
                        </span>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: content }} className="text-lg"></div>

                    {tags && (
                        <div className="flex flex-col gap-4">
                            <h6>تگ ها</h6>
                            <div className="flex gap-2">
                                {tags.split(", ").map((tag) => (
                                    <span key={tag} className="rounded-lg bg-secondary-100 px-2 py-1 text-sm dark:bg-secondary-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {relatedBlogs && !!relatedBlogs.length && (
                        <div className="flex w-full flex-col gap-4 border-t pt-4">
                            <h3 className="text-lg font-semibold">بلاگ های مرتبط</h3>

                            <div className="np-scrollbar flex w-full gap-4 lg:overflow-x-auto">
                                {relatedBlogs.slice(0, 3).map((blog) => (
                                    <BlogCard
                                        key={String(blog._id)}
                                        blog={blog}
                                        link={PATH.singleBlog(blog.link)}
                                        className={`lg:w-1/2 xl:w-1/3 ${relatedBlogs!.length > 1 ? "w-11/12" : ""}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <aside className="no-scrollbar flex w-full flex-col gap-4 overflow-x-auto border-t pt-4 lg:min-w-[300px] lg:max-w-[300px] lg:overflow-y-auto lg:border-0 lg:pt-0">
                    <h2 className="text-lg font-semibold">آخرین بلاگ ها</h2>
                    {filteredBlogs.length ? (
                        <div>
                            {filteredBlogs.map((blog) => (
                                <BlogCard key={String(blog._id)} blog={blog} link={PATH.singleBlog(blog.link)} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-secondary-700 dark:text-secondary-100">هیچ بلاگی وجود ندارد.</p>
                    )}
                </aside>
            </section>
        </section>
    );
};

export default SingleBlogPage;
