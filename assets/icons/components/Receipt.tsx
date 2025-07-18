import { IIconProps } from "@/shared/interfaces";

const ReceiptIcon = ({ onClick, className }: IIconProps) => {
    return (
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <path
                d="M20.8333 7.04C20.8333 3.01 19.8933 2 16.1133 2H8.55325C4.77325 2 3.83325 3.01 3.83325 7.04V18.3C3.83325 20.96 5.29325 21.59 7.06325 19.69L7.07325 19.68C7.89325 18.81 9.14325 18.88 9.85325 19.83L10.8633 21.18C11.6733 22.25 12.9833 22.25 13.7933 21.18L14.8033 19.83C15.5233 18.87 16.7733 18.8 17.5933 19.68C19.3733 21.58 20.8233 20.95 20.8233 18.29V11M8.33325 7H16.3333M9.33325 11H15.3333"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ReceiptIcon;
