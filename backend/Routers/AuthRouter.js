const express= require("express")
const AuthController = require ("../Controllers/AuthController")

const AuthRouter = express.Router();


AuthRouter.post("/user/login",AuthController.loginUser);
AuthRouter.post("/user/register", AuthController.registerUser);

AuthRouter.post("/pharmacy/register", AuthController.registerPharmacy);
AuthRouter.post("/pharmacy/login", AuthController.loginPharmacy);



module.exports = AuthRouter;
