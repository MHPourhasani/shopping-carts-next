import EditPersonalInformation from "@/features/Profile/components/EditPersonal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ویرایش اطلاعات",
};

const EditShopPage = () => {
    return <EditPersonalInformation />;
};

export default EditShopPage;
