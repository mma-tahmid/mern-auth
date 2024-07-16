const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        // trim remove white space in letter
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        answer: { type: String, required: true },
        role: { type: Number, default: 0 }, // 0 means false , 1 means true (also indicates admin)

    },

    { timestamps: true, versionKey: false }
);

// model
const userModels = mongoose.model("users", userSchema);
module.exports = userModels;