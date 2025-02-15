import EmptyState from "@/components/EmptyState";
import Favorites from "@/features/ProfilePage/components/favorites";
import notificationImage from "@/assets/icons/svgs/notificationPage.svg";
import { getServerAuthSession } from "@/shared/auth";
import { Metadata } from "next";
import PATH from "@/shared/path";
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
            const { result } = await response.json();
            return result.products;
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
