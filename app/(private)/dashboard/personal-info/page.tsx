import Profile from "@/features/ProfilePage/components/profile";

import PATH from "@/shared/utils/path";
import { authToken } from "@/shared/utils/token";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "پروفایل",
};

const ProfilePage = async () => {
    if (!authToken.get()?.access) {
        redirect(`${PATH.login()}?redirect=${PATH.dashboard.main()}`);
    }

    return <Profile />;
};

export default ProfilePage;
