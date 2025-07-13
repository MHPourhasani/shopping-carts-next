import Notifications from "@/features/ProfilePage/components/notificationsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پیام ها",
};

const NotificationsPage = async () => {
    return <Notifications />;
};

export default NotificationsPage;
