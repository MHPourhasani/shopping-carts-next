"use client";
import Button from "@/shared/components/common/Button";
import Input from "@/shared/components/common/Input";
import Textarea from "@/shared/components/common/Textarea";
import PageHeader from "@/components/PageHeader/PageHeader";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import PATH from "@/shared/path";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateShop = () => {
    const userState = useAppSelector((state: any) => state.auth.user);
    const [formData, setFormData] = useState({ name: "", description: "", phone_number: "" });
    const [formDataError, setFormDataError] = useState({ name: "", description: "", phone_number: "" });
    const dispatch = useAppDispatch();
    const router = useRouter();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createShopHandler = async () => {
        const { name, description, phone_number } = formData;

        if (!name.trim()) {
            setFormDataError({ ...formDataError, name: "نام نباید خالی باشد." });
        } else if (!description?.trim()) {
            setFormDataError({ ...formDataError, description: "توضیحات نباید خالی باشد." });
        } else if (!phone_number?.trim()) {
            setFormDataError({ ...formDataError, phone_number: "شماره تماس نباید خالی باشد." });
        } else if (phone_number.trim().length < 8) {
            setFormDataError({ ...formDataError, phone_number: "شماره تماس نباید کمتر از 8 رقم باشد." });
        } else {
            const res = await fetch(`/api/profile/create-shop`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userState._id, name, description, phone_number }),
            });

            await fetch("/api/notifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: userState._id,
                    notification: { title: "ساخت فروشگاه", message: "فروشگاه شما با موفقیت ساخته شد." },
                }),
            });

            const { message, data } = await res.json();

            if (res.ok) {
                dispatch(setUser(data));
                toast.success(message);
                router.push(PATH.profile.main());
            } else {
                toast.error(`خطا در فروشگاه شما`);
            }
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="ساخت فروشگاه" desktopBackButton={false} />

            <div className="flex flex-col gap-4">
                <Input
                    label="نام"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    error={formDataError.name}
                    inputClassName="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <Input
                    type="tel"
                    label="شماره تماس"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={changeHandler}
                    error={formDataError.phone_number}
                    maxLength={11}
                    inputClassName="focus:border-primary-100 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]"
                />
                <Textarea
                    label="توضیحات"
                    name="description"
                    defaultValue={formData.description}
                    onChange={changeHandler}
                    error={formDataError.description}
                    className="max-h-96 min-h-60 w-full bg-gray-400 dark:bg-secondary-600"
                />

                <Button variant="Primary" onClick={createShopHandler} className="md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]">
                    ساخت فروشگاه
                </Button>
            </div>
        </section>
    );
};

export default CreateShop;
