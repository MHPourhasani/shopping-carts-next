import mongoose from "mongoose";

var banner = new mongoose.Schema({
    name: {
        type: String,
    },
    src: {
        type: String,
    },
    type: {
        type: String,
    },
});

const bannerModel = mongoose.models.Banner || mongoose.model("Banner", banner);

export default bannerModel;
