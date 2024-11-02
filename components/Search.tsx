"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PATH from "@/utils/path";
import SearchIcon from "@/assets/icons/components/Search";
import Input from "./common/Input";

interface Props {
    onChange?: any;
}

const Search = ({ onChange }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams().get("q");
    const [searchValue, setSearchValue] = useState(searchParams ? searchParams : "");

    useEffect(() => {
        setSearchValue(searchParams ? searchParams : "");
    }, [searchParams]);

    const changeHandler = (e: any) => {
        setSearchValue(e.target.value);
    };

    const searchHandler = (e: any) => {
        if (e.keyCode === 13) {
            router.push(`${PATH.search()}?q=${searchValue}`);
        }
    };

    return (
        <section className="relative flex w-full flex-col items-center justify-center">
            <SearchIcon
                onClick={() => router.push(`${PATH.search()}?q=${searchValue}`)}
                className="absolute left-4 top-1/4 h-auto w-5 cursor-pointer stroke-secondary-300 dark:stroke-secondary-100"
            />
            <Input
                type="search"
                placeholder="جست و جو ..."
                value={searchValue}
                onChange={onChange || changeHandler}
                onKeyDown={searchHandler}
                inputClassName="w-full bg-bg-2 !pl-12 pr-4 text-sm dark:bg-secondary-700 dark:lg:bg-secondary-600"
            />
        </section>
    );
};

export default Search;
