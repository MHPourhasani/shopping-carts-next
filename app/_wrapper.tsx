"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { useAccessTokenWatcher } from "@/shared/hooks/useAccessTokenWatcher";
import { get } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    useAccessTokenWatcher((accessToken) => {
        if (accessToken) getProfile();
    });

    const getProfile = async () => {
        try {
            const data = await get(API.users.getProfile());
            dispatch(setUser(data));
        } catch (error) {
            console.error(error);
        }
    };

    return <>{children}</>;
};

export default Wrapper;
