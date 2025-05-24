"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PATH from "@/shared/path";
import SearchIcon from "@/assets/icons/components/Search";
import { Input } from "./ui/input";

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
        <div className="relative flex w-full flex-col items-center justify-center">
            <Input
                type="search"
                placeholder="جست و جو ..."
                value={searchValue}
                onChange={onChange || changeHandler}
                onKeyDown={searchHandler}
                className="!pl-12"
            />

            <SearchIcon
                onClick={() => router.push(`${PATH.search()}?q=${searchValue}`)}
                className="stroke-secondary-300 absolute top-1/4 left-4 h-auto w-5 cursor-pointer dark:stroke-gray-300"
            />
        </div>
    );
};

export default Search;
