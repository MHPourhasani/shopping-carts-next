import EmptyState from "./EmptyState";

interface IProps {
    onClick?: () => void;
}

const Error500 = ({ onClick }: IProps) => {
    return <EmptyState title="مشکل سمت سرور" description="لطفاً چند دقیقه دیگر امتحان کنید." btnTitle="تلاش مجدد" btnFunction={onClick} />;
};

export default Error500;
