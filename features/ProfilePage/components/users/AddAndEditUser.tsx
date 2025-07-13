"use client";
import { UserRoleEnum } from "@/interfaces/enums";
import { IUser } from "@/interfaces/general";
import API from "@/shared/libs/api/endpoints";
import { covertUserRoleToPersian, covertUserRoleToUserRoleEnum, handleRefreshAfterBack } from "@/shared/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import SingleSelect from "@/shared/components/common/SingleSelect";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";

interface Props {
    data?: IUser;
    isEdit?: boolean;
}

const AddAndEditUser = ({ data, isEdit = false }: Props) => {
    const [user, setUser] = useState<Partial<IUser>>(isEdit && data ? { ...data, password: "" } : {});
    const router = useRouter();

    const changeHandler = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitHandler = async () => {
        const { first_name, last_name, email, phone_number } = user;

        if (!first_name?.trim()) {
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
            let res: any;

            if (isEdit) {
                res = await fetch(`/api/profile/update-profile/${user._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        first_name: first_name,
                        last_name: last_name,
                        email,
                        phone_number: phone_number,
                    }),
                });
            } else {
                res = await fetch(API.auth.register(), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(user),
                });
            }

            const { message } = await res.json();

            if (res.ok) {
                toast.success(message);
                router.back();
                handleRefreshAfterBack();
            } else {
                toast.error(`خطا در آپدیت پروفایل`);
            }
        }
    };

    const deleteUserHandler = async () => {
        const res = await fetch(`/api/auth/users/${user._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success("کاربر با موفقیت حذف شد.");
            router.back();
            handleRefreshAfterBack();
        } else {
            toast.error("حذف کاربر با خطا مواجه شد.");
        }
    };

    return (
        <div className="flex w-full flex-col items-start gap-4 lg:gap-8">
            <div className="grid w-full grid-cols-2 gap-4">
                <InputWithLabel
                    dir="auto"
                    label="نام"
                    name="first_name"
                    value={user.first_name}
                    onChange={changeHandler}
                    className="focus:border-primary-100"
                />

                <InputWithLabel
                    dir="auto"
                    label="نام خانوادگی"
                    name="last_name"
                    value={user.last_name}
                    onChange={changeHandler}
                    className="focus:border-primary-100"
                />

                <InputWithLabel
                    dir="ltr"
                    type="tel"
                    label="شماره تماس"
                    name="phone_number"
                    value={user.phone_number}
                    onChange={changeHandler}
                    maxLength={11}
                    className="focus:border-primary-100"
                />

                <InputWithLabel
                    dir="ltr"
                    type="email"
                    label="ایمیل"
                    name="email"
                    value={user.email}
                    onChange={changeHandler}
                    className="focus:border-primary-100"
                />

                <InputWithLabel
                    dir="ltr"
                    label={isEdit ? "رمز عبور جدید" : "رمز عبور"}
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                    className="focus:border-primary-100"
                />

                <div className="flex w-full flex-col gap-2">
                    <label>نقش</label>
                    <SingleSelect
                        defaultValue={{ title: covertUserRoleToPersian(user.role ? user.role : UserRoleEnum.CUSTOMER) }}
                        options={Object.values(UserRoleEnum).map((item) => {
                            return { title: covertUserRoleToPersian(item) };
                        })}
                        onChange={(selected) => setUser({ ...user, role: covertUserRoleToUserRoleEnum(selected.title) })}
                        className="size-full"
                    />
                </div>
            </div>

            <div className="flex w-full flex-col items-center gap-4 lg:flex-row">
                <Button onClick={submitHandler}>{isEdit ? "ویرایش" : "ایجاد"}</Button>

                {isEdit && (
                    <Button
                        variant="secondary"
                        onClick={deleteUserHandler}
                        className="border-red-600 text-red-600 hover:border-red-500 dark:border-red-500 dark:text-red-500"
                    >
                        حذف
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddAndEditUser;
