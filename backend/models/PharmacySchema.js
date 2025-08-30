const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name:{type: String, required: true},
    passwordHash: { type: String, required: true },
    role: { type: String, default: "pharmacy" },
    isProfileComplete : { type : Boolean, default:false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);