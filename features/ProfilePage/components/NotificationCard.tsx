"use client";
import { INotification } from "@/interfaces/general";
import TrashIcon from "@/assets/icons/components/Trash";
import API from "@/shared/libs/api/endpoints";
import { toast } from "react-toastify";
import toastMessage from "@/shared/utils/toastMessage";
import { showFullDate } from "@/shared/utils/utils";
import { del, patch } from "@/shared/libs/api/axios";

interface Props {
    notification: INotification;
    onDelete: (id: string) => void;
    onSelect: (id: string) => void;
    onRead: (id: string) => void;
    selectNotification: string;
}

const NotificationCard = ({ notification, onDelete, onRead, selectNotification, onSelect }: Props) => {
    const { _id: id, title, message, isRead, createdAt } = notification;

    const deleteHandler = async (id: string) => {
        try {
            const res = await del<{ success: boolean }>(API.notification.singleNotification(id));
            if (res.success) {
                onDelete(id);
                toast.success(toastMessage.notification.successfullyDeleted);
            }
        } catch (error) {
            toast.error(toastMessage.notification.failedDeleted);
        }
    };

    const convertToReadHandler = async (id: string) => {
        try {
            const res = await patch<{ success: boolean }>(API.notification.readSingleNotification(id));
            if (res.success) onRead(id);
        } catch (error) {
            toast.error("خطا");
        }
    };

    return (
        <div
            onClick={() => {
                if (!isRead && selectNotification !== id) {
                    console.log(id);
                    convertToReadHandler(id);
                }
                onSelect(id);
            }}
            className={`bg-bg-2 dark:bg-secondary-700 dark:lg:bg-secondary-600 flex w-full flex-col items-start justify-between gap-4 rounded-lg p-4 lg:gap-2`}
        >
            <div className="flex w-full items-center justify-between">
                <h3 className="font-medium">{title}</h3>
                <div className="flex items-center gap-4">
                    {!isRead && selectNotification !== id && <div className="size-2 rounded-full bg-red-500" />}

                    {selectNotification === id && <TrashIcon onClick={() => deleteHandler(id)} className="cursor-pointer fill-red-600" />}
                </div>
            </div>

            <div className="flex w-full flex-col gap-4 lg:gap-2">
                <span className="flex w-full justify-between gap-2">
                    <p className={`text-gray-500 ${selectNotification !== id && "truncate"}`}>{message}</p>
                    {selectNotification !== id && <span className="text-primary-100 cursor-pointer">بیشتر</span>}
                </span>

                <span className="text-sm text-gray-400">{showFullDate(createdAt)}</span>
            </div>
        </div>
    );
};

export default NotificationCard;
