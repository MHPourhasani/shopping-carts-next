import PostForm from "@/features/Blog/components/PostForm";
import { IPost } from "@/features/Blog/interfaces";
import Error500 from "@/shared/components/Error500";
import PageHeader from "@/shared/components/PageHeader";
import { get } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";
import { Metadata } from "next";

interface IProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const data = await getBlog(params.slug);

    return {
        title: data && data.title ? `ویرایش نوشته "${data?.title}"` : "ویرایش نوشته",
    };
}

const getBlog = async (slug: string) => {
    try {
        const data = await get<IPost>(API.blogs.singlePostBySlug(slug));
        return data;
    } catch (error) {
        console.error(error);
    }
};

const ProfileEditBlogPage = async ({ params }: IProps) => {
    const data = await getBlog(params.slug);

    if (!data?._id) return <Error500 />;
    return (
        <section className="flex flex-1 flex-col gap-4">
            <PageHeader title={`ویرایش نوشته "${data.title}"`} />
            <PostForm initialData={data} />
        </section>
    );
};

export default ProfileEditBlogPage;
