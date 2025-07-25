import Notifications from "@/features/ProfilePage/components/notifications/notificationsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پیام ها",
};

const NotificationsPage = async () => {
    return <Notifications />;
};

export default NotificationsPage;
