const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const role = req.user?.role || "unknown";
      let entityName = "unknown";

      // For pharmacy
      if (role === "pharmacy") {
        entityName =
          req.user?.pharmacyName ||
          req.body.pharmacyName?.replace(/\s+/g, "_") ||
          "pharmacy";
      }
      // For user
      else if (role === "user") {
        entityName =
          req.user?.name ||
          req.body.name?.replace(/\s+/g, "_") ||
          "user";
      }

      // Decide type of image (profile / medicines)
      // You can pass `fileType` in body → "profile" | "medicines"
      const fileType = req.body.fileType || "profile";

      // Build path: uploads/pharmacies/PharmaOne/profile/
      const uploadPath = path.join(
        "uploads",
        role === "pharmacy" ? "pharmacies" : "users",
        entityName,
        fileType
      );

      // Create directories if not exist
      fs.mkdirSync(uploadPath, { recursive: true });

      cb(null, uploadPath);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now();

    cb(null, `${base}_${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;