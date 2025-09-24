import { Router } from "express";
import { authAsSeller, authenticate } from "../middleware/authMiddleware.js";
import { createProduct, getAllProducts, getProductById } from "../controller/product.Controller.js";
import { upload } from "../middleware/multer.js";

const router = Router()

router.route("/").post(authenticate,authAsSeller, upload.fields([{
    name:"image",
    maxCount:1
}])  , createProduct)
    .get(getAllProducts)

router.route("/:id").get(getProductById)

export default router