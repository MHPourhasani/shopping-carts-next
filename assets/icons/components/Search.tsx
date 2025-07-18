import { IIconProps } from "@/shared/interfaces";

const SearchIcon = ({ onClick, style, className }: IIconProps) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            style={style}
            className={className}
        >
            <g clipPath="url(#clip0_222_1437)">
                <path
                    d="M7.66658 1.33337C11.1666 1.33337 13.9999 4.16671 13.9999 7.66671C13.9999 11.1667 11.1666 14 7.66658 14C4.16659 14 1.33325 11.1667 1.33325 7.66671C1.33325 5.20004 2.73992 3.06671 4.79992 2.02004M14.6666 14.6667L13.3333 13.3334"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_222_1437">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default SearchIcon;
