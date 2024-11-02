import { getServerAuthSession } from "@/utils/auth";
import Profile from "@/utils/pages/profile/profile";
import PATH from "@/utils/path";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "پروفایل",
};

const ProfilePage = async () => {
    const session = await getServerAuthSession();
    if (!session) {
        redirect(`${PATH.login()}?redirect=${PATH.profile.main()}`);
    }

    return <Profile />;
};

export default ProfilePage;
