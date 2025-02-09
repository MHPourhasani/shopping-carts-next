import { IReview } from "@/interfaces/general";
import ReviewCard from "../ReviewCard/ReviewCard";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";

interface Props {
    reviews: IReview[];
    limit?: number;
    isLoading: boolean;
}

const ReviewsList = ({ reviews, limit, isLoading }: Props) => {
    return (
        <section className="w-full">
            <div className="mb-2 flex items-center justify-between lg:mb-4">
                <h3 className="text-lg font-semibold lg:text-xl">نظرات</h3>
                {reviews && !!reviews.length && <span className="text-sm lg:text-base">{reviews.length} نظر</span>}
            </div>

            {!isLoading ? (
                <div className="no-scrollbar flex w-full gap-2 lg:flex-col lg:overflow-y-auto">
                    {reviews && reviews.length ? (
                        <div className="flex w-full items-center gap-2">
                            <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto lg:flex-col lg:overscroll-x-none">
                                {reviews.slice(0, limit ? limit : undefined).map((review: IReview) => {
                                    return <ReviewCard key={String(review._id)} {...review} />;
                                })}
                            </div>

                            {limit && reviews.length > limit && (
                                <span className="ml-2 flex w-16 cursor-pointer flex-col items-center gap-2 text-center">
                                    <span className="rounded-md border-[1.5px] border-primary-100 p-1">
                                        <ArrowLeft className="rotate-180 stroke-primary-100" />
                                    </span>
                                    مشاهده همه
                                </span>
                            )}
                        </div>
                    ) : (
                        <p>هیچ نظری برای این محصول ثبت نشده است.</p>
                    )}
                </div>
            ) : (
                <p>لطفاً صبر کنید...</p>
            )}
        </section>
    );
};

export default ReviewsList;
