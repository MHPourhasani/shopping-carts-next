"use client";
import EmptyState from "@/components/EmptyState";
import NotificationIcon from "@/assets/icons/components/Notificationbing";
import NotificationsList from "../Notifications/NotificationsList";
import notificationImage from "@/assets/icons/svgs/notificationPage.svg";
import { useEffect, useState } from "react";
import API from "@/utils/api";
import { useSession } from "next-auth/react";
import { NotificationInterface, RequestTypeEnum } from "@/interfaces/general";

const DashboardNotifications = () => {
    const { data: session } = useSession();
    const [isShow, setIsShow] = useState(false);
    const [notifications, setNotifications] = useState<NotificationInterface[] | undefined>(undefined);
    const [unReads, setUnReads] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (session?.user.userId) {
            getNotifications();
        }
    }, [session?.user.userId]);

    const getNotifications = async () => {
        try {
            const response = await fetch(API.notification.notifications_list(session?.user.userId!, RequestTypeEnum.CSR), {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                cache: "no-store",
            });
            if (response.ok) {
                const { results } = await response.json();
                setNotifications(results);
                setUnReads(results.filter((item: NotificationInterface) => !item.isViewed).length);
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <section className="relative flex flex-col gap-4">
            <span onClick={() => setIsShow(!isShow)} className="relative">
                {notifications && notifications.find((item) => !item.isViewed) && (
                    <div className="absolute right-1 top-0 size-2 animate-pulse rounded-full bg-red-500" />
                )}
                <NotificationIcon
                    className={`hover-transition cursor-pointer hover:stroke-primary-100 ${isShow ? "stroke-primary-100" : "stroke-gray-500"}`}
                />
            </span>

            {isShow && <div onClick={() => setIsShow(false)} className="fixed inset-0 z-10 bg-black/50" />}

            {isShow && (
                <div className="absolute left-0 top-10 z-20 flex h-96 max-h-96 min-w-[28rem] max-w-[30rem] flex-col gap-4 rounded-xl bg-white p-4 shadow-xl dark:bg-secondary-700">
                    <span className="flex items-center justify-between">
                        <h3 className="font-semibold lg:text-lg">پیام ها</h3>
                        {!!unReads && <span className="text-sm">{unReads} خوانده نشده</span>}
                    </span>

                    <div className="no-scrollbar flex w-full flex-1 flex-col gap-2 overflow-y-auto">
                        {notifications && notifications.length ? (
                            <NotificationsList notifications={notifications} />
                        ) : (
                            <EmptyState imgSrc={notificationImage} title="فعلا هیچ پیامی نیست." />
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default DashboardNotifications;
