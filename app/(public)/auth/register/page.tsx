import Register from "@/features/auth/components/Register";
import PATH from "@/shared/utils/path";
import { Metadata } from "next";

export const revalidate = 30;
export const dynamic = "force-static";

const title = "ثبت نام";
const url = PATH.register();

export const metadata: Metadata = {
    title: title,
    keywords: ["signup", "signup page"],
    alternates: { canonical: url },
    openGraph: { title: title, url: url },
    twitter: { title: title, site: url },
    other: {
        "twitter:url": url,
    },
};

const SignUpPage = () => {
    return <Register />;
};

export default SignUpPage;
