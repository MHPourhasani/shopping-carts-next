import PageHeader from "@/components/PageHeader/PageHeader";
import AddAndEditUser from "@/utils/pages/profile/users/AddAndEditUser";

const CreateUser = () => {
    return (
        <section className="flex h-full w-full flex-1 flex-col gap-4 lg:gap-8">
            <PageHeader title="ایجاد کاربر جدید" />

            <AddAndEditUser />
        </section>
    );
};

export default CreateUser;
