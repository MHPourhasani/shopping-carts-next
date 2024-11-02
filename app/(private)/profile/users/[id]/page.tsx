import EditUser from "@/utils/pages/profile/users/EditUser";

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

    return <EditUser data={user} />;
};

export default EditUserPage;
