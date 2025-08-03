"use client";
import LogoutIcon from "@/assets/icons/components/Logout";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import API from "@/shared/libs/endpoints";
import { post } from "@/shared/libs/axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import PATH from "@/shared/utils/path";

const LogoutButton = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await post(API.auth.logout());
            dispatch(setUser(null));
            router.push(PATH.home());
        } catch (error) {
            toast.error("خطا در خارج شدن");
        }
    };

    return (
        <Button
            variant="text"
            onClick={handleLogout}
            className="group mb-2 w-full cursor-pointer justify-start !px-0 text-base text-red-500 hover:text-red-600 lg:mb-0 lg:!py-0"
        >
            <LogoutIcon className="!size-6 fill-red-600 group-hover:fill-red-700" />
            خروج از حساب کاربری
        </Button>
    );
};

export default LogoutButton;
