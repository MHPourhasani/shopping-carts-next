import { IIconProps } from "@/shared/interfaces";

const ArrowDownIcon = ({ onClick, className }: IIconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <path
                d="M16.01 12.85L13.39 15.47C12.62 16.24 11.36 16.24 10.59 15.47L4.07996 8.94995M19.92 8.94995L18.88 9.98995"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowDownIcon;
