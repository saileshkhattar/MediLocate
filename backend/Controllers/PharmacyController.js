const Product = require("../models/Product");
const path = require("path");
const PharamcyProfile = require("../models/PharmacyProfile");
const Pharmacy = require("../models/PharmacySchema");

exports.AddMedicine = async (req, res) => {
  console.log("sdsdsdsd");
  try {
    const {
      name,
      category,
      price,
      discountedPrice,
      quantity,
      power,
      pharmacyName,
    } = req.body;
    console.log(pharmacyName);
    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    // Store relative path instead of only filename
    // Example: "uploads/pharmacies/PharmaOne/medicines/med1_1693492950.jpg"
    const relativePath = path.relative(process.cwd(), req.file.path);

    const product = new Product({
      name,
      category,
      price,
      power,
      discountedPrice,
      quantity,
      image: relativePath,
      pharmacy: req.user.id,
    });

    console.log(product);

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const pharmacyId = req.params.id;

    const products = await Product.find({ pharmacy: pharmacyId });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this pharmacy" });
    }

    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

exports.getSuggestions = async (req, res) => {
  console.log("Findin....");
  const { q } = req.query;
  if (!q) return res.json([]);

  try {
    // search pharmacies & products
    const pharmacies = await PharamcyProfile.find(
      { pharmacyName: { $regex: q, $options: "i" } },
      { pharmacyName: 1, pharmacy: 1 } // return pharmacyName + Pharmacy._id reference
    ).limit(5);

    const products = await Product.find(
      { name: { $regex: q, $options: "i" } },
      { name: 1 } // return only product name + _id
    ).limit(5);

    const results = [
      ...pharmacies.map((p) => ({
        id: p.pharmacy, // ✅ use Pharmacy._id (reference)
        type: "pharmacy",
        name: p.pharmacyName,
      })),
      ...products.map((p) => ({
        id: p._id, // ✅ Product._id
        type: "product",
        name: p.name,
      })),
    ];

    console.log(results);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
};

exports.getPharmacy = async (req, res) => {
  try {
    const pharmacyId = req.params.id;
    console.log(pharmacyId)

    // Find profile linked to this pharmacyId
    const pharmacyProfile = await PharamcyProfile.findOne({
      pharmacy: pharmacyId,
    });
    if (!pharmacyProfile) {
      return res.status(404).json({ message: "Pharmacy profile not found" });
    }

    console.log(pharmacyProfile)

    // Find all products linked to this pharmacyId
    const products = await Product.find({ pharmacy: pharmacyId });

    console.log(products)

    res.json({
      pharmacy: pharmacyProfile,
      products: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
