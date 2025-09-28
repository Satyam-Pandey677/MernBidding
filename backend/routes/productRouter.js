import { Router } from "express";
import { authAsSeller, authenticate } from "../middleware/authMiddleware.js";
import { bidStart, createProduct, getAllProducts, getProductById, startAuction } from "../controller/product.Controller.js";
import { upload } from "../middleware/multer.js";

const router = Router()

router.route("/").post(authenticate,authAsSeller, upload.fields([{
    name:"image",
    maxCount:1
}])  , createProduct)
    .get(getAllProducts)

router.route("/:id").get(getProductById)

router.route("/:id/start").post(authenticate,authAsSeller, startAuction)
router.route("/:id/bid").post(authenticate, bidStart)

export default router