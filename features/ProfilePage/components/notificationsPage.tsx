"use client";
import EmptyState from "@/shared/components/EmptyState";
import notificationImage from "@/assets/icons/svgs/notificationPage.svg";
import API from "@/shared/libs/api/endpoints";
import PATH from "@/shared/utils/path";
import { INotification } from "@/interfaces/general";
import PageHeader from "@/shared/components/PageHeader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotificationsList from "./NotificationsList";

const Notifications = () => {
    const { data: session } = useSession();
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [unReads, setUnReads] = useState<number | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                if (session?.user.userId) {
                    const response = await fetch(API.notification.notifications_list(session?.user.userId), {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        cache: "no-store",
                    });
                    const { results } = await response.json();
                    setNotifications(results);
                }
            } catch (error: any) {
                console.error(error);
            }
        })();
    }, [session?.user]);

    useEffect(() => {
        setUnReads(notifications.filter((item) => !item.isViewed).length);
    }, [notifications]);

    return session ? (
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
