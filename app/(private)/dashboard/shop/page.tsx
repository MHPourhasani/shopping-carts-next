import { IShop } from "@/interfaces/general";

import ShopInformation from "@/features/ProfilePage/components/shop";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const data: IShop = await getShop(session?.user.userId!);

    return {
        title: `فروشگاه ${data.name}`,
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
            const { result } = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
};

const ProfileShopPage = async () => {
    const data: IShop = await getShop(session?.user.userId!);

    return <ShopInformation shop={data} />;
};

export default ProfileShopPage;
