import { IIconProps } from "@/interfaces/general";

const ClearIcon = ({ onClick, className }: IIconProps) => {
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
            <path d="M12 4L4 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 4L12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default ClearIcon;
