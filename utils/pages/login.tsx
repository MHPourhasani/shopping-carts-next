"use client";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button"; // import { login } from '@/redux/slices/authSlice';
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import loginImage from "@/assets/images/login-page.svg";
import googleLogo from "@/assets/icons/svgs/google-logo.svg";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "@/components/common/Input";
import PATH from "../path";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import AppleLogo from "@/assets/icons/components/AppleLogo";
import toastMessage from "../toastMessage";
import API from "../api";

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
            await signIn("credentials", {
                email,
                password,
            });

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
        <section className="flex w-full flex-1 md:items-center md:gap-10 xl:gap-0">
            <div className="hidden lg:flex lg:basis-1/2 lg:items-center lg:justify-center">
                <Image src={loginImage} alt="login image" className="h-auto w-full 2xl:w-9/12" />
            </div>

            <div className="flex w-full items-center justify-center p-4 lg:basis-1/2">
                <form
                    onSubmit={handleSubmit(loginHandler, errorHandler)}
                    className="flex w-full flex-col gap-4 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:w-6/12 2xl:max-w-[600px]"
                >
                    <h1 className="mb-5 text-3xl font-bold">ورود</h1>
                    <Input
                        dir="ltr"
                        type="email"
                        label="ایمیل"
                        name="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={changeHandler}
                        inputClassName="focus:border-primary-100"
                    />
                    <Input
                        dir="auto"
                        type="password"
                        label="رمز عبور"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        inputClassName="focus:border-primary-100"
                    />

                    <Button
                        variant="Primary"
                        disabled={!(formData.email || formData.password || formData.password.length >= 8) || isLoading}
                        className="disabled:bg-gray-300"
                    >
                        {isLoading ? "لطفا صبر کنید..." : "ورود به حساب کاربری"}
                    </Button>

                    <div className="flex gap-2">
                        <p>اکانت ندارید؟</p>
                        <Link href={goToLogin()} className="font-semibold">
                            ساخت اکانت
                        </Link>
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <hr className="flex-1 border border-gray-200" />
                        <span className="-translate-y-0.5">یا</span>
                        <hr className="flex-1 border border-gray-200" />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button
                            variant="Tertiary"
                            className="flex justify-center gap-2 rounded-full border-[0] bg-bg-2 px-4 py-3 dark:bg-secondary-700"
                        >
                            <p>ورود با اکانت اپل</p>
                            <AppleLogo className="fill-secondary-800 dark:fill-secondary-100" />
                        </Button>
                        <Button
                            variant="Tertiary"
                            className="flex justify-center gap-2 rounded-full border-[0] bg-bg-2 px-4 py-3 dark:bg-secondary-700"
                        >
                            <p>ورود با اکانت گوگل</p>
                            <Image src={googleLogo} alt="google" />
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
