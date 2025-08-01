import { IIconProps } from "@/shared/interfaces";

const ClockIcon = ({ onClick, className }: IIconProps) => {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3.53846C7.32682 3.53846 3.53846 7.32682 3.53846 12C3.53846 16.6732 7.32682 20.4615 12 20.4615C16.6732 20.4615 20.4615 16.6732 20.4615 12C20.4615 7.32682 16.6732 3.53846 12 3.53846ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6.10256C12.4249 6.10256 12.7693 6.44696 12.7693 6.8718V12C12.7693 12.204 12.6882 12.3997 12.544 12.5439L9.46703 15.6209C9.16662 15.9213 8.67957 15.9213 8.37917 15.6209C8.07877 15.3204 8.07877 14.8334 8.37917 14.533L11.2308 11.6814V6.8718C11.2308 6.44696 11.5752 6.10256 12 6.10256Z"
            />
        </svg>
    );
};

export default ClockIcon;
