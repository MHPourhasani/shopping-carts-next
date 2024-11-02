import { IconProps } from "@/interfaces/general";

const Minus = ({ className, onClick }: IconProps) => {
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
            <g id="Iconsax/Broken/minus">
                <path id="Vector" d="M10.6667 8H12M4 8H7.77333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
};

export default Minus;
