"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { AddressInterface } from "@/interfaces/general";
import PATH from "@/utils/path";
import userIcon from "@/assets/icons/svgs/user.svg";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";
import { covertUserRoleToPersian } from "@/utils/helper";
import EditIcon from "@/assets/icons/components/Edit";
import loadingIcon from "@/assets/icons/svgs/refresh.svg";

interface PropsInterface {
    isLoading: boolean;
    imageFileHandler: (e: any) => void;
    deleteProfileImage: () => void;
    deleteAccountHandler: () => void;
}

const DesktopProfile = (props: PropsInterface) => {
    const { isLoading, imageFileHandler, deleteAccountHandler } = props;
    const userState = useAppSelector((state: any) => state.auth.user);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
    });
    const [formDataError, setFormDataError] = useState({ first_name: "", last_name: "", email: "", phone_number: "" });
    const dispatch = useAppDispatch();
    const router = useRouter();
    const fileInputRef = useRef<any>();

    useEffect(() => {
        if (userState) setFormData(userState);
    }, [userState]);

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveChangesHandler = async () => {
        const { first_name, last_name, email, phone_number } = formData;

        if (!first_name.trim()) {
            setFormDataError({ ...formDataError, first_name: "نام نباید خالی باشد." });
        } else if (!last_name?.trim()) {
            setFormDataError({ ...formDataError, last_name: "نام خانوادگی نباید خالی باشد." });
        } else if (!email?.trim()) {
            setFormDataError({ ...formDataError, email: "ایمیل نباید خالی باشد." });
        } else if (!phone_number?.trim()) {
            setFormDataError({ ...formDataError, phone_number: "شماره تماس نباید خالی باشد." });
        } else if (+phone_number.trim() < 11) {
            setFormDataError({ ...formDataError, phone_number: "شماره تماس نباید کمتر از 11 رقم باشد." });
        } else {
            const res = await fetch(`/api/profile/update-profile/${userState._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: first_name,
                    last_name: last_name,
                    email,
                    phone_number: phone_number,
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
                router.back();
            } else {
                toast.error(`خطا در آپدیت پروفایل`);
            }
        }
    };

    return (
        <section className="hidden w-full flex-col items-start gap-8 lg:flex">
            <h1 className="mb-5 text-3xl font-bold">پروفایل</h1>

            <div className="flex w-full flex-col items-center justify-center gap-8">
                <div className="relative flex aspect-square w-1/4 items-center justify-center rounded-full shadow-lg xl:w-1/5">
                    <div>
                        <span className="absolute bottom-0 left-0 flex size-10 items-center justify-center rounded-full bg-white shadow-2xl dark:bg-secondary-700">
                            {isLoading ? (
                                <Image src={loadingIcon} alt="loading" className="animate-spin" />
                            ) : (
                                <EditIcon
                                    // onClick={() => setIsChangeProfileImage(true)}
                                    className="cursor-pointer fill-customBlack-200 dark:fill-secondary-100"
                                />
                            )}
                        </span>

                        {/* <PopOver
                                onClose={() => setIsChangeProfileImage(false)}
                                title="تغییر عکس پروفایل"
                                content={
                                    <div className="flex flex-col gap-4">
                                        <span onClick={() => fileInputRef.current.click()} className="cursor-pointer">
                                            انتخاب عکس جدید
                                        </span>
                                        <hr className="flex-1 border border-gray-300" />
                                        <span onClick={deleteProfileImage} className="cursor-pointer pb-4 text-red-500">
                                            حذف عکس
                                        </span>
                                    </div>
                                }
                            /> */}
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                        onChange={(e) => imageFileHandler(e)}
                        className="hidden"
                    />

                    <span
                        className={`flex aspect-square w-full items-center justify-center rounded-full ${userState?.profile_image ? "bg-gradient-to-tr from-primary-100 to-violet-50 p-1" : "bg-bg-2 dark:bg-secondary-700"}`}
                    >
                        <Image
                            src={userState?.profile_image ? userState.profile_image : userIcon}
                            alt="user"
                            width={500}
                            height={500}
                            className={`${userState?.profile_image ? "h-full rounded-full object-cover" : "w-1/2"}`}
                        />
                    </span>
                </div>

                <span className="rounded-lg bg-secondary-100 px-2 py-1 dark:bg-secondary-700">
                    <p>{covertUserRoleToPersian(userState?.role)}</p>
                </span>

                <div className="flex w-full flex-col items-start gap-4">
                    <div className="grid w-full grid-cols-2 gap-3 text-gray-500">
                        <Input
                            dir="auto"
                            label="نام"
                            name="first_name"
                            value={formData.first_name}
                            onChange={changeHandler}
                            error={formDataError.first_name}
                            inputClassName="focus:border-primary-100"
                        />

                        <Input
                            dir="auto"
                            label="نام خانوادگی"
                            name="last_name"
                            value={formData.last_name}
                            onChange={changeHandler}
                            error={formDataError.last_name}
                            inputClassName="focus:border-primary-100"
                        />

                        <Input
                            dir="ltr"
                            type="tel"
                            label="شماره تماس"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={changeHandler}
                            error={formDataError.phone_number}
                            maxLength={11}
                            inputClassName="focus:border-primary-100"
                        />

                        <Input
                            dir="ltr"
                            label="ایمیل"
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            error={formDataError.email}
                            inputClassName="focus:border-primary-100"
                        />
                    </div>

                    <Button variant="Primary" onClick={saveChangesHandler}>
                        ذخیره تغییرات
                    </Button>
                </div>

                <div className="flex w-full flex-col items-start gap-4 rounded-xl bg-bg-2 p-4 dark:bg-secondary-600">
                    <Link href={PATH.profile.address()} className="flex w-full items-center justify-between">
                        <span className="text-secondary-600 dark:text-white">آدرس</span>
                        <span className="text-primary-100">
                            {userState?.addresses?.length ? (
                                <p>مشاهده همه</p>
                            ) : (
                                <ArrowLeft className="stroke-secondary-600 dark:stroke-white" />
                            )}
                        </span>
                    </Link>

                    {userState?.addresses ? (
                        <p className="break-all text-gray-500 dark:text-gray-300">
                            {userState.addresses.filter((adr: AddressInterface) => adr.isSelected)[0]?.address_value}
                        </p>
                    ) : null}
                </div>
            </div>

            <Link href={PATH.profile.change_password()}>
                <Button variant="Secondary" className="rounded-lg border-sky-600 px-4 text-sky-600">
                    تغییر رمز عبور
                </Button>
            </Link>

            <Button variant="Text" onClick={deleteAccountHandler} className="w-auto hover:text-red-600">
                حذف حساب کاربری
            </Button>
        </section>
    );
};

export default DesktopProfile;
