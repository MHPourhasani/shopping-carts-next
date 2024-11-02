import ClockIcon from "@/assets/icons/components/Clock";
import UserIcon from "@/assets/icons/components/User";
import { ReviewInterface } from "@/interfaces/general";
import { showFullDate } from "@/utils/helper";

const ReviewCard = ({ author, title, rating, description, createdAt }: ReviewInterface) => {
    const getRatingColor = (rating: number) => {
        const colors: any = { 1: "bg-red-500", 2: "bg-orange-500", 3: "bg-yellow-500", 4: "bg-green-400", 5: "bg-green-500" };
        return colors[rating];
    };

    return (
        <div className="flex w-full min-w-[250px] flex-col gap-2 rounded-xl bg-bg-2 p-2 dark:bg-secondary-700 lg:p-4">
            <span className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-secondary-600 dark:text-white">{title}</h3>
                <p className={`rounded-md px-2 py-0.5 text-sm text-white ${getRatingColor(rating)}`}>{rating}</p>
            </span>

            <p className="text-gray-600 dark:text-gray-300">{description}</p>

            <div className="flex gap-2 truncate border-t pt-2 text-xs text-gray-400 lg:gap-4">
                <span className="flex items-center gap-1 text-secondary-400 dark:text-secondary-300">
                    <ClockIcon className="size-4 fill-secondary-400 dark:fill-secondary-300" />
                    <p className="truncate">{showFullDate(createdAt)}</p>
                </span>
                |
                <span className="flex items-center gap-1 text-secondary-400 dark:text-secondary-300">
                    <UserIcon className="size-3.5 fill-secondary-400 dark:fill-secondary-300" />
                    <p className="truncate">
                        {author?.first_name} {author?.last_name}
                    </p>
                </span>
            </div>
        </div>
    );
};

export default ReviewCard;
