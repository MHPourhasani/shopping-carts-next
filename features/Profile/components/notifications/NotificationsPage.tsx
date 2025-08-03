"use client";
import EmptyState from "@/shared/components/EmptyState";
import notificationImage from "@/assets/icons/svgs/notificationPage.svg";
import API from "@/shared/libs/endpoints";
import { INotification } from "@/interfaces/general";
import PageHeader from "@/shared/components/PageHeader";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import NotificationsList from "./NotificationsList";
import { IPaginatedResponse } from "@/shared/interfaces";
import Loading from "@/app/loading";
import { useLazyLoad } from "@/shared/hooks/useLazyLoad";

interface IProps {
    initial?: IPaginatedResponse<INotification>;
    unreadConut: number;
}

const Notifications = ({ initial, unreadConut }: IProps) => {
    const router = useRouter();
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const { lists: notifications, isLoading } = useLazyLoad<INotification>({
        url: API.notification.list(),
        ref: loadMoreRef,
        initial,
    });

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="پیام ها">
                <span>{unreadConut} خوانده نشده</span>
            </PageHeader>

            <div className="flex w-full flex-1 flex-col gap-4">
                {notifications ? (
                    notifications.length ? (
                        <>
                            <NotificationsList notifications={notifications} />
                            <div ref={loadMoreRef}>{isLoading && <Loading />}</div>
                        </>
                    ) : (
                        <EmptyState
                            imgSrc={notificationImage}
                            title="فعلا هیچ پیامی نیست."
                            btnFunction={() => router.refresh()}
                            btnTitle="به روزرسانی "
                        />
                    )
                ) : (
                    <Loading />
                )}
            </div>
        </section>
    );
};

export default Notifications;
