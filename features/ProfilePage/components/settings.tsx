import PageHeader from "@/shared/components/PageHeader";
import ThemeSwitch from "@/shared/components/ThemeSwitch";

const Settings = () => {
    return (
        <section className="flex w-full flex-1 flex-col gap-4 lg:gap-8">
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
