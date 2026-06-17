import express from "express";
import authRoutes from './endpoints/auth.js';
import userRoutes from './endpoints/user.js';
import mapRouter from "./endpoints/map.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/map", mapRouter);

export default router;