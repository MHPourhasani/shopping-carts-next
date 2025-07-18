import { IIconProps } from "@/shared/interfaces";

const ArrowLeft = ({ onClick, className }: IIconProps) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <path
                d="M7.46004 5.29336L5.71337 7.04003C5.20004 7.55336 5.20004 8.39336 5.71337 8.90669L10.06 13.2534M10.06 2.69336L9.3667 3.38669"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowLeft;
