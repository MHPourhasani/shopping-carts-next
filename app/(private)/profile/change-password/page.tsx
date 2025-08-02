import { Metadata } from "next";
import ChangePassword from "@/features/Profile/components/ChangePassword";

export const revalidate = 30;
export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "تغییر رمز عبور",
};

const ChangePasswordPage = () => {
    return <ChangePassword />;
};

export default ChangePasswordPage;
