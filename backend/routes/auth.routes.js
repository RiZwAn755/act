import { login, logout, me, register } from "../controllers/auth.controllers.js";
import express from "express";
import verifyToken from "../middleswares/jwt.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, me);
router.post("/logout", logout);

export default router;