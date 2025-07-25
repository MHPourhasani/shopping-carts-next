import PostForm from "@/features/Blog/components/PostForm";
import { IPost } from "@/features/Blog/interfaces";
import Error500 from "@/shared/components/Error500";
import PageHeader from "@/shared/components/PageHeader";
import { get } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";
import { Metadata } from "next";

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data = await getBlog(params.slug);

    return {
        title: data && data.title ? `ویرایش نوشته "${data?.title}"` : "ویرایش نوشته",
    };
}

const getBlog = async (slug: string) => {
    const data = await get<IPost>(API.blogs.singlePostBySlug(slug));
    return data;
};

const ProfileEditBlogPage = async ({ params }: Props) => {
    const data: IPost = await getBlog(params.slug);

    if (!data) {
        return <Error500 />;
    }
    return (
        <section className="flex flex-1 flex-col gap-4">
            <PageHeader title={`ویرایش نوشته "${data.title}"`} />
            <PostForm initialData={data} />
        </section>
    );
};

export default ProfileEditBlogPage;
