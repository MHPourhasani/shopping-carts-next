"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PageHeader from "@/shared/components/PageHeader";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import API from "../../../shared/libs/endpoints";
import { put } from "@/shared/libs/axios";

const ChangePassword = () => {
    const [formData, setFormData] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    const [formDataError, setFormDataError] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    const router = useRouter();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const changesPasswordHandler = async () => {
        const { currentPassword, newPassword, confirmNewPassword } = formData;

        if (!currentPassword.trim()) {
            setFormDataError({ ...formDataError, currentPassword: "رمز عبور فعلی خود را وارد کنید." });
        } else if (!newPassword.trim()) {
            setFormDataError({ ...formDataError, newPassword: "رمز عبور جدید را وارد کنید" });
        } else if (!confirmNewPassword.trim()) {
            setFormDataError({ ...formDataError, confirmNewPassword: "دوباره رمز عبور جدید را وارد کنید." });
        } else if (newPassword.length < 8) {
            setFormDataError({ ...formDataError, newPassword: "رمز عبور نباید کمتر از 8 کاراکتر باشد." });
        } else if (newPassword === currentPassword) {
            setFormDataError({ ...formDataError, newPassword: "رمز عبور فعلی نباید با رمز عبور جدید برابر باشد." });
        } else if (confirmNewPassword.length < 8) {
            setFormDataError({ ...formDataError, confirmNewPassword: "تکرار رمز عبور نباید کمتر از 8 کاراکتر باشد." });
        } else if (newPassword !== confirmNewPassword) {
            setFormDataError({ ...formDataError, confirmNewPassword: "رمز عبور ها با هم برابر نیستند." });
        } else {
            try {
                await put(API.users.changePassword(), { currentPassword, newPassword });
                toast.success("رمز عبور با موفقیت تغییر کرد.");
                router.back();
            } catch (error) {
                toast.error(`خطا در تغییر رمز عبور`);
            }
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="تغییر رمز عبور" />

            <div className="flex w-full flex-col gap-4">
                <InputWithLabel
                    label="رمز عبور فعلی"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={changeHandler}
                    error={formDataError.currentPassword}
                    className="focus:border-primary-100"
                />
                <InputWithLabel
                    label="رمز عبور جدید"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={changeHandler}
                    error={formDataError.newPassword}
                    className="focus:border-primary-100"
                />
                <InputWithLabel
                    label="تکرار رمز عبور جدید"
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={changeHandler}
                    error={formDataError.confirmNewPassword}
                    className="focus:border-primary-100"
                />

                <Button onClick={changesPasswordHandler} className="mt-4 cursor-pointer self-end">
                    تغییر رمز
                </Button>
            </div>
        </section>
    );
};

export default ChangePassword;
