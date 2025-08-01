"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/authSlice";
import PATH from "@/shared/utils/path";
import PageHeader from "@/shared/components/PageHeader";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";

const EditPersonalInformation = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [formData, setFormData] = useState({
        firstName: user?.first_name ? user?.first_name : "",
        lastName: user?.last_name ? user?.last_name : "",
        email: user?.email ? user?.email : "",
        phoneNumber: user?.phone ? user?.phone : "",
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
        } else if (phoneNumber.trim().length < 11) {
            setFormDataError({ ...formDataError, phoneNumber: "شماره تماس نباید کمتر از 11 رقم باشد." });
        } else {
            const res = await fetch(`/api/profile/update-profile/${user?._id}`, {
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
                dispatch(setUser(data));
                toast.success(message);
                router.push(PATH.profile.main());
            } else {
                toast.error(`خطا در ویرایش پروفایل`);
            }
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="ویرایش اطلاعات شخصی" />

            <div className="flex flex-col gap-4">
                <InputWithLabel
                    label="نام"
                    name="firstName"
                    value={formData.firstName}
                    onChange={changeHandler}
                    error={formDataError.firstName}
                    className="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <InputWithLabel
                    label="نام خانوادگی"
                    name="lastName"
                    value={formData.lastName}
                    onChange={changeHandler}
                    error={formDataError.lastName}
                    className="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <InputWithLabel
                    dir="ltr"
                    label="ایمیل"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    error={formDataError.email}
                    className="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <InputWithLabel
                    type="tel"
                    label="شماره تماس"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={changeHandler}
                    error={formDataError.phoneNumber}
                    maxLength={11}
                    className="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />

                <Button size="xl" onClick={saveChangesHandler} className="mt-5 cursor-pointer md:w-11/12">
                    ذخیره تغییرات
                </Button>
            </div>
        </section>
    );
};

export default EditPersonalInformation;
