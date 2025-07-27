import EmptyState from "@/shared/components/EmptyState";
import Favorites from "@/features/ProfilePage/components/Favorites";
import notificationImage from "@/assets/icons/svgs/notificationPage.svg";
import { Metadata } from "next";
import PATH from "@/shared/utils/path";
import PageHeader from "@/shared/components/PageHeader";

export const metadata: Metadata = {
    title: "علاقه مندی ها",
};

const getFavoritesProducts = async () => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/favorites/`, {
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
    const favoriteProducts = await getFavoritesProducts();

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
