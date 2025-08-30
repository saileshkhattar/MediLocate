const mongoose = require("mongoose");

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
},{ timestamps: true });

module.exports = mongoose.model("PharamcyProfile", pharmacyProfileSchema);