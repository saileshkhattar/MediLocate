const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);