import Search from "@/utils/pages/search";
import PATH from "@/utils/path";
import { Metadata } from "next";
import { Suspense } from "react";

const title = "جست و جو";
const description = "در این صفحه کاربر می تواند بر اساس نیاز خود جست و جو کند.";
const url = PATH.search();

export const metadata: Metadata = {
    title: title,
    description: description,
    keywords: ["Search", "Search page"],
    alternates: { canonical: url },
    openGraph: { title: title, description: description },
    twitter: { title: title, description: description },
    other: {
        "twitter:url": url,
    },
};

const SearchPage = () => {
    return (
        <Suspense fallback={<p className="dark:text-gray-400">در حال بارگزاری ...</p>}>
            <Search />
        </Suspense>
    );
};

export default SearchPage;
