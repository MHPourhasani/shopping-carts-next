import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const shopSchema = new mongoose.Schema(
    {
        creator: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        description: { type: String, trim: true },
        phone_number: { type: String, min: 8 },
        logo: {
            type: String,
        },
    },
    { timestamps: true },
);

shopSchema.virtual("Products", {
    ref: "Product",
    localField: "_id",
    foreignField: "shopper",
});

const shopModel = mongoose.models.Shop || mongoose.model("Shop", shopSchema);

export default shopModel;
