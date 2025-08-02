import { IUser } from "@/features/Auth/interfaces";
import AddAndEditUser from "@/features/Profile/components/users/AddAndEditUser";
import PageHeader from "@/shared/components/PageHeader";
import { get } from "@/shared/libs/axios";
import API from "@/shared/libs/endpoints";

interface Params {
    id: string;
}

const getUser = async (id: string) => {
    const user = await get<IUser>(API.users.singleUser(id));
    return user;
};

const EditUserPage = async ({ params }: { params: Params }) => {
    const user = await getUser(params.id);

    return (
        <section className="flex h-full w-full flex-1 flex-col gap-4 lg:gap-8">
            <PageHeader
                title={`ویرایش کاربر "${user.first_name || user.last_name ? user.first_name + " " + user.last_name : user.email}"`}
            />
            <AddAndEditUser initialData={user} />
        </section>
    );
};

export default EditUserPage;
