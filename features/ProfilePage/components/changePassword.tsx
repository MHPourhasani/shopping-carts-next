"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PageHeader from "@/shared/components/PageHeader";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";

const ChangePassword = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    const [formDataError, setFormDataError] = useState({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    const dispatch = useAppDispatch();
    const router = useRouter();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const changesPasswordHandler = async () => {
        const { oldPassword, newPassword, confirmNewPassword } = formData;

        if (!oldPassword.trim()) {
            setFormDataError({ ...formDataError, oldPassword: "رمز عبور فعلی خود را وارد کنید." });
        } else if (!newPassword.trim()) {
            setFormDataError({ ...formDataError, newPassword: "رمز عبور جدید را وارد کنید" });
        } else if (!confirmNewPassword.trim()) {
            setFormDataError({ ...formDataError, confirmNewPassword: "دوباره رمز عبور جدید را وارد کنید." });
        } else if (newPassword.length < 8) {
            setFormDataError({ ...formDataError, newPassword: "رمز عبور نباید کمتر از 8 کاراکتر باشد." });
        } else if (newPassword === oldPassword) {
            setFormDataError({ ...formDataError, newPassword: "رمز عبور فعلی نباید با رمز عبور جدید برابر باشد." });
        } else if (confirmNewPassword.length < 8) {
            setFormDataError({ ...formDataError, confirmNewPassword: "تکرار رمز عبور نباید کمتر از 8 کاراکتر باشد." });
        } else if (newPassword !== confirmNewPassword) {
            setFormDataError({ ...formDataError, confirmNewPassword: "رمز عبور ها با هم برابر نیستند." });
        } else {
            const res = await fetch(`/api/profile/change-password/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword }),
            });

            // await fetch("/api/notifications", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         user: user.email,
            //         notification: { title: "تغییر رمز عبور", message: "رمز عبور با موقفیت تغییر کرد." },
            //     }),
            // });

            if (res.ok) {
                dispatch(setUser({ ...user, formData }));
                toast.success("رمز عبور با موفقیت تغییر کرد.");
                router.back();
            } else {
                toast.error(`خطا در تغییر رمز عبور`);
            }
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="تغییر رمز عبور" />

            <div className="flex flex-col gap-3">
                <InputWithLabel
                    label="رمز عبور فعلی"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={changeHandler}
                    error={formDataError.oldPassword}
                    className="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <InputWithLabel
                    label="رمز عبور جدید"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={changeHandler}
                    error={formDataError.newPassword}
                    className="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <InputWithLabel
                    label="تکرار رمز عبور جدید"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={changeHandler}
                    error={formDataError.confirmNewPassword}
                    className="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />

                <Button onClick={changesPasswordHandler}>تغییر رمز</Button>
            </div>
        </section>
    );
};

export default ChangePassword;
