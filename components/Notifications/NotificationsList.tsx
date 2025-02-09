"use client";
import { INotification } from "@/interfaces/general";
import NotificationCard from "./NotificationCard";
import { useState } from "react";

interface Props {
    notifications: INotification[];
}

const NotificationsList = (props: Props) => {
    const [notifications, setNotifications] = useState(props.notifications || []);
    const [selectNotification, setSelectNotification] = useState({ id: "", status: false });

    return (
        <div className="no-scrollbar flex w-full flex-1 flex-col gap-4 overflow-y-auto lg:gap-2">
            {notifications.map((notification) => {
                return (
                    <NotificationCard
                        key={notification._id.toString()}
                        selectNotification={selectNotification}
                        notification={notification}
                        onDelete={(id) => setNotifications((prev) => prev.filter((item) => item._id !== id))}
                        onSelect={(id, status) => setSelectNotification({ id, status })}
                        onRead={(id, status) =>
                            setNotifications(
                                notifications.map((item) => {
                                    if (item._id === id) {
                                        notification.isViewed = status;
                                        return item;
                                    } else {
                                        return item;
                                    }
                                }),
                            )
                        }
                    />
                );
            })}
        </div>
    );
};

export default NotificationsList;
