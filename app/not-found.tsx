import notFoundImage from "@/assets/icons/svgs/404-page.svg";
import PATH from "@/shared/path";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "یافت نشد",
};

const NotFound = () => {
    return (
        <section className="flex min-h-screen w-full flex-1 flex-col items-center justify-center gap-4 p-4">
            <Image src={notFoundImage} alt="not-found" className={`lg:w-6/12 xl:w-1/2`} />

            <Link
                href={PATH.home()}
                className="flex w-full items-center justify-center rounded-full bg-primary-100 py-3 text-lg text-white lg:w-6/12 xl:w-1/2"
            >
                رفتن به خانه
            </Link>
        </section>
    );
};

export default NotFound;
