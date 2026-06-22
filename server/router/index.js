import express from "express";
import authRoutes from './endpoints/auth.js';
import mapRoutes from "./endpoints/map.js";
import stationsRoutes from "./endpoints/stations.js";
import gamesRoutes from "./endpoints/games.js";
import leaderboardRoutes from "./endpoints/leaderboard.js";
import segmentsRoutes from "./endpoints/segments.js";
import linesRoutes from "./endpoints/lines.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/map", mapRoutes);
router.use("/games", gamesRoutes);
router.use("/lines", linesRoutes);
router.use("/segments", segmentsRoutes);
router.use("/stations", stationsRoutes);
router.use("/leaderboard", leaderboardRoutes);

export default router;