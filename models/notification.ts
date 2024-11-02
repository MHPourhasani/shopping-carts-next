import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const notificationSchema = new mongoose.Schema({
    user: { type: ObjectId, required: true, ref: "User" },
    notifications: [
        {
            title: { type: String, required: true },
            message: { type: String, required: true },
            isViewed: { type: Boolean, default: false },
            createdAt: { type: Date, required: true, default: Date.now },
        },
        { timestamps: true },
    ],
});

const notificationModel = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default notificationModel;
