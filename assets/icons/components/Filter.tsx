import { IIconProps } from "@/shared/interfaces";

const FilterIcon = ({ onClick, className }: IIconProps) => {
    return (
        <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <path
                d="M3.33737 1H16.6626C18.5164 1 19.7323 3.28152 18.516 4.97213L12.9638 12.689C12.5511 13.2625 12.3313 13.9549 12.3313 14.6621V19.7513C12.3313 20.1568 12.1581 20.5302 11.8764 20.7748L9.65553 22.7041C8.92005 23.343 7.66868 22.8712 7.66868 21.6805V14.6621C7.66868 13.9549 7.44888 13.2625 7.03624 12.689L1.48404 4.97213C0.267673 3.28152 1.48356 1 3.33737 1Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M7 5H13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default FilterIcon;
