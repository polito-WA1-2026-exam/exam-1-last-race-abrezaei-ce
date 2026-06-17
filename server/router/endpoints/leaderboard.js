import express from "express";
import isAuthenticated from '../../middlewares/isAuthenticated.js';
import wrapController from "../../utils/wrapController.js";
import leaderboardController from "../../controllers/leaderboardController.js";

const leaderboardRoutes = express.Router();

leaderboardRoutes.get('', isAuthenticated, wrapController(leaderboardController.list));

export default leaderboardRoutes;