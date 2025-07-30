import Profile from "@/features/Profile/components/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "اطلاعات شخصی",
};

const PersonalInfoPage = async () => {
    return <Profile />;
};

export default PersonalInfoPage;
