import express from "express";
import { signup, login, googleLogin, getAllUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/users", getAllUsers);

export default router;