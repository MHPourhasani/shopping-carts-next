import ReviewsList from "@/features/SingleProductPage/components/Reviews/ReviewsList";
import { useState } from "react";
import { useSingleProductData } from "../../context/ProductData";
import AddReview from "../Reviews/AddReview";

enum TabsEnum {
    properties,
    reviews,
}

const tabs = [
    { title: "مشخصات", type: TabsEnum.properties },
    { title: "نظرات", type: TabsEnum.reviews },
];

const SingleProductTab = () => {
    const [selectedTabs, setSelectedTabs] = useState(TabsEnum.properties);
    const { data } = useSingleProductData();
    const reviews = data!.reviews;

    return (
        <div>
            <div className="flex items-center justify-center gap-4 border-b border-gray-200 dark:border-gray-600">
                {tabs.map((tab) => (
                    <span
                        onClick={() => setSelectedTabs(tab.type)}
                        className={`cursor-pointer ${selectedTabs === tab.type ? "text-primary-100" : ""}`}
                    >
                        {tab.title}
                        <div className={`mt-1 h-1 rounded-t-full ${selectedTabs === tab.type ? "bg-primary-100" : "opacity-0"}`} />
                    </span>
                ))}
            </div>

            <div className="w-full">
                {selectedTabs === TabsEnum.properties && (
                    <section className="flex w-full flex-col gap-4 py-10">
                        <div className="mb-2 flex items-center justify-between lg:mb-4">
                            <h3 className="text-lg font-semibold lg:text-xl">مشخصات</h3>
                            {reviews && !!reviews.length && <span className="text-sm lg:text-base">{reviews.length} نظر</span>}
                        </div>

                        <div className="flex w-full flex-col gap-10"></div>
                    </section>
                )}

                {selectedTabs === TabsEnum.reviews && (
                    <section className="flex w-full flex-col gap-4 py-10">
                        <div className="mb-2 flex items-center justify-between lg:mb-4">
                            <h3 className="text-lg font-semibold lg:text-xl">نظرات</h3>
                            {reviews && !!reviews.length && <span className="text-sm lg:text-base">{reviews.length} نظر</span>}
                        </div>

                        <div className="flex w-full gap-10">
                            <div className="w-3/12">
                                <AddReview />
                            </div>

                            <ReviewsList reviews={reviews ? reviews.slice(0, 5) : []} isLoading={false} />
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default SingleProductTab;
