import notFoundImage from "@/assets/icons/svgs/404-page.svg";
import { Button } from "@/components/ui/button";
import PATH from "@/shared/utils/path";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "صفحه مورد نظر یافت نشد",
};

const NotFound = () => {
    return (
        <section className="flex min-h-dvh min-w-dvw flex-col items-center justify-center gap-4 p-4">
            <Image src={notFoundImage} alt="not found" className={`lg:w-6/12 xl:w-1/2`} />

            <p>صفحه مورد نظر یافت نشد.</p>

            <Link href={PATH.home()}>
                <Button variant="text">رفتن به خانه</Button>
            </Link>
        </section>
    );
};

export default NotFound;
