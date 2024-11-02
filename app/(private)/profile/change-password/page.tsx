import ChangePassword from "@/utils/pages/changePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "تغییر رمز عبور",
};

const ChangePasswordPage = () => {
    return <ChangePassword />;
};

export default ChangePasswordPage;
