import PageHeader from "@/components/PageHeader/PageHeader";
import AddAndEditBlog from "@/components/Blog/AddAndEditBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "نوشتن بلاگ",
};

const ProfileAddBlogPage = () => {
    return (
        <section className="flex flex-1 flex-col gap-4">
            <PageHeader title="افزودن نوشته" />
            <AddAndEditBlog />
        </section>
    );
};

export default ProfileAddBlogPage;
