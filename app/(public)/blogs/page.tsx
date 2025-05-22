import BlogCard from "@/features/Blog/components/BlogCard";
import Error500 from "@/shared/components/Error500";
import PageHeader from "@/shared/components/PageHeader";
import { RequestTypeEnum } from "@/shared/enums";
import { IBlog } from "@/interfaces/general";
import API from "@/shared/api";
import PATH from "@/shared/path";
import { Metadata } from "next";
import BreadCrumb from "@/shared/components/common/BreadCrumb";

export const revalidate = 30;
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
    const blogs: IBlog[] = await getBlogs();

    const title = "بلاگ ها";
    const url = PATH.blogs();

    return {
        title: title,
        keywords: blogs ? blogs.map((blog) => blog.keywords || "") : "",
        openGraph: { title: title, url: url },
        twitter: { title: title, site: url },
        other: {
            "twitter:url": url,
        },
    };
}

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

const Blogs = async () => {
    const blogs: IBlog[] = await getBlogs();

    if (!blogs) {
        return <Error500 />;
    }

    return (
        <section className="container flex w-full flex-1 flex-col items-start gap-4 lg:gap-8">
            <BreadCrumb items={[{ title: "بلاگ", path: PATH.blogs() }]} />

            <PageHeader title="بلاگ" mobileBackButton={false} desktopBackButton={false} />

            <div className="grid w-full gap-4 lg:grid-cols-3">
                {blogs.map((item) => (
                    <BlogCard key={String(item._id)} link={PATH.singleBlog(item.link)} blog={item} />
                ))}
            </div>
        </section>
    );
};

export default Blogs;
