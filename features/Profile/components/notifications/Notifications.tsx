"use client";
import EmptyState from "@/shared/components/EmptyState";
import NotificationIcon from "@/assets/icons/components/Notificationbing";
import notificationImage from "@/assets/icons/svgs/notificationPage.svg";
import { useEffect, useRef, useState } from "react";
import API from "@/shared/libs/endpoints";
import { INotification } from "@/interfaces/general";
import NotificationsList from "./NotificationsList";
import { get } from "@/shared/libs/axios";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { DeviceSize } from "@/shared/enums";
import { useRouter } from "next/navigation";
import PATH from "@/shared/utils/path";
import { useLazyLoad } from "@/shared/hooks/useLazyLoad";
import Loader from "@/shared/components/Loader";
import Loading from "@/app/(private)/profile/loading";

const Notifications = () => {
    const [isShow, setIsShow] = useState(false);
    const [unReadsCount, setUnReadsCount] = useState<number | undefined>(undefined);
    const isMobile = useMediaQuery(DeviceSize.MOBILE);
    const router = useRouter();
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const { lists: notifications, isLoading } = useLazyLoad<INotification>({
        url: API.notification.list(),
        ref: loadMoreRef,
    });

    useEffect(() => {
        getunreadConutNotifications();
    }, []);

    const getunreadConutNotifications = async () => {
        const count = await get<number>(API.notification.unreadCount());
        setUnReadsCount(count);
    };

    return (
        <section className="relative flex flex-col gap-4">
            <span onClick={() => (isMobile ? router.push(PATH.profile.notifications()) : setIsShow(!isShow))} className="relative">
                {unReadsCount && <div className="absolute top-0 right-1 size-2 animate-pulse rounded-full bg-red-500" />}
                <NotificationIcon
                    className={`hover-transition hover:stroke-primary-100 cursor-pointer ${isShow ? "stroke-primary-100" : "stroke-gray-500"}`}
                />
            </span>

            {isShow && <div onClick={() => setIsShow(false)} className="fixed inset-0 z-10 bg-black/50" />}

            {isShow && (
                <div className="dark:bg-secondary-700 absolute top-10 left-0 z-20 flex h-96 max-h-96 max-w-[30rem] min-w-[28rem] flex-col gap-4 rounded-xl bg-white p-4 shadow-xl">
                    <span className="flex items-center justify-between">
                        <h3 className="font-semibold lg:text-lg">پیام ها</h3>
                        {!!unReadsCount && <span className="text-sm">{unReadsCount} خوانده نشده</span>}
                    </span>

                    <div className="no-scrollbar flex w-full flex-1 flex-col gap-2 overflow-y-auto">
                        {notifications ? (
                            notifications.length ? (
                                <>
                                    <NotificationsList notifications={notifications} />
                                    <div ref={loadMoreRef}>{isLoading && <Loader />}</div>
                                </>
                            ) : (
                                <EmptyState imgSrc={notificationImage} title="فعلا هیچ پیامی نیست." />
                            )
                        ) : (
                            <>
                                <div ref={loadMoreRef}>{isLoading && <Loader />}</div>
                                <Loading />
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Notifications;
