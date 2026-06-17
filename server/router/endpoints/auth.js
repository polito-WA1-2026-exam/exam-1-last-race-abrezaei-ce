import express from "express";
import passport from "passport";
import { login, logout, check } from "../../controllers/authController.js";
import wrapController from "../../utils/wrapController.js";

const authRoutes = express.Router();

authRoutes.post('/login', passport.authenticate('local'), wrapController(login));
authRoutes.post('/logout', wrapController(logout));
authRoutes.get('/check', wrapController(check));

export default authRoutes;