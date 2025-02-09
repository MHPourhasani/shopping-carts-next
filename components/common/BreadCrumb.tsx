"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/helper";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";
import Link from "next/link";
import PATH from "@/shared/path";
import HomeIcon from "@/assets/icons/components/Home";

type TBreadCrumb = { title: string; path: string };

interface IBreadCrumbProps {
    items: TBreadCrumb[];
    className?: string;
}

const BreadCrumb = (props: IBreadCrumbProps) => {
    const pathname = usePathname();

    return (
        <div className={cn("my-4 flex w-full items-center gap-4", props.className)}>
            <HomeIcon className="fill-secondary-300 dark:fill-secondary-100" />
            <Link
                href={PATH.home()}
                className={`hover-transition cursor-pointer text-secondary-300 hover:text-primary-100 dark:text-secondary-100`}
            >
                خانه
            </Link>
            <ArrowLeft className="stroke-secondary-800 dark:stroke-secondary-100" />

            {props.items.length
                ? props.items.map((item, index) => (
                      <Link key={item.title} href={item.path} className="flex items-center gap-4">
                          <h3
                              className={`hover-transition cursor-pointer hover:text-primary-100 ${pathname === item.path ? "font-medium text-customBlack-200 dark:text-white" : "text-secondary-300 dark:text-secondary-100"}`}
                          >
                              {item.title}
                          </h3>
                          {props.items.length - 1 !== index && <ArrowLeft className="stroke-secondary-800 dark:stroke-secondary-100" />}
                      </Link>
                  ))
                : ""}
        </div>
    );
};

export default BreadCrumb;
