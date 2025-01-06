import Login from "@/utils/pages/login";
import PATH from "@/utils/path";
import { Metadata } from "next";

export const revalidate = 30;
export const dynamic = "force-static";

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
    return <Login />;
};

export default LoginPage;
