import Profile from "@/features/ProfilePage/components/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "اطلاعات شخصی",
};

const PesonalInfoPage = () => {
    return <Profile />;
};

export default PesonalInfoPage;
