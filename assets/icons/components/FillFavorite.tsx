import { IIconProps } from "@/shared/interfaces";

const FillFavoriteIcon = ({ onClick, className }: IIconProps) => {
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
            <g id="Iconsax/Broken/heart">
                <path
                    id="Vector"
                    d="M13.7267 3.31454C14.3133 3.97454 14.6667 4.8412 14.6667 5.79454C14.6667 10.4612 10.3467 13.2145 8.41334 13.8812C8.18668 13.9612 7.81334 13.9612 7.58668 13.8812C5.65334 13.2145 1.33334 10.4612 1.33334 5.79454C1.33334 3.73454 2.99334 2.06787 5.04001 2.06787C6.25334 2.06787 7.32668 2.65454 8.00001 3.5612C8.34253 3.09845 8.78866 2.72235 9.30267 2.46303C9.81669 2.20371 10.3843 2.06838 10.96 2.06787"
                    fill="#FA3636"
                />
            </g>
        </svg>
    );
};

export default FillFavoriteIcon;
