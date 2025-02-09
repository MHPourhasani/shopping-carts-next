import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

var blog = new mongoose.Schema(
    {
        author: {
            type: ObjectId,
            ref: "User",
            required: [true, "Blog must belong to author"],
        },
        link: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: String,
            default: "",
        },
        keywords: {
            type: String,
            default: "",
        },
        categories: {
            type: String,
            default: "",
        },
        readingTime: {
            type: Number,
        },
        relatedBlogs: {
            type: [{ type: ObjectId, ref: "Blog" }],
            default: [],
        },
    },
    { timestamps: true },
);

const blogModel = mongoose.models.Blog || mongoose.model("Blog", blog);

export default blogModel;
