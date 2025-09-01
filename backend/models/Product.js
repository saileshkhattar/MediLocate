const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    power: {
      type: String, // better as String (e.g., "500mg", "10ml"), not Number
      required: true,
      trim: true,
    },
    discountedPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Discounted price cannot be greater than the original price",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String, // store relative path from multer
      required: true,
      default: "uploads/defaults/default-medicine.png",
    },
    pharmacy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacy", 
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

