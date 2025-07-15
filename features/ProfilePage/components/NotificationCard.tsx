"use client";
import { INotification } from "@/interfaces/general";
import TrashIcon from "@/assets/icons/components/Trash";
import API from "@/shared/libs/api/endpoints";
import { toast } from "react-toastify";
import toastMessage from "@/shared/utils/toastMessage";
import { showFullDate } from "@/shared/utils/utils";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";

interface Props {
    notification: INotification;
    onDelete: (id: string) => void;
    onSelect: (id: string, status: boolean) => void;
    onRead: (id: string, status: boolean) => void;
    selectNotification: { id: string; status: boolean };
}

const NotificationCard = ({ notification, onDelete, onRead, selectNotification, onSelect }: Props) => {
    const { _id: id, title, message, isViewed, createdAt } = notification;

    const deleteHandler = async (id: string) => {
        const res = await fetch(API.notification.single_notification(id), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            onDelete(id);
            toast.success(toastMessage.notification.successfullyDeleted);
        } else {
            toast.error(toastMessage.notification.failedDeleted);
        }
    };

    const convertToReadHandler = async (id: string, status: boolean) => {
        const res = await fetch(API.notification.single_notification(id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status,
            }),
        });
        if (res.ok) {
            onRead(id, status);
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
            className={`bg-bg-2 dark:bg-secondary-700 dark:lg:bg-secondary-600 flex w-full flex-col items-start justify-between gap-4 rounded-lg p-4 lg:gap-2`}
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
                    {selectNotification.id !== id && <span className="text-primary-100 cursor-pointer">بیشتر</span>}
                </span>

                <span className="text-sm text-gray-400">{showFullDate(createdAt)}</span>

                {selectNotification.id === id && (
                    <Button
                        variant="secondary"
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
