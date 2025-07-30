import ChangePassword from "../../../../features/ProfilePage/components/ChangePassword";
import { Metadata } from "next";

export const revalidate = 30;
export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "تغییر رمز عبور",
};

const ChangePasswordPage = () => {
    return <ChangePassword />;
};

export default ChangePasswordPage;
