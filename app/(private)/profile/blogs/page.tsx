import AddIcon from "@/assets/icons/components/Add";
import BlogListItem from "@/features/Blog/components/BlogListItem";
import Error500 from "@/shared/components/Error500";
import PageHeader from "@/shared/components/PageHeader";
import { IBlog } from "@/interfaces/general";
import PATH from "@/shared/path";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "بلاگ ها",
};

const getBlogs = async () => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/blogs/`, {
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

const ProfileBlogs = async () => {
    const blogs: IBlog[] = await getBlogs();

    if (!blogs) {
        return <Error500 />;
    }

    return (
        <section className="flex flex-1 flex-col gap-4">
            <PageHeader title="نوشته ها" desktopBackButton={false}>
                <Link href={PATH.profile.blog.add_blog()} className="flex gap-2 text-primary-100 dark:text-violet-400">
                    <AddIcon className="h-auto w-6 cursor-pointer stroke-primary-100 dark:stroke-violet-400" />
                    افزودن نوشته
                </Link>
            </PageHeader>

            <div className="flex flex-col gap-4">
                {blogs.map((item) => (
                    <BlogListItem key={String(item._id)} link={PATH.profile.blog.edit_blog(item.link)} blog={item} />
                ))}
            </div>
        </section>
    );
};

export default ProfileBlogs;
