import { UserRoleEnum } from "@/interfaces/general";
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_title: {
        type: String,
        required: true,
    },
    address_value: {
        type: String,
        required: true,
    },
    isSelected: {
        type: Boolean,
        default: false,
    },
});

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            index: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        first_name: {
            type: String,
            default: "",
        },
        last_name: {
            type: String,
            default: "",
        },
        profile_image: {
            type: String,
            default: "",
        },
        phone_number: {
            type: String,
            min: 11,
            max: 11,
        },
        addresses: [addressSchema] || [],
        emailValid: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: UserRoleEnum.USER,
            enum: {
                values: ["ADMIN", "USER", "SHOPPER", "AUTHOR"],
            },
        },
    },
    { timestamps: true },
);

userSchema.virtual("notifications", {
    ref: "Notification",
    localField: "_id",
    foreignField: "user",
});

userSchema.virtual("carts", {
    ref: "Cart",
    localField: "_id",
    foreignField: "user",
});

userSchema.virtual("favorites", {
    ref: "Favorite",
    localField: "_id",
    foreignField: "user",
});

userSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "author",
});

userSchema.virtual("shops", {
    ref: "Shop",
    localField: "_id",
    foreignField: "creator",
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
