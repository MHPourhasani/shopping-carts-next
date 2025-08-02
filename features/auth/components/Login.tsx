"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import loginImage from "@/assets/images/login-page.svg";
import googleLogo from "@/assets/icons/svgs/google-logo.svg";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AppleLogo from "@/assets/icons/components/AppleLogo";
import PATH from "@/shared/utils/path";
import toastMessage from "@/shared/utils/toastMessage";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";
import { useAuthToken } from "@/shared/hooks/useAuthToken";
import { post } from "@/shared/libs/axios";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const redirectParams = useSearchParams().get("redirect");
    const accessToken = useAuthToken();

    useEffect(() => {
        if (accessToken) router.push(redirectParams ?? PATH.home());
    }, [accessToken]);

    const { handleSubmit } = useForm();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await post("/api/Auth/login", {
                email: formData.email,
                password: formData.password,
            });

            toast.success(toastMessage.auth.login.successfulLogin);
            router.push(PATH.home());
        } catch (err: any) {
            const code = err?.response?.data?.code;
            switch (code) {
                case "EMAIL_NOT_FOUND":
                    toast.error("کاربری با این ایمیل یافت نشد.");
                    break;
                case "INVALID_PASSWORD":
                    toast.error("رمز عبور اشتباه است.");
                    break;
                default:
                    toast.error("ورود ناموفق بود.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const errorHandler = (errors: any) => {
        console.error(errors);
    };

    const goToRegister = () => {
        return PATH.register() + (!!redirectParams ? `?redirect=${redirectParams}` : "");
    };

    return (
        <section className="flex w-full justify-center p-4 md:items-center md:gap-10 lg:p-0 xl:gap-0">
            <div className="hidden bg-gray-100 lg:flex lg:flex-1 lg:items-center lg:justify-center dark:bg-gray-950">
                <Image src={loginImage} alt="login image" className="h-auto w-full 2xl:w-9/12" />
            </div>

            <div className="flex w-full items-center justify-center lg:flex-1">
                <form
                    onSubmit={handleSubmit(handleLogin, errorHandler)}
                    className="flex w-full flex-col gap-4 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:w-6/12 2xl:max-w-[600px]"
                >
                    <PageHeader title="ورود به حساب کاربری" desktopBackButton={false} />
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
                        <Link href={goToRegister()} className="font-semibold">
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
