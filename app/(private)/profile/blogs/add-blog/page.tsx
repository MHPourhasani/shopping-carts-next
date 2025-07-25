import PageHeader from "@/shared/components/PageHeader";
import PostForm from "@/features/Blog/components/PostForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "نوشتن بلاگ",
};

const ProfileAddBlogPage = () => {
    return (
        <section className="flex flex-1 flex-col gap-4">
            <PageHeader title="افزودن نوشته" />
            <PostForm />
        </section>
    );
};

export default ProfileAddBlogPage;
