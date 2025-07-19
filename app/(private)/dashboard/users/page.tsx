import { IUser } from "@/features/auth/interfaces";
import AllUsers from "@/features/ProfilePage/components/users/Users";
import { IPaginatedResponse } from "@/shared/interfaces";
import { get } from "@/shared/libs/api/axios";
import API from "@/shared/libs/api/endpoints";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "لیست کاربران",
};

const getUsers = async () => {
    const data = await get<IPaginatedResponse<IUser>>(API.users.list());
    return data;
};

const ProfileUsersPage = async () => {
    const data = await getUsers();

    return <AllUsers data={data} />;
};

export default ProfileUsersPage;
