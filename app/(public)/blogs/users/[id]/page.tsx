import BlogCard from "@/components/Blog/BlogCard";
import { IBlog, IUser } from "@/interfaces/general";
import API from "@/shared/api";
import PATH from "@/shared/path";
import { Metadata } from "next";
import Image from "next/image";
import userIcon from "@/assets/icons/svgs/user.svg";
import { RequestTypeEnum } from "@/shared/enums";
import BreadCrumb from "@/shared/components/common/BreadCrumb";

interface Props {
    params: { id: string };
}

interface DataInterface {
    user: IUser;
    blogs: IBlog[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data: DataInterface = await getUser(params.id);
    const { blogs } = data;

    const title = `نویسنده در ${process.env.shop_name}`;
    const url = PATH.singleBlogAuthor(params.id);

    return {
        title: title,
        keywords: blogs.map((blog) => blog.keywords || ""),
        alternates: { canonical: url },
        openGraph: { title: title, url: url },
        twitter: { title: title, site: url },
        other: {
            "twitter:url": url,
        },
    };
}

const getUser = async (id: string) => {
    try {
        const response = await fetch(API.blogs.blog_author(id, RequestTypeEnum.SSR), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const SingleBlogAuthorPage = async ({ params }: Props) => {
    const data: DataInterface = await getUser(params.id);
    const { user, blogs } = data;

    return (
        <section className="flex w-full flex-1 flex-col gap-8">
            <BreadCrumb
                items={[
                    { title: "بلاگ", path: PATH.blogs() },
                    { title: "نویسندگان", path: "" },
                    { title: user.first_name + " " + user.last_name || user.email, path: PATH.singleBlogAuthor(String(user._id)) },
                ]}
            />

            <div className="flex flex-col gap-8 lg:gap-14">
                <div className="flex items-center gap-4 rounded-xl p-4 shadow-lg dark:bg-secondary-700 lg:gap-8">
                    <span className={`flex aspect-square size-20 items-center justify-center rounded-full bg-bg-2 dark:bg-secondary-600`}>
                        <Image
                            src={user.profile_image ? user.profile_image : userIcon}
                            alt="user"
                            width={500}
                            height={500}
                            className={`${user.profile_image ? "h-full rounded-full object-cover" : "w-1/2"}`}
                        />
                    </span>
                    <p className="truncate lg:text-xl">{user.first_name + " " + user.last_name || user.email}</p>
                </div>

                <div className="flex flex-col gap-4 lg:gap-6">
                    <h1 className="text-lg font-bold lg:text-xl">مقالات منتشر شده</h1>
                    <div className="grid w-full gap-4 lg:grid-cols-3">
                        {blogs.map((item) => (
                            <BlogCard key={String(item._id)} link={PATH.singleBlog(item.link)} blog={item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleBlogAuthorPage;
