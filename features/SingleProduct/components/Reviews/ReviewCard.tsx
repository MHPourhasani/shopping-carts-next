import ClockIcon from "@/assets/icons/components/Clock";
import UserIcon from "@/assets/icons/components/User";
import { showFullDate } from "@/shared/utils/utils";
import { IReview } from "../../interface/review.interface";

const ReviewCard = ({ user, title, rating, comment, createdAt }: IReview) => {
    const getRatingColor = (rating: number) => {
        const colors: any = { 1: "bg-red-500", 2: "bg-orange-500", 3: "bg-yellow-500", 4: "bg-green-400", 5: "bg-green-500" };
        return colors[rating];
    };

    return (
        <div className="bg-bg-2 dark:bg-secondary-700 flex w-full min-w-[250px] flex-col gap-2 rounded-xl p-2 lg:p-4">
            <span className="flex items-center justify-between gap-2">
                <h3 className="text-secondary-600 text-lg font-semibold dark:text-white">{title}</h3>
                <p className={`rounded-md px-2 py-0.5 text-sm text-white ${getRatingColor(rating)}`}>{rating}</p>
            </span>

            <p className="text-gray-600 dark:text-gray-300">{comment}</p>

            <div className="flex gap-2 truncate border-t pt-2 text-xs text-gray-400 lg:gap-4">
                <span className="text-secondary-400 dark:text-secondary-300 flex items-center gap-1">
                    <ClockIcon className="fill-secondary-400 dark:fill-secondary-300 size-4" />
                    <p className="truncate">{showFullDate(createdAt)}</p>
                </span>
                |
                <span className="text-secondary-400 dark:text-secondary-300 flex items-center gap-1">
                    <UserIcon className="fill-secondary-400 dark:fill-secondary-300 size-3.5" />
                    <p className="truncate">
                        {user?.first_name} {user?.last_name}
                    </p>
                </span>
            </div>
        </div>
    );
};

export default ReviewCard;
