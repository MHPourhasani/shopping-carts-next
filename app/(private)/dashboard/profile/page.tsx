import Profile from "@/features/ProfilePage/components/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پروفایل",
};

const ProfilePage = () => {
    return <Profile />;
};

export default ProfilePage;
