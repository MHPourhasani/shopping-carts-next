import { IIconProps } from "@/shared/interfaces";

const HamMenuIcon = ({ onClick, className }: IIconProps) => {
    return (
        <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <path d="M1 1H13M1 5H13M1 9H13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default HamMenuIcon;
