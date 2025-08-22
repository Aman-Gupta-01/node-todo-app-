import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/userAuthController.js";
const router = Router()

router.route('/login').post(loginUser)

router.route('/register').post(registerUser)

router.route('/get-all-users').get(getAllUsers)

export default router;