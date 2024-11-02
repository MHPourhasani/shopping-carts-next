import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import Textarea from "../common/Textarea";

interface Props {
    productId: string;
    onSubmit: any;
}

const AddReview = ({ productId, onSubmit }: Props) => {
    const { data: session } = useSession();
    const [reviewValue, setReviewValue] = useState({ title: "", description: "", rating: 5 });

    const changeHandler = (e: any) => {
        setReviewValue({ ...reviewValue, [e.target.name]: e.target.value });
    };

    const addCommentHandler = async () => {
        const res = await fetch(`/api/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                author: session?.user.userId,
                product: productId,
                ...reviewValue,
            }),
        });

        const { data, message } = await res.json();

        if (res.ok) {
            onSubmit(data);
            setReviewValue({ title: "", description: "", rating: 5 });
            toast.success(message);
        } else {
            toast.error(`Comment failed added`);
        }
    };

    return (
        <div className="w-full">
            <h3 className="mb-2 text-lg font-semibold lg:mb-4 lg:text-xl">لطفاً نظر خود را بنویسید.</h3>
            <div className="flex flex-col gap-2">
                <Input
                    type="موضوع"
                    name="title"
                    value={reviewValue.title}
                    onChange={changeHandler}
                    inputClassName="border-gray-300 focus:border-primary-100"
                />

                <div className="flex w-full flex-col gap-2">
                    <Textarea
                        id="description"
                        label="توضیحات"
                        name="description"
                        value={reviewValue.description}
                        onChange={changeHandler}
                        className="h-48 max-h-96 rounded-xl border-[1.5px] border-gray-300 p-3 outline-none focus:border-primary-100 focus:outline-none"
                    />
                </div>

                <Button variant="Secondary" onClick={addCommentHandler} className="border-1.5">
                    ارسال نظر
                </Button>
            </div>
        </div>
    );
};

export default AddReview;
