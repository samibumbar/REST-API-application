import express from "express";
import {
  signup,
  login,
  logout,
  updateSubscription,
  getCurrentUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.patch("/subscription", authMiddleware, updateSubscription);
router.get("/current", authMiddleware, getCurrentUser);

export default router;
