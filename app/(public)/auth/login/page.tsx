import Login from "@/utils/pages/login";
import PATH from "@/utils/path";
import { Metadata } from "next";
import { Suspense } from "react";

const title = "ورود به حساب کاربری";
const url = PATH.login();

export const metadata: Metadata = {
    title: title,
    keywords: ["login", "login page"],
    alternates: { canonical: url },
    openGraph: { title: title, url: url },
    twitter: { title: title, site: url },
    other: { "twitter:url": url },
};

const LoginPage = () => {
    return (
        <Suspense>
            <Login />
        </Suspense>
    );
};

export default LoginPage;
