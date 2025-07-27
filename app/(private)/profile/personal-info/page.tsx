import Profile from "@/features/ProfilePage/components/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "اطلاعات شخصی",
};

const PersonalInfoPage = async () => {
    return <Profile />;
};

export default PersonalInfoPage;
