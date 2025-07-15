import Profile from "@/features/ProfilePage/components/profile";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پروفایل",
};

const ProfilePage = async () => {
    // if (!authTokenClient.get()?.access) {
    //     redirect(`${PATH.login()}?redirect=${PATH.dashboard.main()}`);
    // }

    return <Profile />;
};

export default ProfilePage;
