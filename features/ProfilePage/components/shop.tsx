"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/authSlice";
import PATH from "@/shared/utils/path";
import { IShop } from "@/interfaces/general";
import PageHeader from "@/shared/components/PageHeader";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    shop: IShop;
}

const ShopInformation = ({ shop }: Props) => {
    const userState = useAppSelector((state) => state.auth.user);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        name: shop.name,
        description: shop.description ? shop.description : "",
        phone_number: shop.phone_number,
    });
    const [formDataError, setFormDataError] = useState({ name: "", description: "", phone_number: "" });
    const dispatch = useAppDispatch();
    const router = useRouter();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const editShopHandler = async () => {
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
            const res = await fetch(`/api/shop/${shop.name}`, {
                method: "PUT",
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
                    notification: { title: "ویرایش فروشگاه", message: "فروشگاه شما با موفقیت ویرایش شد." },
                }),
            });

            const { message, data } = await res.json();

            if (res.ok) {
                dispatch(setUser(data));
                toast.success(message);
                router.push(PATH.dashboard.main());
            } else {
                toast.error(message);
            }
        }
    };

    return (
        <section className="flex w-full flex-1 flex-col gap-4">
            <PageHeader title="اطلاعات فروشگاه" desktopBackButton={false}>
                <Button variant="text" onClick={() => setIsEdit(!isEdit)} className="text-primary-100 w-auto px-0">
                    {isEdit ? "انصراف" : "ویرایش"}
                </Button>
            </PageHeader>

            <div className="flex flex-col gap-4">
                <InputWithLabel
                    dir="auto"
                    label="نام"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    disabled={!isEdit}
                    error={formDataError.name}
                    className="focus:border-primary-100"
                />
                <InputWithLabel
                    type="tel"
                    label="شماره تماس"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={changeHandler}
                    disabled={!isEdit}
                    error={formDataError.phone_number}
                    className="focus:border-primary-100"
                />
                <Textarea
                    dir="auto"
                    label="توضیحات"
                    name="description"
                    defaultValue={formData.description}
                    onChange={changeHandler}
                    disabled={!isEdit}
                    error={formDataError.description}
                    className="focus:border-primary-100 max-h-80 min-h-72 w-full"
                />

                {isEdit && (
                    <Button onClick={editShopHandler} className="md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:max-w-[600px]">
                        ویرایش فروشگاه
                    </Button>
                )}
            </div>
        </section>
    );
};

export default ShopInformation;
