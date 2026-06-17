import express from "express";
import authRoutes from './endpoints/auth.js';
import userRoutes from './endpoints/user.js';
import mapRoutes from "./endpoints/map.js";
import stationsRoutes from "./endpoints/stations.js";
import gamesRoutes from "./endpoints/games.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/map", mapRoutes);
router.use("/stations", stationsRoutes);
router.use("/games", gamesRoutes);

export default router;