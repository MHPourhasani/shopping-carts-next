"use client";
import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/authSlice";
import PATH from "@/utils/path";
import PageHeader from "@/components/PageHeader/PageHeader";

const EditPersonalInformation = () => {
    const userState = useAppSelector((state: any) => state.auth.user);
    const [formData, setFormData] = useState({
        firstName: userState?.first_name ? userState?.first_name : "",
        lastName: userState?.last_name ? userState?.last_name : "",
        email: userState?.email ? userState?.email : "",
        phoneNumber: userState?.phone_number ? userState?.phone_number : "",
    });
    const [formDataError, setFormDataError] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "" });
    const dispatch = useAppDispatch();
    const router = useRouter();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveChangesHandler = async () => {
        const { firstName, lastName, email, phoneNumber } = formData;

        if (!firstName.trim()) {
            setFormDataError({ ...formDataError, firstName: "نام نباید خالی باشد." });
        } else if (!lastName?.trim()) {
            setFormDataError({ ...formDataError, lastName: "نام خانوادگی نباید خالی باشد." });
        } else if (!email?.trim()) {
            setFormDataError({ ...formDataError, email: "ایمیل نباید خالی باشد." });
        } else if (!phoneNumber?.trim()) {
            setFormDataError({ ...formDataError, phoneNumber: "شماره تماس نباید خالی باشد." });
        } else if (phoneNumber.trim() < 11) {
            setFormDataError({ ...formDataError, phoneNumber: "شماره تماس نباید کمتر از 11 رقم باشد." });
        } else {
            const res = await fetch(`/api/profile/update-profile/${userState._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    phone_number: phoneNumber,
                }),
            });

            const { message, data } = await res.json();

            if (res.ok) {
                await fetch("/api/notifications", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: userState._id,
                        notification: { title: "ویرایش پروفایل", message: "پروفایل با موفقیت ویرایش شد." },
                    }),
                });
                dispatch(setUser(data));
                toast.success(message);
                router.push(PATH.profile.main());
            } else {
                toast.error(`خطا در ویرایش پروفایل`);
            }
        }
    };

    return (
        <section className="flex w-full flex-col flex-1 gap-4">
            <PageHeader title="ویرایش اطلاعات شخصی" />

            <div className="flex flex-col gap-4">
                <Input
                    label="نام"
                    name="firstName"
                    value={formData.firstName}
                    onChange={changeHandler}
                    error={formDataError.firstName}
                    inputClassName="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <Input
                    label="نام خانوادگی"
                    name="lastName"
                    value={formData.lastName}
                    onChange={changeHandler}
                    error={formDataError.lastName}
                    inputClassName="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <Input
                    dir="ltr"
                    label="ایمیل"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    error={formDataError.email}
                    inputClassName="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <Input
                    type="tel"
                    label="شماره تماس"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={changeHandler}
                    error={formDataError.phoneNumber}
                    maxLength={11}
                    inputClassName="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />

                <Button variant="Primary" onClick={saveChangesHandler} className="md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]">
                    ذخیره تغییرات
                </Button>
            </div>
        </section>
    );
};

export default EditPersonalInformation;
