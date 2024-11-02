import { getServerAuthSession } from "@/utils/auth";
import Address from "@/utils/pages/address";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "آدرس ها",
};

const getAllAddress = async (user_id: string) => {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}/profile/address?userId=${user_id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.error(error);
    }
};

const AddressPage = async () => {
    const session = await getServerAuthSession();
    const addresses = await getAllAddress(session?.user.userId!);

    return <Address addresses={addresses} />;
};

export default AddressPage;
