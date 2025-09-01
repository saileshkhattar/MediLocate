const Product = require("../models/Product");
const path = require("path");

exports.AddMedicine = async (req, res) => {
  console.log("sdsdsdsd")
  try {
    const { name, category, price, discountedPrice, quantity, power, pharmacyName } = req.body;
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
      pharmacy : req.user.id
    });

    console.log(product)

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

exports.getProducts = async(req, res)=>{
  console.log("sasasa")
  try {
    const pharmacyId = req.params.id;
    console.log(pharmacyId)

    const products = await Product.find({ pharmacy: pharmacyId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this pharmacy" });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
}
