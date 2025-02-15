import BackButton from "../BackButton";

interface Props {
    mobileBackButton?: boolean;
    desktopBackButton?: boolean;
    title: string;
    children?: React.ReactNode;
}

const PageHeader = ({ mobileBackButton = true, desktopBackButton = true, title, children }: Props) => {
    return (
        <div className="mb-4 flex w-full flex-col gap-4">
            <BackButton className={`${mobileBackButton ? "flex" : "hidden"} ${desktopBackButton ? "lg:flex" : "lg:hidden"}`} />
            <div className="flex w-full items-center justify-between">
                <h1 className="truncate whitespace-break-spaces text-3xl font-bold text-customBlack-200 dark:text-white">{title}</h1>
                {children && children}
            </div>
        </div>
    );
};

export default PageHeader;
