"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { authTokenClient } from "@/shared/constant";
import { get } from "@/shared/libs/api/axios";
import API from "@/shared/libs/api/endpoints";
import { useEffect } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();

    const getProfile = async () => {
        try {
            const data = await get(API.users.getProfile());
            dispatch(setUser(data));
        } catch (error) {
            console.error(error);
        }
    };

    const getShop = async () => {
        // try {
        //     const response = await fetch(`/api/shop?user_id=${session?.user.userId!}`, {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Accept: "application/json",
        //         },
        //         cache: "no-store",
        //     });
        //     const { results } = await response.json();
        //     dispatch(setShop(results.shop));
        // } catch (error) {
        //     console.error(error);
        // }
    };

    useEffect(() => {
        if (authTokenClient?.access) {
            getProfile();
        }
    }, [authTokenClient?.access]);

    return <>{children}</>;
};

export default Wrapper;
