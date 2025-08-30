const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: { type: String, required: true },
  jobTitle: { type: String },
  phoneNumber: { type: String },
  address: { type: String },
  profileImage: {
    type: String,
    default: "public/defauts/default-user.png", // Default avatar
  }
},{timestamps  : true});

module.exports = mongoose.model("UserProfile", userProfileSchema);