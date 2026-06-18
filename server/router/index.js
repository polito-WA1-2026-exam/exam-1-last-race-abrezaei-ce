import express from "express";
import authRoutes from './endpoints/auth.js';
import mapRoutes from "./endpoints/map.js";
import stationsRoutes from "./endpoints/stations.js";
import gamesRoutes from "./endpoints/games.js";
import leaderboardRoutes from "./endpoints/leaderboard.js";
import segmentsRoutes from "./endpoints/segments.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/games", gamesRoutes);
router.use("/leaderboard", leaderboardRoutes);
router.use("/map", mapRoutes);
router.use("/stations", stationsRoutes);
router.use("/segments", segmentsRoutes);

export default router;