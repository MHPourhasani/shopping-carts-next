import EmptyState from "@/components/EmptyState";
import Favorites from "@/utils/pages/favorites";
import notificationImage from "@/assets/icons/svgs/notificationPage.svg";
import { getServerAuthSession } from "@/utils/auth";
import { Metadata } from "next";
import PATH from "@/utils/path";
import PageHeader from "@/components/PageHeader/PageHeader";

export const metadata: Metadata = {
    title: "علاقه مندی ها",
};

const getFavoritesProducts = async (user_id: string) => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/favorites/${user_id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-cache",
        });
        if (response.ok) {
            const { data } = await response.json();
            return data.products;
        }
    } catch (error) {
        console.error(error);
    }
};

const FavoritesPage = async () => {
    const session = await getServerAuthSession();
    const favoriteProducts = await getFavoritesProducts(session?.user.userId!);

    return favoriteProducts ? (
        <Favorites products={favoriteProducts ? favoriteProducts : []} />
    ) : (
        <div className="flex w-full flex-1 flex-col gap-2">
            <PageHeader title="علاقه مندی های من" desktopBackButton={false} />
            <EmptyState
                imgSrc={notificationImage}
                description="فعلا هیچ علاقه مندی نیست."
                linkTitle="جست و جو در دسته بندی ها"
                linkHref={PATH.home()}
            />
        </div>
    );
};

export default FavoritesPage;
