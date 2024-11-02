import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema(
    {
        author: {
            type: ObjectId,
            ref: "User",
            required: [true, "Review must belong to user"],
        },
        product: {
            type: ObjectId,
            ref: "Product",
            required: [true, "Review must belong to product"],
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            min: 1,
            Max: 5,
            required: [true, "Review ratings required"],
        },
    },
    { timestamps: true },
);

const reviewModel = mongoose.models.Review || mongoose.model("Review", schema);

export default reviewModel;
