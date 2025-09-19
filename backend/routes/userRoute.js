import { Router } from "express";
import { login, register } from "../controller/userController.js";

const router = Router()

router.route("/").post(register)

router.route("/login").post(login)

export default router