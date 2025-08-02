interface Props {
    tags: string[];
}

const ProductTags = ({ tags }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-semibold">تگ ها</h4>
            <div className="flex flex-wrap gap-1.5">
                {tags.map((category: string) => {
                    return (
                        <span
                            key={category}
                            className="bg-bg-2 dark:bg-customBlack-50 rounded-md px-2 py-0.5 text-gray-500 dark:text-gray-300"
                        >
                            {category}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductTags;
