import AddIcon from "@/assets/icons/components/Add";
import { Button } from "@/components/ui/button";
import PostListItem from "@/features/Blog/components/PostListItem";
import { IPost } from "@/features/Blog/interfaces";
import Error500 from "@/shared/components/Error500";
import PageHeader from "@/shared/components/PageHeader";
import { IPaginatedResponse } from "@/shared/interfaces";
import { get } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";
import PATH from "@/shared/utils/path";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "بلاگ ها",
};

const getBlogs = async () => {
    const data = await get<IPaginatedResponse<IPost>>(API.blogs.posts());
    return data.results;
};

const ProfileBlogs = async () => {
    const blogs = await getBlogs();

    if (!blogs) {
        return <Error500 />;
    }

    return (
        <section className="flex flex-1 flex-col gap-4">
            <PageHeader title="نوشته ها" desktopBackButton={false}>
                <Link href={PATH.profile.blog.add_blog()}>
                    <Button variant="text" className="text-primary-100 group cursor-pointer px-0">
                        <AddIcon className="stroke-primary-100 size-5 cursor-pointer transition-all ease-in-out group-hover:stroke-white lg:size-6" />
                        افزودن نوشته
                    </Button>
                </Link>
            </PageHeader>

            <div className="flex flex-col gap-4">
                {blogs.map((item) => (
                    <PostListItem key={String(item._id)} link={PATH.profile.blog.edit_blog(item.slug)} post={item} />
                ))}
            </div>
        </section>
    );
};

export default ProfileBlogs;
