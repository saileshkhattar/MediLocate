const mongoose = require("mongoose");

const pharmacyProfileSchema = new mongoose.Schema(
  {
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy", required: true },
    pharmacyName: { type: String, required: true },
    ownerName: { type: String },
    location: { type: String },
    contactNumber: { type: String },
    licenceInfo: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PharamcyProfile", pharmacyProfileSchema);