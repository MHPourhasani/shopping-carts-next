import PostCard from "@/features/Blog/components/PostCard";
import Error500 from "@/shared/components/Error500";
import PageHeader from "@/shared/components/PageHeader";
import { IPost } from "@/interfaces/general";
import API from "@/shared/libs/api/endpoints";
import PATH from "@/shared/utils/path";
import { Metadata } from "next";
import BreadCrumb from "@/shared/components/common/BreadCrumb";
import { get } from "@/shared/libs/api/client";
import { IPaginatedResponse } from "@/shared/interfaces";

export const revalidate = 30;
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
    const blogs = await getBlogs();

    const title = "بلاگ ها";
    const url = PATH.blogs();

    return {
        title: title,
        // keywords: blogs.length ? blogs.map((blog) => blog.keywords?.join(",") || []) : "",
        openGraph: { title: title, url: url },
        twitter: { title: title, site: url },
        other: {
            "twitter:url": url,
        },
    };
}

const getBlogs = async () => {
    const data = await get<IPaginatedResponse<IPost>>(API.blogs.posts());
    return data.results;
};

const Blogs = async () => {
    const blogs = await getBlogs();

    if (!blogs) {
        return <Error500 />;
    }

    return (
        <section className="container flex w-full flex-1 flex-col items-start gap-4 lg:gap-8">
            <BreadCrumb items={[{ title: "بلاگ", path: PATH.blogs() }]} />

            <PageHeader title="بلاگ" mobileBackButton={false} desktopBackButton={false} />

            <div className="grid w-full gap-4 lg:grid-cols-3">
                {blogs.map((item) => (
                    <PostCard key={String(item._id)} post={item} className="max-w-full" />
                ))}
            </div>
        </section>
    );
};

export default Blogs;
