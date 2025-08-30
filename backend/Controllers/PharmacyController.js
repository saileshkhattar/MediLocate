const Product = require("../models/Product");

exports.AddMedicine =async (req, res) => {
  try {
    const { name, category, price, discountedPrice, quantity } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const product = new Product({
      name,
      category,
      price,
      discountedPrice,
      quantity,
      image: req.file.filename, 
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });

  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};
