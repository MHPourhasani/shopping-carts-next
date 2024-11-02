import PageHeader from "@/components/PageHeader/PageHeader";
import AddAndEditUser from "@/utils/pages/profile/users/AddAndEditUser";

interface Params {
    id: string;
}

const getUser = async (user_id: string) => {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/auth/users/${user_id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            cache: "no-store",
        });
        if (response.ok) {
            const { user } = await response.json();
            return user;
        }
    } catch (error) {
        console.error(error);
    }
};

const EditUserPage = async ({ params }: { params: Params }) => {
    const user = await getUser(params.id);

    return (
        <section className="flex h-full w-full flex-1 flex-col gap-4 lg:gap-8">
            <PageHeader
                title={`ویرایش کاربر "${user.first_name || user.last_name ? user.first_name + " " + user.last_name : user.email}"`}
            />
            <AddAndEditUser data={user} isEdit />
        </section>
    );
};

export default EditUserPage;
