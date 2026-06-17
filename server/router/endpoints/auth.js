import express from "express";
import passport from "passport";
import authController from '../../controllers/authController.js'
import wrapController from "../../utils/wrapController.js";
import isAuthenticated from '../../middlewares/isAuthenticated.js';

const authRoutes = express.Router();

authRoutes.post('/login', passport.authenticate('local'), wrapController(authController.login));
authRoutes.post('/logout', isAuthenticated, wrapController(authController.logout));
authRoutes.get('/check', wrapController(authController.check));

export default authRoutes;