"use client";
import EmptyState from "@/shared/components/EmptyState";
import notificationImage from "@/assets/icons/svgs/notificationPage.svg";
import API from "@/shared/libs/api/endpoints";
import PATH from "@/shared/utils/path";
import { INotification } from "@/interfaces/general";
import PageHeader from "@/shared/components/PageHeader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotificationsList from "./NotificationsList";
import { get } from "@/shared/libs/api/axios";
import { IPaginatedResponse } from "@/shared/interfaces";
import { authTokenClient } from "@/shared/constants/constant";

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

    return authTokenClient?.access ? (
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
    ) : (
        <div className="flex min-h-screen w-full flex-col gap-2 p-4 pb-20 md:flex-1">
            <h1 className="mb-5 text-3xl font-bold">پیام ها</h1>
            <EmptyState
                imgSrc={notificationImage}
                title="لطفاً وارد شوید"
                linkHref={`${PATH.login()}?redirect=${PATH.dashboard.notifications()}`}
                linkTitle="ورود به حساب کاربری"
            />
        </div>
    );
};

export default Notifications;
