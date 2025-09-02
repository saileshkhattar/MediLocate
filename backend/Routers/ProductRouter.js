const express= require("express")
const authMiddleware = require("../Middleware/auth")
const ProductController = require("../Controllers/ProductController")

const ProductRouter = express.Router();


ProductRouter.get("/search/:id",authMiddleware, ProductController.getPharamcies)


module.exports =  ProductRouter;