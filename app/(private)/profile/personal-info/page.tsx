import { getServerAuthSession } from "@/shared/auth";
import Profile from "@/utils/pages/profile/profile";
import PATH from "@/shared/path";
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
