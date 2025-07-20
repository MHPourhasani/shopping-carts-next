"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { useAccessTokenWatcher } from "@/shared/hooks/useAccessTokenWatcher";
import { get } from "@/shared/libs/api/axios";
import API from "@/shared/libs/api/endpoints";
import { useEffect } from "react";

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

    // useEffect(() => {
    //     if (authTokenClient?.access) ;
    // }, [authTokenClient?.access]);

    return <>{children}</>;
};

export default Wrapper;
