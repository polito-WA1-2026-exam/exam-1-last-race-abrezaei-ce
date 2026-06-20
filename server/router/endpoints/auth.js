import express from "express";
import passport from "passport";
import { body } from "express-validator";
import validator from "../../middlewares/validator.js";
import authController from '../../controllers/authController.js'
import wrapController from "../../utils/wrapController.js";
import isAuthenticated from '../../middlewares/isAuthenticated.js';
import { responseError } from "../../utils/response.js";

const authRoutes = express.Router();

authRoutes.post(
    '/login',
    validator(
        [
            body("username").notEmpty().withMessage("Username is required").isString().escape(),
            body("password").notEmpty().withMessage("Password is required").isString().escape()
        ]
    ),
    (req, res, next) => {
        passport.authenticate("local", (error, user) => {
            if (error) return next(error);

            if (!user) return responseError(res, null, "Invalid username or password", 401);

            req.logIn(user, (loginError) => {
                if (loginError) return next(loginError);

                next();
            });
        })(req, res, next);
    },
    wrapController(authController.login)
);
authRoutes.post('/logout', isAuthenticated, wrapController(authController.logout));
authRoutes.get('/check', wrapController(authController.check));

export default authRoutes;