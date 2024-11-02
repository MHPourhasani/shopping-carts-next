import PageHeader from "@/components/PageHeader/PageHeader";
import ThemeSwitch from "@/components/ThemeSwitch";

const Settings = () => {
    return (
        <section className="flex w-full flex-col gap-4 flex-1 lg:gap-8">
            <PageHeader title="تنظیمات" desktopBackButton={false} />

            <div className="flex w-full flex-col gap-4">
                <div className="flex items-center justify-between gap-4 border-b">
                    <p>تغییر تم</p>
                    <ThemeSwitch />
                </div>
            </div>
        </section>
    );
};

export default Settings;
