import EditIcon from "@/assets/icons/components/Edit";
import TrashIcon from "@/assets/icons/components/Trash";
import { IBlog } from "@/interfaces/general";
import API from "@/shared/api";
import BreadCrumb from "@/shared/components/common/BreadCrumb";
import { showFullDate } from "@/shared/helper";
import PATH from "@/shared/path";
import { Metadata } from "next";
import Link from "next/link";

interface Props {
    params: { url: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data: IBlog = await getBlog(params.url);

    return {
        title: data.subject,
        description: data.content,
        keywords: data.keywords,
    };
}

const getBlog = async (url: string) => {
    try {
        const response = await fetch(`${API.blogs.single_blog(url)}`, {
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

const ProfileSingleBlogPage = async ({ params }: Props) => {
    const data: IBlog = await getBlog(params.url);

    return (
        <section className="flex w-full flex-1 flex-col gap-8">
            <div>
                <BreadCrumb
                    items={[
                        { title: "داشبورد", path: PATH.profile.main() },
                        { title: "بلاگ", path: PATH.profile.blog.blogs() },
                        { title: data.subject, path: PATH.singleBlog(data.link) },
                    ]}
                />

                <div>
                    <Link href={PATH.profile.blog.edit_blog(data.link)}>
                        <EditIcon className="fill-secondary-800 dark:fill-secondary-100 dark:hover:fill-white" />
                    </Link>

                    <TrashIcon className="fill-red-600 hover:fill-red-700" />
                </div>
            </div>

            <h1 className="text-2xl font-bold lg:text-3xl">{data.subject}</h1>
            <div className="flex items-center gap-4">
                <p>
                    نویسنده: {data.author.first_name} {data.author.last_name}
                </p>
                <p>تاریخ ایجاد: {showFullDate(data.createdAt)}</p>
            </div>

            <div dangerouslySetInnerHTML={{ __html: data.content }} className="text-lg"></div>

            <div className="flex flex-col gap-4">
                {data.tags && (
                    <div className="flex flex-col gap-4">
                        <h6>تگ ها</h6>
                        <div className="flex gap-2">
                            {data.tags.split(", ").map((tag) => (
                                <span className="rounded-lg bg-secondary-100 px-2 py-1 text-sm dark:bg-secondary-700">{tag}</span>
                            ))}
                        </div>
                    </div>
                )}

                {data.keywords && (
                    <div className="flex flex-col gap-4">
                        <h6>کلمات کلیدی</h6>
                        <div className="flex gap-2">
                            {data.keywords.split(", ").map((keyword) => (
                                <span className="rounded-lg bg-secondary-100 px-2 py-1 text-sm dark:bg-secondary-700">{keyword}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProfileSingleBlogPage;
