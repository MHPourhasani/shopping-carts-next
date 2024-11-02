import { ShopInterface } from "@/interfaces/general";
import { getServerAuthSession } from "@/utils/auth";
import ShopInformation from "@/utils/pages/shop";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const session = await getServerAuthSession();
    const data: { shop: ShopInterface } = await getShop(session?.user.userId!);

    return {
        title: `فروشگاه ${data.shop.name}`,
    };
}

const getShop = async (user_id: string) => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/shop?user_id=${user_id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (response.ok) {
            const { results } = await response.json();
            return results;
        }
    } catch (error) {
        console.error(error);
    }
};

const ProfileShopPage = async () => {
    const session = await getServerAuthSession();
    const data: { shop: ShopInterface } = await getShop(session?.user.userId!);

    return <ShopInformation shop={data.shop} />;
};

export default ProfileShopPage;
