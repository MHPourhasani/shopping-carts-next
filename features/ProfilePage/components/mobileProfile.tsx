"use client";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import userIcon from "@/assets/icons/svgs/user.svg";
import loadingIcon from "@/assets/icons/svgs/refresh.svg";
import { useRef, useState } from "react";
import EditIcon from "@/assets/icons/components/Edit";
import Modal from "@/shared/components/Modal";
import PATH from "@/shared/path";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";
import { covertUserRoleToPersian, showFullDate } from "@/shared/helper";
import { UserRoleEnum } from "@/interfaces/enums";
import { Button } from "@/components/ui/button";
import { authToken } from "@/shared/utils/token";
import { useRouter } from "next/navigation";

interface PropsInterface {
    isLoading: boolean;
    imageFileHandler: (e: any) => void;
    deleteProfileImage: () => void;
    deleteAccountHandler: () => void;
}

const pageItems = [
    { title: "سفارشات", href: PATH.dashboard.order.orders() },
    { title: "علاقه مندی ها", href: PATH.dashboard.favorites() },
    { title: "پیام ها", href: PATH.dashboard.notifications() },
    { title: "تنظیمات", href: PATH.dashboard.settings() },
    { title: "پشتیبانی", href: PATH.dashboard.support() },
];

const adminPages = [
    { title: "فروشگاه", href: PATH.dashboard.shop() },
    { title: "نوشته ها", href: PATH.dashboard.blog.blogs() },
    { title: "کاربران", href: PATH.dashboard.users.main() },
];

const MobileProfile = (props: PropsInterface) => {
    const { isLoading, imageFileHandler, deleteProfileImage, deleteAccountHandler } = props;
    const userState = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [isChangeProfileImage, setIsChangeProfileImage] = useState(false);
    const fileInputRef = useRef<any>();
    const router = useRouter();

    const userData = [
        { title: "نام", value: userState?.first_name },
        { title: "نام خانوادگی", value: userState?.last_name },
        { title: "شماره تماس", value: userState?.phone },
        { title: "ایمیل", value: userState?.email },
    ];

    const logoutHandler = async () => {
        authToken.remove();
        dispatch(setUser(null));
        router.push(PATH.home());
    };

    return (
        <section className="flex w-full flex-1 flex-col items-center justify-between gap-8 lg:hidden">
            <div className="flex w-full flex-col items-center justify-center gap-8">
                <div className="relative flex aspect-square w-1/2 items-center justify-center rounded-full shadow-xl">
                    <div>
                        <span className="dark:bg-secondary-700 absolute bottom-0 left-0 flex size-10 items-center justify-center rounded-full bg-white shadow-2xl">
                            {isLoading ? (
                                <Image src={loadingIcon} alt="loading" className="animate-spin" />
                            ) : (
                                <EditIcon
                                    onClick={() => setIsChangeProfileImage(true)}
                                    className="fill-customBlack-200 dark:fill-secondary-100 cursor-pointer"
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
                        className={`flex aspect-square w-full items-center justify-center rounded-full ${userState?.profile_image ? "from-primary-100 bg-gradient-to-tr to-violet-50 p-1" : "bg-bg-2 dark:bg-secondary-700"}`}
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

                <span className="bg-secondary-100 dark:bg-secondary-700 rounded-lg px-2 py-1">
                    <p>{covertUserRoleToPersian(userState?.role)}</p>
                </span>

                <div className="bg-bg-2 dark:bg-secondary-700 flex w-full flex-col items-start gap-4 rounded-xl p-4">
                    <div className="flex w-full items-center justify-between">
                        <span className="text-lg font-bold">اطلاعات شخصی</span>
                        <Link href={PATH.dashboard.edit_personal()} className="text-primary-100">
                            ویرایش
                        </Link>
                    </div>

                    <div className="flex w-full flex-col gap-3 text-gray-500 dark:text-gray-400">
                        {userData.map((data) => (
                            <span key={data.title} className="flex w-full justify-between gap-2">
                                <span className="w-fit min-w-fit">{data.title}</span>
                                <p dir="ltr" className="text-secondary-700 w-full truncate dark:text-white">
                                    {data.value ? data.value : "-"}
                                </p>
                            </span>
                        ))}

                        <span className="flex w-full justify-between gap-2">
                            <span className="min-w-fit">ایجاد شده در</span>

                            <p dir="ltr" className="text-secondary-700 w-full truncate dark:text-white">
                                {userState?.createdAt ? showFullDate(userState.createdAt) : "-"}
                            </p>
                        </span>

                        <span className="flex w-full justify-between gap-2">
                            <span className="min-w-fit">آپدیت شده در</span>

                            <p dir="ltr" className="text-secondary-700 w-full truncate dark:text-white">
                                {userState?.updatedAt ? showFullDate(userState.updatedAt) : "-"}
                            </p>
                        </span>
                    </div>
                </div>

                <div className="bg-bg-2 dark:bg-secondary-700 flex w-full flex-col items-start gap-4 rounded-xl p-4">
                    <Link href={PATH.dashboard.address()} className="flex w-full items-center justify-between">
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
                                className="bg-bg-2 dark:bg-secondary-700 flex items-center justify-between rounded-lg p-4"
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
                            className="bg-bg-2 dark:bg-secondary-700 flex w-full items-center justify-between rounded-lg p-4"
                        >
                            <span className="text-secondary-700 dark:text-white">{page.title}</span>
                            <ArrowLeft className="stroke-secondary-600 dark:stroke-white" />
                        </Link>
                    ))}
            </div>

            <div className="w-full">
                <Link href={PATH.dashboard.change_password()}>
                    <Button variant="secondary" type="submit" className="mb-4 rounded-lg border-sky-600 text-sky-600">
                        تغییر رمز عبور
                    </Button>
                </Link>

                <Button variant="secondary" onClick={logoutHandler} className="rounded-lg border-red-600 text-red-600">
                    خروج از حساب کاربری
                </Button>
                <Button variant="text" onClick={deleteAccountHandler} className="text-customBlack-50">
                    حذف اکانت
                </Button>
            </div>
        </section>
    );
};

export default MobileProfile;
