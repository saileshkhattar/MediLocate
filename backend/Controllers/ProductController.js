const axios = require("axios");
const Product = require("../models/Product");
const PharmacyProfile = require("../models/PharmacyProfile");

exports.getPharamcies = async (req, res) => {
  try {
    const productId = req.params.id;
    const { lat, lon } = req.query; // user’s location from frontend

    // Step 1: Find the clicked product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Step 2: Find all pharmacies selling this product (by name)
    const products = await Product.find({ name: product.name })
      .populate("pharmacy");

    // Step 3: Attach profiles + distance
    const pharmaciesWithProfiles = await Promise.all(
      products.map(async (p) => {
        const profile = await PharmacyProfile.findOne({ pharmacy: p.pharmacy._id });

        if (!profile) return null;

        let distance = null;
        let duration = null;

        if (lat && lon && profile.latitude && profile.longitude) {
          try {
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${lon},${lat};${profile.longitude},${profile.latitude}?overview=false`;
            const resp = await axios.get(osrmUrl);

            if (resp.data && resp.data.routes.length > 0) {
              distance = resp.data.routes[0].distance; // in meters
              duration = resp.data.routes[0].duration; // in seconds
            }
          } catch (err) {
            console.warn("⚠️ OSRM request failed:", err.message);
          }
        }

        return {
          pharmacy: profile,
          product: p,
          distance, // meters (null if not available)
          duration  // seconds (null if not available)
        };
      })
    );

    // Filter out nulls (in case no profile found)
    let results = pharmaciesWithProfiles.filter(Boolean);

    // Sort by nearest if distance exists
    if (lat && lon) {
      results = results.sort((a, b) => {
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;
        return a.distance - b.distance;
      });
    }

    res.json({
      product,
      pharmacies: results
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};