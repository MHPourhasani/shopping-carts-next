import Notifications from "@/utils/pages/profile/notifications";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پیام ها",
};

const NotificationsPage = async () => {
    return <Notifications />;
};

export default NotificationsPage;
