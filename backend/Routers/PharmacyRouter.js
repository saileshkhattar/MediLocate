const express= require("express")
const PharmacyController = require ("../Controllers/PharmacyController");
const upload = require("../Middleware/multer");
const authMiddleware = require("../Middleware/auth")

const PharmacyRouter = express.Router();

PharmacyRouter.post("/add", upload.single("image"),PharmacyController.AddMedicine);

module.exports =  PharmacyRouter;