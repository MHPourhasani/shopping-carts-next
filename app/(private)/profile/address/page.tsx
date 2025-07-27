import Addresses from "@/features/ProfilePage/components/Address/Address";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "آدرس ها",
};

const AddressesPage = async () => {
    return <Addresses />;
};

export default AddressesPage;
