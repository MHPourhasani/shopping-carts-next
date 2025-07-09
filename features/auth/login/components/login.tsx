"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import loginImage from "@/assets/images/login-page.svg";
import googleLogo from "@/assets/icons/svgs/google-logo.svg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import AppleLogo from "@/assets/icons/components/AppleLogo";
import PATH from "@/shared/path";
import API from "@/shared/api";
import toastMessage from "@/shared/toastMessage";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const redirectParams = useSearchParams().get("redirect");
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (session?.user) router.push(redirectParams ? redirectParams : PATH.home());
    }, [redirectParams, session]);

    const { handleSubmit } = useForm();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loginHandler = async () => {
        const { email, password } = formData;

        try {
            setIsLoading(true);

            if (redirectParams) {
                router.push(redirectParams);
            }

            const res = await fetch(API.auth.login(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const { user } = await res.json();
            dispatch(setUser(user));

            if (res.ok) {
                setIsLoading(false);
                toast.success(toastMessage.auth.login.successfulLogin);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const errorHandler = (errors: any) => {
        console.error(errors);
    };

    const goToLogin = () => {
        if (redirectParams) {
            return PATH.signup() + `?redirect=${redirectParams}`;
        } else {
            return PATH.signup();
        }
    };

    return (
        <section className="flex w-full justify-center p-4 md:items-center md:gap-10 lg:p-0 xl:gap-0">
            <div className="hidden bg-gray-100 lg:flex lg:flex-1 lg:items-center lg:justify-center dark:bg-gray-950">
                <Image src={loginImage} alt="login image" className="h-auto w-full 2xl:w-9/12" />
            </div>

            <div className="flex w-full items-center justify-center lg:flex-1">
                <form
                    onSubmit={handleSubmit(loginHandler, errorHandler)}
                    className="flex w-full flex-col gap-4 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:w-6/12 2xl:max-w-[600px]"
                >
                    <PageHeader title="ورود به حساب کاربری" />
                    <InputWithLabel
                        dir="ltr"
                        type="email"
                        label="ایمیل"
                        name="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={changeHandler}
                    />
                    <InputWithLabel
                        dir="auto"
                        type="password"
                        label="رمز عبور"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                    />

                    <Button size="xl" disabled={!(formData.email || formData.password || formData.password.length >= 8) || isLoading}>
                        {isLoading ? "لطفا صبر کنید..." : "ورود به حساب کاربری"}
                    </Button>

                    <div className="flex gap-2">
                        <p>اکانت ندارید؟</p>
                        <Link href={goToLogin()} className="font-semibold">
                            ساخت اکانت
                        </Link>
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <hr className="h-[0.5px] flex-1 border-0 bg-gray-200 dark:bg-gray-500" />
                        <span className="-translate-y-0.5">یا</span>
                        <hr className="h-[0.5px] flex-1 border-0 bg-gray-200 dark:bg-gray-500" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button
                            variant="secondary"
                            size="xl"
                            className="bg-bg-2 dark:bg-secondary-700 justify-center rounded-full border-[0]"
                        >
                            <AppleLogo className="fill-secondary-800 dark:fill-secondary-100" />
                            <p>ورود با اکانت اپل</p>
                        </Button>
                        <Button
                            variant="secondary"
                            size="xl"
                            className="bg-bg-2 dark:bg-secondary-700 justify-center rounded-full border-[0]"
                        >
                            <Image src={googleLogo} alt="google" width={20} height={20} />
                            <p>ورود با اکانت گوگل</p>
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
