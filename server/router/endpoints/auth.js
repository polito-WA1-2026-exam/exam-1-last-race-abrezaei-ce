import express from "express";
import passport from "passport";
import { login, logout, check } from "../../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post('/login', passport.authenticate('local'), login);
authRoutes.post('/logout', logout);
authRoutes.get('/check', check);

export default authRoutes;