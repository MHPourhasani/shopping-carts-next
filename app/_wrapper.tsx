"use client";
import { UserRoleEnum } from "@/interfaces/enums";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { setShop } from "@/redux/slices/shopSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const userState = useAppSelector((state: any) => state.auth.user);
    const dispatch = useAppDispatch();

    const getProfile = async () => {
        try {
            const response = await fetch(`/api/auth/users/${session?.user.userId!}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const { user } = await response.json();
            dispatch(setUser(user));
        } catch (error) {
            console.error(error);
        }
    };

    const getShop = async () => {
        try {
            const response = await fetch(`/api/shop?user_id=${session?.user.userId!}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                cache: "no-store",
            });
            const { results } = await response.json();
            dispatch(setShop(results.shop));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (session) {
            getProfile();
        }
    }, [session]);

    useEffect(() => {
        if (userState && userState.role !== UserRoleEnum.USER) {
            getShop();
        }
    }, [userState, session]);

    return <>{children}</>;
};

export default Wrapper;
