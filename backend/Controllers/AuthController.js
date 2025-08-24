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

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // send as HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

// ---------------- PHARMACY ----------------
exports.registerPharmacy = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check duplicate email
    const existingPharmacy = await Pharmacy.findOne({ email });
    if (existingPharmacy) return res.status(400).json({ message: "Pharmacy already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new pharmacy
    const newPharmacy = new Pharmacy({ name, email, passwordHash: hashedPassword });
    await newPharmacy.save();

    // no token yet
    res.status(201).json({ message: "Pharmacy registered successfully. Please log in." });
  } catch (err) {
    res.status(500).json({ message: "Error registering pharmacy", error: err.message });
  }
};
exports.loginPharmacy = loginPharmacy = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pharmacy = await Pharmacy.findOne({ email });
    if (!pharmacy) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, pharmacy.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: pharmacy._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};