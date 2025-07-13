import { IPost } from "@/interfaces/general";
import API from "@/shared/libs/api/endpoints";
import PATH from "@/shared/path";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import userIcon from "@/assets/icons/svgs/user.svg";
import ClockIcon from "@/assets/icons/components/Clock";
import PostCard from "@/features/Blog/components/PostCard";
import { showFullDate } from "@/shared/helper";
import PageHeader from "@/shared/components/PageHeader";
import BreadCrumb from "@/shared/components/common/BreadCrumb";
import { get } from "@/shared/libs/api/client";

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data: IPost = await getBlog(params.slug);

    const title = "بلاگ " + data.title;
    const description = data.content;
    const url = PATH.singleBlog(data.slug);

    return {
        title: title,
        description: description,
        keywords: data.keywords ?? "",
        alternates: { canonical: url },
        openGraph: { title: title, description: description, url: url },
        twitter: { title: title, description: description },
        other: { "twitter:url": url },
    };
}

const getBlog = async (slug: string) => {
    const data = await get<IPost>(API.blogs.singlePost(slug));
    return data;
};

const getBlogs = async () => {
    try {
        const response = await fetch(API.blogs.posts(), {
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
    const data = await getBlog(params.slug);
    const blogs: IPost[] = await getBlogs();
    const filteredBlogs = blogs.filter((blog) => blog.slug !== params.slug);

    const { title, slug, author, updatedAt, createdAt, tags, content } = data;

    return (
        <section className="container flex w-full flex-1 flex-col gap-8">
            <BreadCrumb
                items={[
                    { title: "بلاگ", path: PATH.blogs() },
                    { title: title, path: PATH.singleBlog(slug) },
                ]}
            />

            <section className="flex w-full flex-col gap-4 lg:flex-row lg:gap-8">
                <div className="flex flex-col gap-8 md:flex-1 lg:border-l lg:pl-8">
                    <PageHeader title={title} desktopBackButton={false} />

                    <div className="flex items-center gap-4 pb-4 text-sm">
                        <Link href={PATH.singleBlogAuthor(String(author._id))} className="flex items-center gap-1">
                            <span
                                className={`bg-bg-2 dark:bg-secondary-700 flex aspect-square size-7 items-center justify-center rounded-full`}
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
                            <p className="hover-transition hover:text-primary-100 truncate dark:hover:text-violet-400">
                                {author.first_name} {author.last_name}
                            </p>
                        </Link>

                        {/* {readingTime && (
                            <span className="text-secondary-400 flex items-center gap-1 dark:text-gray-300">
                                <ClockIcon className="fill-secondary-400 dark:fill-secondary-100 size-5" />
                                <p className="hidden lg:flex">زمان مطالعه: </p>
                                {readingTime}
                            </span>
                        )} */}

                        <span className="text-secondary-400 flex items-center gap-1 dark:text-gray-300">
                            <ClockIcon className="fill-secondary-400 dark:fill-secondary-100 size-5" />
                            <p className="hidden lg:flex">{updatedAt ? "تاریخ به روزرسانی" : "تاریخ انتشار"}: </p>
                            {updatedAt ? showFullDate(updatedAt) : showFullDate(createdAt)}
                        </span>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: content }} className="text-lg break-all whitespace-pre-line"></div>

                    {!!tags.length && (
                        <div className="flex flex-col gap-4">
                            <h6>تگ ها</h6>
                            <div className="flex gap-2">
                                {tags.map((tag) => (
                                    <span key={tag} className="bg-secondary-100 dark:bg-secondary-700 rounded-lg px-2 py-1 text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* {relatedBlogs && !!relatedBlogs.length && (
                        <div className="flex w-full flex-col gap-4 border-t pt-4">
                            <h3 className="text-lg font-semibold">بلاگ های مرتبط</h3>

                            <div className="np-scrollbar flex w-full gap-4 lg:overflow-x-auto">
                                {relatedBlogs.slice(0, 3).map((post) => (
                                    <PostCard
                                        key={String(post._id)}
                                        post={post}
                                        className={`lg:w-1/2 xl:w-1/3 ${relatedBlogs!.length > 1 ? "w-11/12" : ""}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )} */}
                </div>

                <aside className="no-scrollbar flex w-full flex-col gap-4 overflow-x-auto border-t pt-4 lg:max-w-[300px] lg:min-w-[300px] lg:overflow-y-auto lg:border-0 lg:pt-0">
                    <h2 className="text-lg font-semibold">آخرین بلاگ ها</h2>
                    {filteredBlogs.length ? (
                        <div>
                            {filteredBlogs.map((blog) => (
                                <PostCard key={String(blog._id)} post={blog} />
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
