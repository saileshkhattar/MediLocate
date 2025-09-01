const express= require("express")
const PharmacyController = require ("../Controllers/PharmacyController");
const upload = require("../Middleware/multer");
const authMiddleware = require("../Middleware/auth")

const PharmacyRouter = express.Router();

PharmacyRouter.post("/add",authMiddleware, upload.single("image"),PharmacyController.AddMedicine);
PharmacyRouter.get("/:id/products",authMiddleware,PharmacyController.getProducts )

module.exports =  PharmacyRouter;