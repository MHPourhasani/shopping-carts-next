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
        orders: [
            {
                orderNo: { type: String, required: true },
                products: [productSchema],
                payment: { method: { type: String, required: true }, transportCost: { type: Number, required: true } },
                createdAt: { type: Date, required: true, default: Date.now },
                pricePaid: { type: Number, required: true },
                address: {
                    address_title: { type: String, required: true },
                    address_value: { type: String, required: true },
                    isSelected: { type: Boolean, required: true },
                },
                description: { type: String },
            },
        ],
    },
    { timestamps: true },
);

const orderModel = mongoose.models.Order || mongoose.model("Order", schema);

export default orderModel;
