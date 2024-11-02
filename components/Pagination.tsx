import { usePagination, DOTS } from "@/hooks/usePagination";
import ArrowLeft from "@/assets/icons/components/ArrowLeft";

interface Props {
    onPageChange: (page: number) => any;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
    className?: string;
}

const Pagination = (props: Props) => {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange?.length! < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange![paginationRange!.length - 1];

    return (
        <ul className={`mt-5 flex items-center justify-center gap-6`}>
            {/* Left navigation arrow */}
            <button onClick={onPrevious} disabled={currentPage === 1} className="cursor-pointer disabled:cursor-not-allowed">
                <ArrowLeft
                    className={`size-6 rotate-180 stroke-secondary-600 dark:stroke-secondary-100 ${currentPage === 1 && "stroke-gray-400 dark:stroke-secondary-700"}`}
                />
            </button>

            {paginationRange!.map((pageNumber: any) => {
                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return (
                        <li key={pageNumber} className="pagination-item dots text-ellipsis">
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li
                        key={pageNumber}
                        className={`flex cursor-pointer items-center justify-center ${
                            pageNumber === currentPage ? "size-10 rounded-lg bg-primary-100 text-lg text-white" : ""
                        }`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}

            {/*  Right Navigation arrow */}
            <button onClick={onNext} disabled={currentPage === lastPage} className="cursor-pointer disabled:cursor-not-allowed">
                <ArrowLeft
                    className={`size-6 stroke-secondary-600 dark:stroke-secondary-100 ${currentPage === lastPage && "stroke-gray-400 dark:stroke-secondary-700"}`}
                />
            </button>
        </ul>
    );
};

export default Pagination;
