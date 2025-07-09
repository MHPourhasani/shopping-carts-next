"use client";
import { useState } from "react";
import Image from "next/image";
import signupImage from "@/assets/images/signup-page.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PATH from "@/shared/path";
import API from "@/shared/api";
import { signIn } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PageHeader from "@/shared/components/PageHeader";

const SignUp = () => {
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "", checkbox: false });
    const [formDataError, setFormDataError] = useState({ email: "", password: "", confirmPassword: "" });
    const router = useRouter();
    const dispatch = useAppDispatch();

    const changeHandler = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e: any) => {
        e.preventDefault();

        if (!formData.email.trim()) {
            setFormDataError({ ...formDataError, email: "لطفاً ایمیل را وارد نمایید." });
        } else if (!formData.password.trim()) {
            setFormDataError({ ...formDataError, password: "لطفاً رمز عبور را وارد نمایید." });
        } else if (formData.password.length < 8) {
            setFormDataError({ ...formDataError, password: "حداقل رمز عبور باید 8 کاراکتر باشد." });
        } else if (formData.password !== formData.confirmPassword) {
            setFormDataError({ ...formDataError, confirmPassword: "رمز عبور ها برابر نیستند." });
        } else {
            const { email, password } = formData;

            try {
                const res = await fetch(API.auth.register(), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const { message } = await res.json();

                if (res.ok) {
                    await signIn("credentials", {
                        email,
                        password,
                    });
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
                    router.push(PATH.home());
                    toast.success(message);
                } else {
                    toast.error(message);
                }
            } catch (error: any) {
                console.error(error);
            }
        }
    };

    return (
        <section className="flex w-full justify-center md:items-center md:gap-10 lg:p-0 xl:gap-0">
            <div className="flex w-full items-center justify-center p-4 lg:flex-1">
                <form className="flex w-full flex-col gap-4 md:w-11/12 lg:w-9/12 xl:w-8/12 2xl:w-6/12 2xl:max-w-[600px]">
                    <PageHeader title="ثبت نام" />
                    <InputWithLabel
                        dir="ltr"
                        type="email"
                        label="ایمیل"
                        name="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={changeHandler}
                        error={formDataError.email}
                        className="focus:border-primary-100"
                    />
                    <InputWithLabel
                        type="password"
                        label="رمز عبور"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        error={formDataError.password}
                        className="focus:border-primary-100"
                    />
                    <InputWithLabel
                        type="password"
                        label="تکرار رمز عبور"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        error={formDataError.confirmPassword}
                        className="focus:border-primary-100"
                    />

                    <Checkbox
                        id="terms"
                        // label="قوانین و مقررات"
                        onCheckedChange={(checked) => setFormData({ ...formData, checkbox: Boolean(checked) })}
                    />

                    <Button
                        size="xl"
                        onClick={signupHandler}
                        disabled={!formData.email || !formData.password || !formData.confirmPassword || !formData.checkbox}
                        className="my-4"
                    >
                        ثبت نام
                    </Button>

                    <p className="flex gap-2">
                        آیا اکانت دارید؟
                        <Link href={PATH.login()} className="text-primary-100">
                            ورود به حساب کاربری
                        </Link>
                    </p>
                </form>
            </div>

            <div className="hidden bg-gray-100 lg:flex lg:flex-1 lg:items-center lg:justify-center dark:bg-gray-950">
                <Image src={signupImage} alt="sign up image" className="h-auto w-full 2xl:w-9/12" />
            </div>
        </section>
    );
};

export default SignUp;
