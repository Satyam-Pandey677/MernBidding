import { Router } from "express";
import { authAsSeller, authenticate } from "../middleware/authMiddleware.js";
import { createProduct } from "../controller/product.Controller.js";

const router = Router()

router.route("/").post(authenticate,authAsSeller, createProduct)

export default router