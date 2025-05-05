"use client";
import { INotification } from "@/interfaces/general";
import Button from "@/shared/components/common/Button";
import TrashIcon from "@/assets/icons/components/Trash";
import API from "@/shared/api";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import toastMessage from "@/shared/toastMessage";
import { showFullDate } from "@/shared/helper";
import { RequestTypeEnum } from "@/shared/enums";

interface Props {
    notification: INotification;
    onDelete: (id: string) => void;
    onSelect: (id: string, status: boolean) => void;
    onRead: (id: string, status: boolean) => void;
    selectNotification: { id: string; status: boolean };
}

const NotificationCard = ({ notification, onDelete, onRead, selectNotification, onSelect }: Props) => {
    const { _id: id, title, message, isViewed, createdAt } = notification;
    const { data: session } = useSession();

    const deleteHandler = async (notificationId: string) => {
        const res = await fetch(API.notification.single_notification(notificationId, RequestTypeEnum.CSR), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: session!.user.userId,
            }),
        });

        if (res.ok) {
            onDelete(notificationId);
            toast.success(toastMessage.notification.successfullyDeleted);
        } else {
            toast.error(toastMessage.notification.failedDeleted);
        }
    };

    const convertToReadHandler = async (notificationId: string, status: boolean) => {
        const res = await fetch(API.notification.single_notification(notificationId, RequestTypeEnum.CSR), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: session!.user.userId,
                status,
            }),
        });
        if (res.ok) {
            onRead(notificationId, status);
        }
    };

    return (
        <div
            onClick={() => {
                if (!isViewed && selectNotification.id !== id) {
                    convertToReadHandler(id, true);
                }
                onSelect(id, !selectNotification.status);
            }}
            className={`flex w-full flex-col items-start justify-between gap-4 rounded-lg bg-bg-2 p-4 dark:bg-secondary-700 lg:gap-2 dark:lg:bg-secondary-600`}
        >
            <div className="flex w-full items-center justify-between">
                <h3 className="font-medium">{title}</h3>
                <div className="flex items-center gap-4">
                    {!isViewed && selectNotification.id !== id && <div className="size-2 rounded-full bg-red-500" />}

                    {selectNotification.id === id && (
                        <TrashIcon onClick={() => deleteHandler(id)} className="cursor-pointer fill-red-600" />
                    )}
                </div>
            </div>

            <span className="flex w-full flex-col gap-4 lg:gap-2">
                <span className="flex w-full justify-between gap-2">
                    <p className={`text-gray-500 ${selectNotification.id !== id && "truncate"}`}>{message}</p>
                    {selectNotification.id !== id && <span className="cursor-pointer text-primary-100">بیشتر</span>}
                </span>

                <span className="text-sm text-gray-400">{showFullDate(createdAt)}</span>

                {selectNotification.id === id && (
                    <Button
                        variant="Secondary"
                        onClick={() => {
                            convertToReadHandler(id, false);
                            onSelect("", false);
                        }}
                        className="w-full rounded-lg p-2"
                    >
                        تبدیل به خوانده نشده
                    </Button>
                )}
            </span>
        </div>
    );
};

export default NotificationCard;
