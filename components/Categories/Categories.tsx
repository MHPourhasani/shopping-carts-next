import Image from "next/image";
import Link from "next/link";
import { capitalizeTheFirstLettersOfWords } from "@/utils/helper";
import { BrandsInterface, CategoryInterface } from "@/interfaces/general";
import PATH from "@/utils/path";

interface Props {
    categories: CategoryInterface[];
}

const Categories = async ({ categories }: Props) => {
    return (
        <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto px-4 lg:justify-center">
            {!!categories.length &&
                categories.map((brand: BrandsInterface) => {
                    return (
                        <Link
                            key={String(brand._id)}
                            href={PATH.singleBrand(brand.name.toLowerCase())}
                            className="flex w-20 flex-col items-center justify-center gap-2 lg:w-28"
                        >
                            <span className="flex aspect-square size-20 items-center justify-center rounded-full border-2 border-bg-2 bg-bg-2 dark:border-secondary-50 dark:bg-secondary-100 lg:size-24">
                                <Image
                                    src={brand.src}
                                    alt={brand.name.toLowerCase()}
                                    width={500}
                                    height={500}
                                    className="object-contain p-1.5"
                                />
                            </span>
                            <h3>{capitalizeTheFirstLettersOfWords(brand.name)}</h3>
                        </Link>
                    );
                })}
        </div>
    );
};

export default Categories;
