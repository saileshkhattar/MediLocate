const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    address: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);