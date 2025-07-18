"use client";
import EyeIcon from "@/assets/icons/components/Eye";
import TrashIcon from "@/assets/icons/components/Trash";
import EmptyState from "@/shared/components/EmptyState";
import ChangeRole from "@/features/ProfilePage/components/ChangeRole";
import toastMessage from "@/shared/utils/toastMessage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PATH from "../../../../shared/utils/path";
import { useAppSelector } from "@/redux/hooks";
import AddIcon from "@/assets/icons/components/Add";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import { IUser } from "@/features/auth/interfaces";
import { UserRoleEnum } from "@/features/auth/enums";
import { IPaginatedResponse } from "@/shared/interfaces";

interface Props {
    data: IPaginatedResponse<IUser>;
}

const AllUsers = (props: Props) => {
    const user = useAppSelector((state) => state.auth.user);
    const [users, setUsers] = useState(props.data.results);
    const [filters] = useState<{ role: null | string }>({ role: null });
    const sp = useSearchParams();
    const urlSp = new URLSearchParams();

    const tabs = [
        { title: "همه", key: "All" },
        { title: "مدیر کل", key: UserRoleEnum.ADMIN },
        { title: "نویسنده", key: UserRoleEnum.AUTHOR },
        { title: "فروشنده", key: UserRoleEnum.SELLER },
        { title: "کاربر", key: UserRoleEnum.CUSTOMER },
    ];
    const itemsTitle = ["نام", "نام خانوادگی", "ایمیل", "نقش", "..."];

    useEffect(() => {
        // if (sp.get("role")) {

        // }
        setUsers(users.filter((user) => user.role.toLowerCase() === sp.get("role")));
    }, [users, filters]);

    const deleteUserHandler = async (user: IUser) => {
        const res = await fetch(`/api/auth/users/${user._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            setUsers(users.filter((item) => item._id !== user._id));
            toast.success(toastMessage.dashboard.successfulDeleteUser(user.first_name ? user.first_name : user.email));
        } else {
            toast.error(toastMessage.dashboard.failedDeleteUser);
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="کاربران" desktopBackButton={false}>
                <Link href={PATH.dashboard.users.create_user()}>
                    <Button variant="text" className="text-primary-100 px-0">
                        <AddIcon className="stroke-primary-100 h-auto w-6 cursor-pointer dark:stroke-violet-400" />
                        ایجاد کاربر جدید
                    </Button>
                </Link>
            </PageHeader>

            <div className="flex w-full items-center gap-4 border-b pb-2 [&>*]:cursor-pointer">
                {tabs.map((tab) => (
                    <span
                        key={tab.key}
                        onClick={() => urlSp.set("role", tab.key)}
                        className={`${sp.get("role") === tab.key.toLowerCase() ? "text-white" : "text-gray-400"}`}
                    >
                        {tab.title}
                    </span>
                ))}
            </div>

            <div className="flex w-full max-w-full flex-1 flex-col gap-4 2xl:grid 2xl:grid-cols-2">
                {users.length ? (
                    users.map((user) => (
                        <div
                            key={String(user._id)}
                            className="bg-bg-2 dark:border-secondary-700 dark:bg-secondary-600 flex w-full max-w-full items-center justify-between gap-4 rounded-xl border p-4"
                        >
                            <div className="flex w-full flex-col gap-4 text-gray-400 dark:text-gray-300">
                                {itemsTitle.map((title) => (
                                    <p key={title}>{title}</p>
                                ))}
                            </div>

                            <div className="flex w-full flex-col gap-4 justify-self-center">
                                <p className="flex gap-1 truncate dark:text-white">{user?.first_name || "----------"}</p>
                                <p className="flex gap-1 truncate dark:text-white">{user?.last_name || "----------"}</p>
                                <p className="flex gap-1 truncate dark:text-white">{user.email}</p>

                                <ChangeRole user={user} />

                                {user?.role === UserRoleEnum.ADMIN && (
                                    <span className="flex items-center gap-2">
                                        <TrashIcon onClick={() => deleteUserHandler(user)} className="size-5 cursor-pointer fill-red-500" />

                                        <Link href={PATH.dashboard.users.edit_user(String(user._id))}>
                                            <EyeIcon className="stroke-customBlack-200 h-5 w-auto cursor-pointer" />
                                        </Link>
                                    </span>
                                )}
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
