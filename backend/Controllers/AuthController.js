const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const Pharmacy = require("../models/PharmacySchema");



// ---------------- USER ----------------
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const newUser = new User({ name, email, passwordHash: hashedPassword });
    await newUser.save();

    // no token yet
    res.status(201).json({ message: "User registered successfully. Please log in." });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    console.log(user)

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    console.log(isMatch)

    const token = jwt.sign({ id: user._id, role:"user" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name:user.name,
        complete : user.isProfileComplete,
        role:user.role
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// ---------------- PHARMACY ----------------
exports.registerPharmacy = async (req, res) => {
  try {
    const { pharmacyName, email, password } = req.body;

    // check duplicate email
    const existingPharmacy = await Pharmacy.findOne({ email });
    if (existingPharmacy) return res.status(400).json({ message: "Pharmacy already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new pharmacy
    const newPharmacy = new Pharmacy({email, passwordHash: hashedPassword, name:pharmacyName });
    await newPharmacy.save();

    // no token yet
    res.status(201).json({ message: "Pharmacy registered successfully. Please log in." });
  } catch (err) {
    res.status(500).json({ message: "Error registering pharmacy", error: err.message });
  }
};
exports.loginPharmacy = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pharmacy = await Pharmacy.findOne({ email });
    if (!pharmacy) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, pharmacy.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: pharmacy._id, role:"pharmacy" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: {
        name:pharmacy.name,
        id: pharmacy._id,
        email: pharmacy.email,
        complete : pharmacy.isProfileComplete,
        role:pharmacy.role
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};


exports.findbytoken = async (req, res) => {

  try {
    const { id, role } = req.user; // from token payload

    let userData;

    if (role === "pharmacy") {
      userData = await Pharmacy.findById(id).select("-password"); // exclude password
    } else if (role === "user") {
      userData = await User.findById(id).select("-password");
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!userData) return res.status(404).json({ message: "User not found" });

    res.json({ user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};