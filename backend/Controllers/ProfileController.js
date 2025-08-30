const PharmacyProfile = require("../models/PharmacyProfile");
const UserProfile = require("../models/UserProfile");
const User  = require("../models/UserSchema")
const Pharmacy = require("../models/PharmacySchema")

exports.completePharmacyProfile = async (req, res) => {
  console.log("Dsdsdsd")
  try {
    const imagePaths =
      req.files?.map((file) => `/uploads/${file.filename}`) || [];
    
    console.log(imagePaths)

    const pharmacyProfile = new PharmacyProfile({
      pharmacy: req.user.id,
      name: req.body.name,
      address: req.body.address,
      phoneNumber: req.body.phone,
      gstNumber : req.body.gstNumber,
      pharmacyName : req.body.pharmacyName,
      licenseNumber:req.body.pharmacyName,
      images: imagePaths,
    });

    console.log(pharmacyProfile);

    await pharmacyProfile.save();

    const updatedUser = await Pharmacy.findByIdAndUpdate(
      req.user.id,
      { isProfileComplete: true }, 
      { new: true } 
    );
    res.json(pharmacyProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeUserProfile = async (req, res) => {
  console.log("Dsssdsds");
  try {
    const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const userProfile = new UserProfile({
      user: req.user.id,
      fullName: req.body.name,
      jobTitle: req.body.jobTitle,
      phoneNumber: req.body.phone,
      address: req.body.address,
      ...(profileImage && { profileImage }),
    });
    console.log(userProfile);

    await userProfile.save();
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { isProfileComplete: true }, 
      { new: true } 
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const updateData = {
      fullName: req.body.fullName,
      jobTitle: req.body.jobTitle,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    };

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedProfile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePharmacyprofile = async (req, res) => {
  try {
    const { name, address, phoneNumber } = req.body;
    const imagePaths =
      req.files?.map((file) => `/uploads/${file.filename}`) || [];

    // update fields
    const updateData = {
      ...(name && { name }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
    };

    // If new images uploaded → append them
    if (imagePaths.length > 0) {
      updateData.$push = { images: { $each: imagePaths } };
    }

    const profile = await PharmacyProfile.findOneAndUpdate(
      { _id: req.params.id, pharmacy: req.user._id }, 
      updateData,
      { new: true }
    );

    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
