"use client";
import EditIcon from "@/assets/icons/components/Edit";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PageHeader from "@/components/PageHeader/PageHeader";
import { UserInterface } from "@/interfaces/general";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
    data: UserInterface;
}

const EditUser = ({ data }: Props) => {
    const [user, setUser] = useState(data);

    const changeHandler = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const saveChangesHandler = async () => {
        const { first_name, last_name, email, phone_number } = user;

        if (!first_name.trim()) {
            toast.error("نام نباید خالی باشد.");
        } else if (!last_name?.trim()) {
            toast.error("نام خانوادگی نباید خالی باشد.");
        } else if (!email?.trim()) {
            toast.error("ایمیل نباید خالی باشد.");
        } else if (!phone_number?.trim()) {
            toast.error("شماره موبایل نباید خالی باشد.");
        } else if (+phone_number.trim() < 11) {
            toast.error("شماره موبایل نباید کمتر از 11 رقم باشد.");
        } else {
            const res = await fetch(`/api/profile/update-profile/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: first_name,
                    last_name: last_name,
                    email,
                    phone_number: phone_number,
                }),
            });

            await fetch("/api/notifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user._id,
                    notification: { title: "ویرایش پروفایل", message: "پروفایل با موفقیت ویرایش شد." },
                }),
            });

            const { message, data } = await res.json();

            if (res.ok) {
                setUser(data);
                toast.success(message);
            } else {
                toast.error(`خطا در آپدیت پروفایل`);
            }
        }
    };

    const deleteUserHandler = async (user: UserInterface) => {
        const res = await fetch(`/api/auth/users/${user._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success("کاربر با موفقیت حذف شد.");
        } else {
            toast.error("حذف کاربر با خطا مواجه شد.");
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title={`کاربر "${user.first_name || user.last_name ? user.first_name + user.last_name : user.email}"`}>
                <EditIcon className="cursor-pointer stroke-customBlack-200" />
            </PageHeader>

            <div className="flex w-full flex-col items-start gap-4">
                <div className="grid w-full grid-cols-2 gap-3 text-gray-500">
                    <Input
                        dir="auto"
                        label="نام"
                        name="first_name"
                        value={user.first_name}
                        onChange={changeHandler}
                        inputClassName="focus:border-primary-100"
                    />

                    <Input
                        dir="auto"
                        label="نام خانوادگی"
                        name="last_name"
                        value={user.last_name}
                        onChange={changeHandler}
                        inputClassName="focus:border-primary-100"
                    />

                    <Input
                        dir="ltr"
                        type="tel"
                        label="شماره تماس"
                        name="phone_number"
                        value={user.phone_number}
                        onChange={changeHandler}
                        maxLength={11}
                        inputClassName="focus:border-primary-100"
                    />

                    <Input
                        dir="ltr"
                        label="ایمیل"
                        name="email"
                        value={user.email}
                        onChange={changeHandler}
                        inputClassName="focus:border-primary-100"
                    />
                </div>

                <div className="flex w-full items-center gap-4">
                    <Button variant="Primary" onClick={saveChangesHandler}>
                        ویرایش
                    </Button>
                    <Button
                        variant="Tertiary"
                        onClick={() => deleteUserHandler(user)}
                        className="border-red-600 text-red-600 hover:border-red-500 dark:border-red-500 dark:text-red-500"
                    >
                        حذف
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default EditUser;
