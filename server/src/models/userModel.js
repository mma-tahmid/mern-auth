const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profilePicture: {
            type: String,
            default: "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg"
        }
    },

    { timestamps: true, versionKey: false }
);

// model
const userModels = mongoose.model("users", userSchema);
module.exports = userModels;