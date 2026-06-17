import express from "express";
import authRoutes from "./endpoints/auth.js";
import userRoutes from "./endpoints/user.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;