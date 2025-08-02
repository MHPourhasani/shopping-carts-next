"use client";
import { useEffect, useRef, useState } from "react";
import PATH from "@/shared/utils/path";
import PageHeader from "@/shared/components/PageHeader";
import useOnClickOutside from "@/shared/hooks/useOnClickOutside";
import FilterIcon from "@/assets/icons/components/Filter";
import BreadCrumb from "@/shared/components/common/BreadCrumb";
import { IProduct } from "@/features/SingleProduct/interface/interface";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { DeviceSize } from "@/shared/enums";
import { Button } from "@/components/ui/button";

interface Props {
    products: IProduct[];
}

const Products = ({ products }: Props) => {
    const [isShow, setIsShow] = useState<{ filter: boolean; brands: boolean; colors: boolean }>({
        filter: false,
        brands: false,
        colors: false,
    });
    const isDesktop = useMediaQuery(DeviceSize.DESKTOP);
    const mobileFilterRef = useRef<any>();

    useEffect(() => {
        if (isShow.filter) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "auto";
            };
        }
    }, [isShow]);

    useOnClickOutside(mobileFilterRef, () => {
        setIsShow({ ...isShow, filter: false });
    });

    return (
        <>
            <section className="container flex w-full flex-1 flex-col items-start gap-4 lg:gap-8">
                <BreadCrumb items={[{ title: "همه محصولات", path: PATH.products() }]} />

                <PageHeader title="همه محصولات" desktopBackButton={false}>
                    <Button
                        variant="text"
                        onClick={() => setIsShow({ ...isShow, filter: !isShow.filter })}
                        className="text-primary-100 w-auto rounded-md px-2 lg:hidden dark:text-violet-400"
                    >
                        <FilterIcon className="stroke-primary-100 dark:stroke-violet-400" />
                    </Button>
                </PageHeader>
            </section>
        </>
    );
};

export default Products;
