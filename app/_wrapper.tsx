"use client";
import { UserRoleEnum } from "@/interfaces/enums";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { get } from "@/shared/libs/api/client";
import API from "@/shared/libs/api/endpoints";
import { authToken } from "@/shared/utils/token";
import { useEffect } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const userState = useAppSelector((state) => state.auth.user);
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
        if (authToken.get()?.access) {
            getProfile();
        }
    }, [authToken.get()?.access]);

    useEffect(() => {
        if (userState && userState.role !== UserRoleEnum.CUSTOMER) {
            getShop();
        }
    }, [userState]);

    return <>{children}</>;
};

export default Wrapper;
