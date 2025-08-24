const PharmacyProfile = require("../models/PharmacyProfile");
const UserProfile = require("../models/UserProfile");

exports.updatePharmacyProfile = async (req, res) => {
  try {
    const { pharmacyName, ownerName, location, phone } = req.body;

    let profile = await PharmacyProfile.findOne({ pharmacy: req.userId });

    if (!profile) {
      profile = new PharmacyProfile({
        pharmacy: req.userId,
        pharmacyName,
        ownerName,
        location,
        phone,
      });
    } else {
      profile.pharmacyName = pharmacyName;
      profile.ownerName = ownerName;
      profile.location = location;
      profile.phone = phone;
    }

    await profile.save();
    res.json({ message: "Pharmacy profile updated successfully", profile });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};


exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    let profile = await UserProfile.findOne({ user: req.userId });

    if (!profile) {
      profile = new UserProfile({
        user: req.userId,
        name,
        phone,
        address,
      });
    } else {
      profile.name = name;
      profile.phone = phone;
      profile.address = address;
    }

    await profile.save();
    res.json({ message: "User profile updated successfully", profile });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};

