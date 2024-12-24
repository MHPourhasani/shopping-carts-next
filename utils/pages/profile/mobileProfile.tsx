"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import userIcon from "@/assets/icons/svgs/user.svg";
import loadingIcon from "@/assets/icons/svgs/refresh.svg";
import { useRef, useState } from "react";
import EditIcon from "@/assets/icons/components/Edit";
import Modal from "@/components/Modal";
import Button from "@/components/common/Button";
import PATH from "@/utils/path";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";
import { covertUserRoleToPersian, showFullDate } from "@/utils/helper";
import { UserRoleEnum } from "@/interfaces/enums";

interface PropsInterface {
    isLoading: boolean;
    imageFileHandler: (e: any) => void;
    deleteProfileImage: () => void;
    deleteAccountHandler: () => void;
}

const pageItems = [
    { title: "سفارشات", href: PATH.profile.order.orders() },
    { title: "علاقه مندی ها", href: PATH.profile.favorites() },
    { title: "پیام ها", href: PATH.profile.notifications() },
    { title: "تنظیمات", href: PATH.profile.settings() },
    { title: "پشتیبانی", href: PATH.profile.support() },
];

const adminPages = [
    { title: "فروشگاه", href: PATH.profile.shop() },
    { title: "نوشته ها", href: PATH.profile.blog.blogs() },
    { title: "کاربران", href: PATH.profile.users.main() },
];

const MobileProfile = (props: PropsInterface) => {
    const { isLoading, imageFileHandler, deleteProfileImage, deleteAccountHandler } = props;
    const userState = useAppSelector((state: any) => state.auth.user);
    const dispatch = useAppDispatch();
    const [isChangeProfileImage, setIsChangeProfileImage] = useState(false);
    const fileInputRef = useRef<any>();

    const userData = [
        { title: "نام", value: userState?.first_name },
        { title: "نام خانوادگی", value: userState?.last_name },
        { title: "شماره تماس", value: userState?.phone_number },
        { title: "ایمیل", value: userState?.email },
    ];

    const logoutHandler = async () => {
        await signOut();
        dispatch(setUser(null));
        await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: userState.email,
                notification: { title: "خروج از حساب کاربری", message: `از حساب کاربری خود با موفقیت خارج شدید.` },
            }),
        });
    };

    return (
        <section className="flex w-full flex-1 flex-col items-center justify-between gap-8 lg:hidden">
            <div className="flex w-full flex-col items-center justify-center gap-8">
                <div className="relative flex aspect-square w-1/2 items-center justify-center rounded-full shadow-xl">
                    <div>
                        <span className="absolute bottom-0 left-0 flex size-10 items-center justify-center rounded-full bg-white shadow-2xl dark:bg-secondary-700">
                            {isLoading ? (
                                <Image src={loadingIcon} alt="loading" className="animate-spin" />
                            ) : (
                                <EditIcon
                                    onClick={() => setIsChangeProfileImage(true)}
                                    className="cursor-pointer fill-customBlack-200 dark:fill-secondary-100"
                                />
                            )}
                        </span>

                        <Modal status={isChangeProfileImage} onClose={() => setIsChangeProfileImage(false)} title="تغییر عکس پروفایل">
                            <div className="flex flex-col gap-4">
                                <span onClick={() => fileInputRef.current.click()} className="cursor-pointer">
                                    انتخاب عکس جدید
                                </span>
                                <hr className="flex-1 border border-gray-300" />
                                <span onClick={deleteProfileImage} className="cursor-pointer pb-4 text-red-500">
                                    حذف عکس
                                </span>
                            </div>
                        </Modal>
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

                <div className="flex w-full flex-col items-start gap-4 rounded-xl bg-bg-2 p-4 dark:bg-secondary-700">
                    <div className="flex w-full items-center justify-between">
                        <span className="text-lg font-bold">اطلاعات شخصی</span>
                        <Link href={PATH.profile.edit_personal()} className="text-primary-100">
                            ویرایش
                        </Link>
                    </div>

                    <div className="flex w-full flex-col gap-3 text-gray-500 dark:text-gray-400">
                        {userData.map((data) => (
                            <span key={data.title} className="flex w-full justify-between gap-2">
                                <span className="w-fit min-w-fit">{data.title}</span>
                                <p dir="ltr" className="w-full truncate text-secondary-700 dark:text-white">
                                    {data.value ? data.value : "-"}
                                </p>
                            </span>
                        ))}

                        <span className="flex w-full justify-between gap-2">
                            <span className="min-w-fit">ایجاد شده در</span>

                            <p dir="ltr" className="w-full truncate text-secondary-700 dark:text-white">
                                {userState?.createdAt ? showFullDate(userState.createdAt) : "-"}
                            </p>
                        </span>

                        <span className="flex w-full justify-between gap-2">
                            <span className="min-w-fit">آپدیت شده در</span>

                            <p dir="ltr" className="w-full truncate text-secondary-700 dark:text-white">
                                {userState?.updatedAt ? showFullDate(userState.updatedAt) : "-"}
                            </p>
                        </span>
                    </div>
                </div>

                <div className="flex w-full flex-col items-start gap-4 rounded-xl bg-bg-2 p-4 dark:bg-secondary-700">
                    <Link href={PATH.profile.address()} className="flex w-full items-center justify-between">
                        <span className="text-secondary-700 dark:text-white">آدرس</span>
                        <ArrowLeft className="stroke-secondary-600 dark:stroke-white" />
                    </Link>
                </div>

                <div className="flex w-full flex-col gap-2">
                    {pageItems.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex items-center justify-between rounded-lg bg-bg-2 p-4 dark:bg-secondary-700"
                            >
                                <span className="text-secondary-700 dark:text-white">{item.title}</span>
                                <ArrowLeft className="stroke-secondary-600 dark:stroke-white" />
                            </Link>
                        );
                    })}
                </div>

                {userState?.role === UserRoleEnum.ADMIN &&
                    adminPages.map((page) => (
                        <Link
                            href={page.href}
                            className="flex w-full items-center justify-between rounded-lg bg-bg-2 p-4 dark:bg-secondary-700"
                        >
                            <span className="text-secondary-700 dark:text-white">{page.title}</span>
                            <ArrowLeft className="stroke-secondary-600 dark:stroke-white" />
                        </Link>
                    ))}
            </div>

            <div className="w-full">
                <Link href={PATH.profile.change_password()}>
                    <Button variant="Secondary" type="submit" className="mb-4 rounded-lg border-sky-600 text-sky-600">
                        تغییر رمز عبور
                    </Button>
                </Link>

                <Button variant="Secondary" onClick={logoutHandler} className="rounded-lg border-red-600 text-red-600">
                    خروج از حساب کاربری
                </Button>
                <Button variant="Text" onClick={deleteAccountHandler} className="text-customBlack-50">
                    حذف اکانت
                </Button>
            </div>
        </section>
    );
};

export default MobileProfile;
