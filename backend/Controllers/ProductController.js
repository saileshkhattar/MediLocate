const Product = require("../models/Product")
const Pharamcy = require("../models/PharmacySchema")
const PharmacyProfile = require("../models/PharmacyProfile")


exports.getPharamcies = async (req, res) => {
  try {
    console.log("dddddd");
    const productId = req.params.id;

    // Step 1: Find the clicked product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Step 2: Find all pharmacies that sell this product by name
    const products = await Product.find({ name: product.name })
      .populate({
        path: "pharmacy",
        model: "Pharmacy"
      });

    // Step 3: For each pharmacy, get its profile
    const pharmaciesWithProfiles = await Promise.all(
      products.map(async (p) => {
        const profile = await PharmacyProfile.findOne({ pharmacy: p.pharmacy._id });
        return {
          pharmacy: profile,
          product: p
        };
      })
    );

    console.log(product)
    console.log(pharmaciesWithProfiles)
    res.json({
      product: product,
      pharmacies: pharmaciesWithProfiles
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};