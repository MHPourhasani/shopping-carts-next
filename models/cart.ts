import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    color: {
        name: { type: String, required: true },
        hex: { type: String, required: true },
    },
    size: {
        type: Number,
        required: true,
    },
});

const schema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: "User",
        },
        products: [productSchema],
    },
    { timestamps: true },
);

const cartModel = mongoose.models.Cart || mongoose.model("Cart", schema);

export default cartModel;
