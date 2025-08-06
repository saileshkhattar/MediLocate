const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Medicine", medicineSchema);
