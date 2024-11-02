"use client";
import EyeIcon from "@/assets/icons/components/Eye";
import TrashIcon from "@/assets/icons/components/Trash";
import EmptyState from "@/components/EmptyState";
import PageHeader from "@/components/PageHeader/PageHeader";
import ChangeRole from "@/components/Profile/ChangeRole";
import { UserInterface } from "@/interfaces/general";
import toastMessage from "@/utils/toastMessage";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import PATH from "../path";

interface Props {
    users: UserInterface[];
}

const AllUsers = (props: Props) => {
    const [users, setUsers] = useState(props.users);

    const deleteUserHandler = async (user: UserInterface) => {
        const res = await fetch(`/api/auth/users/${user._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            setUsers(users.filter((item) => item._id !== user._id));
            toast.success(toastMessage.profile.successfulDeleteUser(user.first_name ? user.first_name : user.email));
        } else {
            toast.error(toastMessage.profile.failedDeleteUser);
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="کاربران" desktopBackButton={false} />

            <div className="flex w-full max-w-full flex-col gap-4 2xl:grid 2xl:grid-cols-2">
                {users.length ? (
                    users.map((user) => (
                        <div
                            key={String(user._id)}
                            className="flex w-full max-w-full items-center justify-between gap-4 rounded-xl border bg-bg-2 p-4 dark:border-secondary-700 dark:bg-secondary-600"
                        >
                            <div className="flex w-full flex-col gap-4 text-gray-400 dark:text-gray-300">
                                <p className="col-span-2">نام</p>
                                <p className="col-span-2">نقش</p>
                                <p>بیشتر</p>
                            </div>

                            <div className="flex w-full flex-col gap-4 justify-self-center">
                                <p className="flex gap-1 truncate dark:text-white">
                                    {user?.first_name ? user?.first_name + user?.last_name : user?.email}
                                </p>
                                <span className="flex flex-col gap-4">
                                    <ChangeRole user={user} />
                                </span>

                                <span className="flex items-center gap-2">
                                    <TrashIcon onClick={() => deleteUserHandler(user)} className="size-5 cursor-pointer fill-red-500" />
                                    <Link href={PATH.profile.users.edit_user(String(user._id))}>
                                        <EyeIcon className="h-5 cursor-pointer stroke-customBlack-200" />
                                    </Link>
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyState description="کاربری وجود ندارد." />
                )}
            </div>
        </section>
    );
};

export default AllUsers;
