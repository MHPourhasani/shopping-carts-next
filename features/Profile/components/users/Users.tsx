"use client";
import EyeIcon from "@/assets/icons/components/Eye";
import TrashIcon from "@/assets/icons/components/Trash";
import EmptyState from "@/shared/components/EmptyState";
import ChangeRole from "@/features/Profile/components/users/ChangeRole";
import toastMessage from "@/shared/utils/toastMessage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PATH from "../../../../shared/utils/path";
import AddIcon from "@/assets/icons/components/Add";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import { IUser } from "@/features/Auth/interfaces";
import { UserRoleEnum } from "@/features/Auth/enums";
import { IPaginatedResponse } from "@/shared/interfaces";
import { del } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";
import { covertUserRoleToPersian } from "@/shared/utils/utils";
import Loader from "@/shared/components/Loader";

interface Props {
    data: IPaginatedResponse<IUser>;
}

const tabs = [
    { title: "همه", key: "all" },
    { title: "مدیر کل", key: UserRoleEnum.ADMIN },
    { title: "نویسنده", key: UserRoleEnum.AUTHOR },
    { title: "فروشنده", key: UserRoleEnum.SELLER },
    { title: "مشتری", key: UserRoleEnum.CUSTOMER },
];

const AllUsers = (props: Props) => {
    const [users, setUsers] = useState(props.data.results);
    const [filters] = useState<{ role: null | string }>({ role: null });
    const sp = useSearchParams().get("role") || tabs[0].key;
    const urlSp = new URLSearchParams();

    const itemsTitle = ["نام", "نام خانوادگی", "ایمیل", "نقش", "..."];

    useEffect(() => {
        console.log(sp);
        if (sp === tabs[0].key) {
            setUsers(props.data.results);
        } else {
            setUsers(users.filter((user) => user.role.toLowerCase() === sp));
        }
    }, [users.length, filters]);

    const deleteUserHandler = async (user: IUser) => {
        try {
            const res = await del<{ success: boolean }>(API.users.singleUser(user._id));

            if (res.success) {
                setUsers(users.filter((item) => item._id !== user._id));
                toast.success(toastMessage.dashboard.successfulDeleteUser(user.first_name ? user.first_name : user.email));
            } else {
                toast.error(toastMessage.dashboard.failedDeleteUser);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="کاربران" desktopBackButton={false}>
                <Link href={PATH.profile.users.create_user()}>
                    <Button variant="text" className="text-primary-100 group cursor-pointer px-0">
                        <AddIcon className="stroke-primary-100 size-5 cursor-pointer transition-all ease-in-out group-hover:stroke-white lg:size-6" />
                        ایجاد کاربر جدید
                    </Button>
                </Link>
            </PageHeader>

            <div className="flex w-full items-center gap-4 border-b pb-2 [&>*]:cursor-pointer">
                {tabs.map((tab) => (
                    <span
                        key={tab.key}
                        onClick={() => urlSp.set("role", tab.key)}
                        className={`${sp === tab.key.toLowerCase() ? "text-white" : "text-gray-400"}`}
                    >
                        {tab.title}
                    </span>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                <div className="hidden w-full gap-4 border-b px-5 pb-2 text-gray-400 lg:grid lg:grid-cols-5 dark:border-gray-500 dark:text-gray-300">
                    {itemsTitle.map((title) => (
                        <p key={title}>{title}</p>
                    ))}
                </div>

                <div className="flex w-full max-w-full flex-1 flex-col items-start gap-2">
                    {users ? (
                        users.length ? (
                            users.map((user) => (
                                <div
                                    key={String(user._id)}
                                    className="bg-bg-2 dark:border-secondary-700 dark:bg-secondary-600 grid w-full max-w-full grid-cols-2 items-center justify-between gap-4 rounded-xl border p-4 lg:grid-cols-5 dark:text-white"
                                >
                                    <p className="truncate">{user?.first_name || "----------"}</p>
                                    <p className="truncate">{user?.last_name || "----------"}</p>
                                    <p className="hidden truncate lg:block">{user.email}</p>

                                    <p className="lg:hidden">{covertUserRoleToPersian(user.role)}</p>
                                    <ChangeRole user={user} className="hidden lg:block" />

                                    <span className="flex items-center gap-2">
                                        <TrashIcon onClick={() => deleteUserHandler(user)} className="size-5 cursor-pointer fill-red-500" />

                                        <Link href={PATH.profile.users.edit_user(String(user._id))}>
                                            <EyeIcon className="stroke-customBlack-200 h-3.5 w-auto cursor-pointer dark:stroke-gray-400 hover:dark:stroke-gray-300" />
                                        </Link>
                                    </span>
                                </div>
                            ))
                        ) : (
                            <EmptyState description="کاربری وجود ندارد." />
                        )
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </section>
    );
};

export default AllUsers;
