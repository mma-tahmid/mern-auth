const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },

    { timestamps: true, versionKey: false }
);

// model
const userModels = mongoose.model("users", userSchema);
module.exports = userModels;