const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const pharmacyName = req.user?.pharmacyName?.replace(/\s+/g, "_") || "unknown";
    const productName = req.body.productName?.replace(/\s+/g, "_") || "product";
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now(); 
    cb(null, `${pharmacyName}_${productName}_${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });
module.exports = upload;