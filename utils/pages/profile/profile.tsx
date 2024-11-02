"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import DesktopProfile from "@/utils/pages/profile/desktopProfile";
import MobileProfile from "@/utils/pages/profile/mobileProfile";
import toastMessage from "@/utils/toastMessage";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
    const userState = useAppSelector((state: any) => state.auth.user);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const imageFileHandler = (e: any) => {
        if (e.target.files.length) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = async function () {
                setIsLoading(true);
                const res = await fetch(`/api/profile/change-profile-image/${userState._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        profile_image_url: reader.result,
                    }),
                });
                setIsLoading(false);

                if (res.ok) {
                    dispatch(setUser({ ...userState, profile_image: reader.result }));
                    toast.success("عکس پروفایل با موفقیت تغییر کرد");
                } else {
                    toast.error(`تغییر عکس پروفایل با خطا مواجه شد`);
                }
            };
        }
    };

    const deleteProfileImage = async () => {
        setIsLoading(true);
        const res = await fetch(`/api/profile/change-profile-image/${userState._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                profile_image_url: null,
            }),
        });
        setIsLoading(false);

        if (res.ok) {
            dispatch(setUser({ ...userState, profile_image: null }));
            toast.success("عکس پروفایل با موفقیت خذف شد.");
        } else {
            toast.error(`حذف عکس پروفایل با خطا مواجه شد`);
        }
    };

    const deleteAccountHandler = async () => {
        const res = await fetch(`/api/auth/users/${userState._id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            await signOut();
            dispatch(setUser(null));
        } else {
            toast.error(toastMessage.profile.failedDeleteAccount);
        }
    };

    const props = { isLoading, imageFileHandler, deleteProfileImage, deleteAccountHandler };

    return (
        <>
            <MobileProfile {...props} />
            <DesktopProfile {...props} />
        </>
    );
};

export default Profile;
