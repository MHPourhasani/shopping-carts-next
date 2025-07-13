import AddAndEditBlog from "@/features/Blog/components/AddAndEditBlog";
import Error500 from "@/shared/components/Error500";
import PageHeader from "@/shared/components/PageHeader";
import { IPost } from "@/interfaces/general";
import API from "@/shared/libs/api/endpoints";
import { Metadata } from "next";

interface Props {
    params: { url: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data: IPost = await getBlog(params.url);

    return {
        title: data && data.subject ? `ویرایش نوشته "${data?.subject}"` : "ویرایش نوشته",
    };
}

const getBlog = async (url: string) => {
    try {
        const response = await fetch(API.blogs.single_blog(url), {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        if (response.ok) {
            const { result } = await response.json();
            return result;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const ProfileEditBlogPage = async ({ params }: Props) => {
    const data: IPost = await getBlog(params.url);

    if (!data) {
        return <Error500 />;
    }
    return (
        <section className="flex flex-1 flex-col gap-4">
            <PageHeader title={`ویرایش نوشته "${data.subject}"`} />
            <AddAndEditBlog blog={data} isEdit />
        </section>
    );
};

export default ProfileEditBlogPage;
