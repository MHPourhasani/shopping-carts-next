import Settings from "@/features/Profile/components/Settings";
import { Metadata } from "next";

export const revalidate = 30;
export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "تنظیمات",
};

const SettingsPage = () => {
    return <Settings />;
};

export default SettingsPage;
