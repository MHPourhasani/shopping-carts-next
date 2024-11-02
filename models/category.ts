import mongoose from "mongoose";

const category = new mongoose.Schema({
    name: {
        type: String,
    },
    src: {
        type: String,
    },
});

const categoryModel = mongoose.models.Category || mongoose.model("Category", category);

export default categoryModel;
