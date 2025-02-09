import AllUsers from "@/utils/pages/users";
import { getServerAuthSession } from "@/shared/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "کاربران",
};

const getUsers = async (userId: string) => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/auth/users?user_id=${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (response.ok) {
            const { data } = await response.json();
            return data;
        }
    } catch (error: any) {
        console.error(error);
    }
};

const ProfileUsersPage = async () => {
    const session = await getServerAuthSession();
    const users = await getUsers(session?.user.userId!);

    return <AllUsers users={users ? users : []} />;
};

export default ProfileUsersPage;
