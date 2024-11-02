import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema(
    {
        shopper: {
            type: ObjectId,
            ref: "Shop",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
            lowercase: true,
        },
        description: {
            type: String,
            minlength: 15,
        },
        brand: {
            type: String,
            required: true,
            lowercase: true,
        },
        brandLogo: {
            type: String,
        },
        services: {
            type: String,
        },
        price: {
            type: Number,
            trim: true,
            default: 0,
        },
        discountedPrice: {
            type: Number || null,
            default: null,
        },
        images: {
            type: [String],
            default: [],
        },
        categories: {
            type: String,
            default: "",
        },
        tags: {
            type: String,
            default: "",
        },
        sizes: {
            type: String,
            default: "",
            required: true,
        },
        colors: {
            type: [{ name: { type: String, required: true }, hex: { type: String, required: true } }],
        },
        relatedProducts: {
            type: [{ type: ObjectId, ref: "Product" }],
            default: [],
        },
        ratingsAverage: {
            type: Number,
            min: [1, "Rating must be above or equal 1.0"],
            max: [5, "Rating must be below or equal 5.0"],
        },
        ratingsQuantity: {
            type: Number,
            default: 5,
        },
    },
    { timestamps: true },
);

schema.virtual("favorites", {
    ref: "Favorite",
    localField: "_id",
    foreignField: "products",
});

schema.virtual("orders", {
    ref: "Order",
    localField: "_id",
    foreignField: "products",
});

const ProductModel = mongoose.models.Product || mongoose.model("Product", schema);

export default ProductModel;
