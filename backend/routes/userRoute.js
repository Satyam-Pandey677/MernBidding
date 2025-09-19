import { Router } from "express";
import { register } from "../controller/userController.js";

const router = Router()

router.route("/").post(register)

export default router