import { IIconProps } from "@/shared/interfaces";

const AppleLogo = ({ onClick, className }: IIconProps) => {
    return (
        <svg
            width="21"
            height="25"
            viewBox="0 0 21 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <g id="Apple svg" clipPath="url(#clip0_9_1573)">
                <g id="Group">
                    <path
                        id="Vector"
                        d="M19.7981 8.59442C18.1595 9.60696 17.1475 11.3427 17.1475 13.2714C17.1475 15.4411 18.4487 17.4179 20.4246 18.2376C20.039 19.4912 19.4607 20.6484 18.7378 21.7092C17.6776 23.2039 16.5691 24.7468 14.9306 24.7468C13.292 24.7468 12.8101 23.7825 10.8824 23.7825C9.00287 23.7825 8.32818 24.795 6.78601 24.795C5.24384 24.795 4.1836 23.3967 2.97878 21.661C1.38842 19.2502 0.472753 16.4536 0.424561 13.5125C0.424561 8.73907 3.5089 6.18362 6.59324 6.18362C8.23179 6.18362 9.58119 7.24437 10.5932 7.24437C11.5571 7.24437 13.0993 6.1354 14.9306 6.1354C16.8583 6.08719 18.6896 7.00329 19.7981 8.59442ZM14.0631 4.11033C14.8824 3.14601 15.3161 1.94061 15.3643 0.686994C15.3643 0.542346 15.3643 0.349482 15.3161 0.204834C13.9185 0.349482 12.6173 1.02451 11.7017 2.08526C10.8824 3.00136 10.4005 4.15855 10.3523 5.41216C10.3523 5.55681 10.3523 5.70146 10.4005 5.84611C10.4969 5.84611 10.6414 5.89432 10.7378 5.89432C12.039 5.79789 13.2438 5.12287 14.0631 4.11033Z"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_9_1573">
                    <rect width="20" height="24.5902" fill="white" transform="translate(0.424561 0.204834)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default AppleLogo;
