const mongoose = require("mongoose");
const geocodeAddress = require("../utils/geocode");

const pharmacyProfileSchema = new mongoose.Schema({
  pharmacy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
    required: true,
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gstNumber :{type:String, required : true},
  licenseNumber : {type:String, require : true},
  pharmacyName : {type:String, required:true},
  images: [{ type: String,default: "public/defauts/default-pharamcy.png" }],
  latitude: Number,
  longitude: Number, 
},{ timestamps: true });


pharmacyProfileSchema.pre("save", async function (next) {
  if (!this.isModified("address")) return next();

  try {
    console.log(`🌍 Geocoding ${this.address}...`);
    const coords = await geocodeAddress(this.address);

    if (coords) {
      this.latitude = coords.lat;
      this.longitude = coords.lon;
      console.log(`✅ Got coords: ${coords.lat}, ${coords.lon}`);
    } else {
      console.log("⚠️ Could not geocode address");
    }
    next();
  } catch (err) {
    console.error("❌ Geocoding failed:", err);
    next(err);
  }
});


module.exports = mongoose.model("PharamcyProfile", pharmacyProfileSchema);