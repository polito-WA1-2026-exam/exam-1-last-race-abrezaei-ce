import express from "express";
import isAuthenticated from '../../middlewares/isAuthenticated.js';

const userRoutes = express.Router();

userRoutes.get("/", isAuthenticated, (req, res) => {

});

export default userRoutes;