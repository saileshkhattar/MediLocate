const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    location: {
        lat: Number,
        lng: Number
    },
    openingHours: String
}, { timestamps: true });

module.exports = mongoose.model("Pharmacy", pharmacySchema);