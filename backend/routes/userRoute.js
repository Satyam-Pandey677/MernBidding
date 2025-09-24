import { Router } from "express";
import { getCurrentuser, getUserbyId, login, logout, register, updateUser } from "../controller/userController.js";
import {authenticate} from "../middleware/authMiddleware.js"

const router = Router()

router.route("/").post(register)
                
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/getCurrentUser").get(authenticate,getCurrentuser);
router.route("/updateUser").put(authenticate, updateUser);
router.route("/:id").get(authenticate,getUserbyId)



export default router