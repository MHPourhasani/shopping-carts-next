"use client";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import PATH from "@/shared/utils/path";
import userIcon from "@/assets/icons/svgs/user.svg";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";
import { covertUserRoleToPersian } from "@/shared/utils/utils";
import EditIcon from "@/assets/icons/components/Edit";
import loadingIcon from "@/assets/icons/svgs/refresh.svg";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/shared/libs/api/endpoints";
import { IAddress, IUser } from "@/features/auth/interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileFormValues, profileSchema } from "../schemas/profile.schema";
import { put } from "@/shared/libs/api/axios";

interface IProps {
    isLoading: boolean;
    imageFileHandler: (e: any) => void;
    deleteProfileImage: () => void;
    deleteAccountHandler: () => void;
}

const DesktopProfile = (props: IProps) => {
    const { isLoading, imageFileHandler, deleteAccountHandler } = props;
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<any>();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormValues>({
        resolver: yupResolver(profileSchema),
    });

    useEffect(() => {
        if (user) {
            setValue("first_name", user.first_name ?? "");
            setValue("last_name", user.last_name ?? "");
            setValue("email", user.email ?? "");
            setValue("phone", user.phone ?? null);
        }
    }, [user, setValue]);

    const onSubmit = async (data: Partial<IUser>) => {
        try {
            const updatedUser = await put(API.users.updateProfile(), {
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
            });

            dispatch(setUser(updatedUser));
            toast.success("پروفایل با موفقیت آپدیت شد");
        } catch (err) {
            toast.error("خطای شبکه");
        }
    };

    return (
        <section className="hidden w-full flex-col items-start gap-8 lg:flex">
            <h1 className="mb-5 text-3xl font-bold">پروفایل</h1>

            <div className="flex w-full flex-col items-center justify-center gap-8">
                <div className="relative flex aspect-square w-1/4 items-center justify-center rounded-full shadow-lg xl:w-1/5">
                    <div>
                        <span className="dark:bg-secondary-700 absolute bottom-0 left-0 flex size-10 items-center justify-center rounded-full bg-white shadow-2xl">
                            {isLoading ? (
                                <Image src={loadingIcon} alt="loading" className="animate-spin" />
                            ) : (
                                <EditIcon
                                    // onClick={() => setIsChangeProfileImage(true)}
                                    className="fill-customBlack-200 dark:fill-secondary-100 cursor-pointer"
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

                    <Input
                        type="file"
                        ref={fileInputRef}
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                        onChange={(e) => imageFileHandler(e)}
                        className="hidden"
                    />

                    <span
                        className={`flex aspect-square w-full items-center justify-center rounded-full ${user?.profile_image ? "from-primary-100 bg-gradient-to-tr to-violet-50 p-1" : "bg-bg-2 dark:bg-secondary-700"}`}
                    >
                        <Image
                            src={user?.profile_image ? user.profile_image : userIcon}
                            alt="user"
                            width={500}
                            height={500}
                            className={`${user?.profile_image ? "h-full rounded-full object-cover" : "w-1/2"}`}
                        />
                    </span>
                </div>

                <span className="bg-secondary-100 dark:bg-secondary-700 rounded-lg px-2 py-1">
                    <p>{covertUserRoleToPersian(user?.role)}</p>
                </span>

                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-start gap-4">
                    <div className="grid w-full grid-cols-2 gap-3 text-gray-500">
                        <InputWithLabel
                            dir="auto"
                            label="نام"
                            {...register("first_name", { required: "نام نباید خالی باشد." })}
                            error={errors.first_name?.message}
                            className="focus:border-primary-100"
                        />

                        <InputWithLabel
                            dir="auto"
                            label="نام خانوادگی"
                            {...register("last_name", { required: "نام خانوادگی نباید خالی باشد." })}
                            error={errors.last_name?.message}
                            className="focus:border-primary-100"
                        />

                        <InputWithLabel
                            dir="ltr"
                            type="tel"
                            label="شماره تماس"
                            maxLength={11}
                            {...register("phone", {
                                required: "شماره تماس نباید خالی باشد.",
                                minLength: { value: 11, message: "شماره تماس نباید کمتر از 11 رقم باشد." },
                            })}
                            error={errors.phone?.message}
                            className="focus:border-primary-100"
                        />

                        <InputWithLabel dir="ltr" label="ایمیل" disabled {...register("email")} className="focus:border-primary-100" />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                        {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
                    </Button>
                </form>

                <div className="bg-bg-2 dark:bg-secondary-600 flex w-full flex-col items-start gap-4 rounded-xl p-4">
                    <Link href={PATH.dashboard.address()} className="flex w-full items-center justify-between">
                        <span className="text-secondary-600 dark:text-white">آدرس</span>
                        <span className="text-primary-100">
                            {user?.addresses?.length ? <p>مشاهده همه</p> : <ArrowLeft className="stroke-secondary-600 dark:stroke-white" />}
                        </span>
                    </Link>

                    {user?.addresses ? (
                        <p className="break-all text-gray-500 dark:text-gray-300">
                            {user.addresses.filter((adr: IAddress) => adr.isDefault)[0]?.address_value}
                        </p>
                    ) : null}
                </div>
            </div>

            <Link href={PATH.dashboard.change_password()}>
                <Button variant="secondary" className="cursor-pointer rounded-lg border-sky-600 px-4 text-sky-600">
                    تغییر رمز عبور
                </Button>
            </Link>

            <Button variant="text" onClick={deleteAccountHandler} className="w-auto cursor-pointer text-red-500 hover:text-red-600">
                حذف حساب کاربری
            </Button>
        </section>
    );
};

export default DesktopProfile;
