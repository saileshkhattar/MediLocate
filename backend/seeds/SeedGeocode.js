const mongoose = require("mongoose");
const PharmacyProfile = require("../models/PharmacyProfile");
const geocodeAddress = require("../utils/geocode");
require("dotenv").config();

// 1. Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.Mongo_URL, {
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
}

// 2. Update pharmacies with lat/lng
async function seedPharmacyLocations() {
  await connectDB();

  try {
    const pharmacies = await PharmacyProfile.find();
    console.log(`Found ${pharmacies.length} pharmacies`);

    for (const pharmacy of pharmacies) {
      if (pharmacy.latitude && pharmacy.longitude) {
        console.log(`➡️ Skipping ${pharmacy.pharmacyName} (already has lat/lng)`);
        continue;
      }

      console.log(`🌍 Geocoding ${pharmacy.pharmacyName}, ${pharmacy.address}...`);

      const coords = await geocodeAddress(pharmacy.address);

      if (coords) {
        pharmacy.latitude = coords.lat;
        pharmacy.longitude = coords.lon;
        await pharmacy.save();
        console.log(`✅ Updated ${pharmacy.pharmacyName} with ${coords.lat}, ${coords.lon}`);
      } else {
        console.log(`⚠️ Could not geocode ${pharmacy.pharmacyName}`);
      }

      // Sleep 1s to respect Nominatim usage policy (1 request/sec)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("🎉 Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding pharmacies:", err);
    process.exit(1);
  }
}

seedPharmacyLocations();