import express from "express";
import {
  signup,
  login,
  logout,
  updateSubscription,
  getCurrentUser,
  verifyEmail,
  resendVerificationEmail,
} from "../controllers/authController.js";
import { updateAvatar } from "../controllers/userControler.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.patch("/subscription", authMiddleware, updateSubscription);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resendVerificationEmail);

export default router;
