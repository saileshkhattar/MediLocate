const express= require("express")
const PharmacyController = require ("../Controllers/PharmacyController");
const upload = require("../Middleware/multer");
const authMiddleware = require("../Middleware/auth")

const PharmacyRouter = express.Router();

PharmacyRouter.post("/add",authMiddleware, upload.single("image"),PharmacyController.AddMedicine);
PharmacyRouter.get("/:id/products",authMiddleware,PharmacyController.getProducts )
PharmacyRouter.get("/suggestions", authMiddleware, PharmacyController.getSuggestions);
PharmacyRouter.get("/search/:id", authMiddleware, PharmacyController.getPharmacy)
PharmacyRouter.put("/edit/:id", authMiddleware,upload.single("image"),PharmacyController.editProduct)

module.exports =  PharmacyRouter;