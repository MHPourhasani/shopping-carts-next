"use client";
import { INotification } from "@/interfaces/general";
import NotificationCard from "./NotificationCard";
import { useState } from "react";

interface Props {
    notifications: INotification[];
}

const NotificationsList = (props: Props) => {
    const [notifications, setNotifications] = useState(props.notifications || []);
    const [selectNotification, setSelectNotification] = useState("");

    return (
        <div className="no-scrollbar flex w-full flex-1 flex-col gap-4 overflow-y-auto lg:gap-2">
            {notifications.map((notification) => {
                return (
                    <NotificationCard
                        key={notification._id.toString()}
                        selectNotification={selectNotification}
                        notification={notification}
                        onDelete={(id) => setNotifications((prev) => prev.filter((item) => item._id !== id))}
                        onSelect={(id) => setSelectNotification(id)}
                        onRead={(id) =>
                            setNotifications(
                                notifications.map((item) => {
                                    if (item._id === id) {
                                        notification.isRead = true;
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
