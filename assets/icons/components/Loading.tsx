import { IIconProps } from "@/shared/interfaces";

const LoadingIcon = ({ onClick, className }: IIconProps) => {
    return (
        <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.02237 13C1.56713 13 2 12.5448 2 12C2 8.28751 2.89076 5.87413 4.31898 4.38381C5.73197 2.90938 7.99714 2 11.5 2C15.0029 2 17.268 2.90938 18.681 4.38381C19.3723 5.10519 19.9377 6.04284 20.3371 7.23941C20.4847 7.68145 20.8858 8 21.3518 8C22.0005 8 22.4866 7.39837 22.2908 6.7799C20.8596 2.25997 17.2627 0 11.5 0C3.83333 0 0 4 0 12C0 12.0147 1.29138e-05 12.0294 3.87415e-05 12.044C0.000980817 12.5786 0.442527 13 0.977131 13H1.02237ZM2.66286 16.7606C2.51531 16.3185 2.11425 16 1.64823 16C0.999492 16 0.513417 16.6016 0.709241 17.2201C2.14036 21.74 5.73728 24 11.5 24C19.1667 24 23 20 23 12C23 11.9853 23 11.9706 23 11.956C22.999 11.4214 22.5575 11 22.0229 11H21.9776C21.4329 11 21 11.4552 21 12C21 15.7125 20.1092 18.1259 18.681 19.6162C17.268 21.0906 15.0029 22 11.5 22C7.99714 22 5.73197 21.0906 4.31898 19.6162C3.62766 18.8948 3.06226 17.9572 2.66286 16.7606Z"
            />
            <path d="M22 1V7H16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 23L0.999999 17L7 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default LoadingIcon;
