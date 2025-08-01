import { IIconProps } from "@/shared/interfaces";

const AddIcon = ({ className, onClick }: IIconProps) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            onClick={onClick}
        >
            <g id="Iconsax/Broken/add">
                <path id="Vector" d="M8 12V4M10.6667 8H12M4 8H7.77333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
};

export default AddIcon;
