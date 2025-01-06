import SignUp from "@/utils/pages/signup";
import PATH from "@/utils/path";
import { Metadata } from "next";

export const revalidate = 30;
export const dynamic = "force-static";

const title = "ثبت نام";
const url = PATH.signup();

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
    return <SignUp />;
};

export default SignUpPage;
