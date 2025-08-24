const express = require("express")
const authMiddleware = require("../Middleware/auth")
const ProfileController = require("../Controllers/ProfileController");

const ProfileRouter = express.Router();

ProfileRouter.put("/user", authMiddleware, ProfileController.updateUserProfile);
ProfileRouter.put("/pharmacy", authMiddleware, ProfileController.updatePharmacyProfile);

module.exports = ProfileRouter;