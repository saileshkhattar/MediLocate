const express = require("express")
const authMiddleware = require("../Middleware/auth")
const ProfileController = require("../Controllers/ProfileController");
const upload= require("../Middleware/multer");

const ProfileRouter = express.Router();

ProfileRouter.post("/user", authMiddleware,upload.single("profileImage"), ProfileController.completeUserProfile);
ProfileRouter.post("/pharmacy", authMiddleware,upload.array("images", 5), ProfileController.completePharmacyProfile);

ProfileRouter.post("/user/:id", authMiddleware,upload.single("profileImage"), ProfileController.updateUserProfile);
ProfileRouter.post("/pharmacy/:id", authMiddleware,upload.array("images", 5), ProfileController.updatePharmacyprofile);



module.exports = ProfileRouter;