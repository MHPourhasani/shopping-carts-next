import EditPersonalInformation from "@/utils/pages/profile/EditPersonal";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ویرایش اطلاعات",
};

const EditShopPage = () => {
    return <EditPersonalInformation />;
};

export default EditShopPage;
