"use client";
import EmptyState from "@/shared/components/EmptyState";
import notificationImage from "@/assets/icons/svgs/notificationPage.svg";
import API from "@/shared/libs/endpoints";
import { INotification } from "@/interfaces/general";
import PageHeader from "@/shared/components/PageHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotificationsList from "./NotificationsList";
import { get } from "@/shared/libs/axios";
import { IPaginatedResponse } from "@/shared/interfaces";

const Notifications = () => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [unReads, setUnReads] = useState<number | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const data = await get<IPaginatedResponse<INotification>>(API.notification.list());
                setNotifications(data.results);
            } catch (error: any) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        setUnReads(notifications.filter((item) => !item.isRead).length);
    }, [notifications]);

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="پیام ها">{!!unReads && <span>{unReads} خوانده نشده</span>}</PageHeader>

            <div className="flex w-full flex-1 flex-col gap-4">
                {notifications.length ? (
                    <NotificationsList notifications={notifications} />
                ) : (
                    <EmptyState
                        imgSrc={notificationImage}
                        title="فعلا هیچ پیامی نیست."
                        btnFunction={() => router.refresh()}
                        btnTitle="به روزرسانی "
                    />
                )}
            </div>
        </section>
    );
};

export default Notifications;
