import Notifications from "@/features/Profile/components/notifications/NotificationsPage";
import { INotification } from "@/interfaces/general";
import { IPaginatedResponse } from "@/shared/interfaces";
import { get } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پیام ها",
};

const getNotifications = async () => {
    const data = await get<IPaginatedResponse<INotification>>(API.notification.list());
    return data;
};

const getunreadConutNotifications = async () => {
    const count = await get<number>(API.notification.unreadCount());
    return count;
};

const NotificationsPage = async () => {
    const data = await getNotifications();
    const unreadConut = await getunreadConutNotifications();

    return <Notifications initial={data} unreadConut={unreadConut} />;
};

export default NotificationsPage;
