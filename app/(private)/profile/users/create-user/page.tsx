import AddAndEditUser from "@/features/Profile/components/users/AddAndEditUser";
import PageHeader from "@/shared/components/PageHeader";

const CreateUser = () => {
    return (
        <section className="flex h-full w-full flex-1 flex-col gap-4 lg:gap-8">
            <PageHeader title="ایجاد کاربر جدید" />

            <AddAndEditUser />
        </section>
    );
};

export default CreateUser;
