import BlogCard from "@/components/Blog/BlogCard";
import BreadCrumb from "@/components/common/BreadCrumb";
import Error500 from "@/components/Error500";
import PageHeader from "@/components/PageHeader/PageHeader";
import { RequestTypeEnum } from "@/interfaces/enums";
import { BlogInterface } from "@/interfaces/general";
import API from "@/utils/api";
import PATH from "@/utils/path";
import { Metadata } from "next";

export const revalidate = 30;
export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
    const blogs: BlogInterface[] = await getBlogs();

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
    const blogs: BlogInterface[] = await getBlogs();

    if (!blogs) {
        return <Error500 />;
    }

    return (
        <section className="flex w-full flex-1 flex-col items-start gap-4 lg:gap-8">
            <BreadCrumb
                items={[
                    { title: "بلاگ", path: PATH.blogs() },
                ]}
            />

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
