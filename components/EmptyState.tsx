import Image from "next/image";
import Link from "next/link";
import Button from "./common/Button";

interface Props {
    imgSrc?: any;
    className?: string;
    imgClassName?: string;
    title?: string;
    description?: string;
    linkHref?: string;
    linkTitle?: string;
    btnTitle?: string;
    btnFunction?: () => void;
}

const EmptyState = ({ imgSrc, className, imgClassName, title, description, linkHref, linkTitle, btnTitle, btnFunction }: Props) => {
    return (
        <div className={`flex w-full flex-1 flex-col items-center justify-center gap-6 p-4 md:p-0 ${className}`}>
            {imgSrc && <Image src={imgSrc} alt={title || "empty"} className={`w-1/2 xl:w-3/12 ${imgClassName}`} />}
            <span className="text-lg">{title}</span>
            {description && <p className="text-center text-xl">{description}</p>}

            {linkHref && linkTitle ? (
                <Link
                    href={linkHref}
                    className="flex w-9/12 items-center justify-center rounded-full bg-primary-100 py-2.5 text-white hover:bg-violet-700 md:max-w-3xl lg:py-3 xl:max-w-[200px]"
                >
                    {linkTitle}
                </Link>
            ) : null}

            {btnTitle && (
                <Button onClick={btnFunction} className="w-9/12 py-2.5 md:max-w-3xl lg:py-3 xl:max-w-[200px]">
                    {btnTitle}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
