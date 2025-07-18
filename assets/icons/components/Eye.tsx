import { IIconProps } from "@/shared/interfaces";

const EyeIcon = ({ onClick, className }: IIconProps) => {
    return (
        <svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <path
                d="M1.65162 6.55522C1.41976 6.81798 1.41976 7.18202 1.65162 7.44478C3.37 9.39221 7.2293 13 12 13C16.7707 13 20.63 9.39221 22.3484 7.44478C22.5802 7.18202 22.5802 6.81798 22.3484 6.55522C20.63 4.60779 16.7707 1 12 1C7.2293 1 3.37 4.60779 1.65162 6.55522Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="3" cy="3" r="2" transform="matrix(-1 0 0 1 15 4)" strokeWidth="2" />
        </svg>
    );
};

export default EyeIcon;
