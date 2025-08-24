const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountedPrice: {
    type: Number,
    min: 0,
    validate: {
      validator: function (value) {
        return value <= this.price;
      },
      message: "Discounted price cannot be greater than the original price"
    }
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String, // filename from multer
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
