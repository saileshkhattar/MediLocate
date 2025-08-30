const express= require("express")
const AuthController = require ("../Controllers/AuthController")
const authMiddleware = require("../Middleware/auth")

const AuthRouter = express.Router();


AuthRouter.post("/user/login",AuthController.loginUser);
AuthRouter.post("/user/register", AuthController.registerUser);

AuthRouter.post("/pharmacy/register", AuthController.registerPharmacy);
AuthRouter.post("/pharmacy/login", AuthController.loginPharmacy);

AuthRouter.post("/logout", AuthController.logout)

AuthRouter.get("/me", authMiddleware, AuthController.findbytoken)



module.exports = AuthRouter;
