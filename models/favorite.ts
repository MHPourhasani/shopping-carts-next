import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
import productModel from "@/models/product";

const schema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true,
    },
    products: [
        {
            type: ObjectId,
            ref: "Product",
        },
    ],
});

const favoriteModel = mongoose.models.Favorite || mongoose.model("Favorite", schema);

export default favoriteModel;
