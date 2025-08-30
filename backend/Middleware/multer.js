const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // flat folder for all images
  },
  filename: (req, file, cb) => {
    const role = req.user?.role || "unknown";
    const name = role === "pharmacy"
      ? req.user?.req.body.name?.replace(/\s+/g, "_") || "pharmacy"
      : req.user?.req.body.pharmacyName?.replace(/\s+/g, "_") || "user";

    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now();

    cb(null, `${role}_${name}_${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });
module.exports = upload;