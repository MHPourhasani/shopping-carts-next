import { useRouter } from "next/navigation";
import { useState } from "react";

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

            {/* {selectedTabs ===TabsEnum.reviews && <section className="flex w-full gap-10 py-10">
                <div className="w-7/12">
                    <ReviewsList reviews={reviews ? reviews.slice(0, 5) : []} isLoading={false} />
                </div>

                <div className="flex flex-1 flex-col gap-4">
                    <span
                        onClick={() => {
                            if (session?.user.userId) {
                                setIsAddReview(!isAddReview);
                            } else {
                                router.push(`${PATH.login()}?redirect=${PATH.singleProduct(_id.toString(), name)}`);
                                toast.success("لطفا وارد شوید");
                            }
                        }}
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <EditIcon className="size-5 fill-primary-100" />
                        <p className="text-primary-100">نظر خود را برای این محصول بنویسید.</p>
                    </span>

                    {isAddReview ? (
                        <AddReview
                            productId={String(params.slug)}
                            onSubmit={(review: any) => {
                                setIsAddReview(false);
                                setReviews((prev: any) => [...prev, review]);
                            }}
                        />
                    ) : null}
                </div>
            </section>} */}
        </div>
    );
};

export default SingleProductTab;
