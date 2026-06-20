import express from 'express';
import wrapController from '../../utils/wrapController.js';
import gamesController from '../../controllers/gamesController.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';
import validator from "../../middlewares/validator.js";
import { body } from "express-validator";

const gamesRoutes = express.Router();

gamesRoutes.get('/:id', isAuthenticated, wrapController(gamesController.get));
gamesRoutes.post('/start', isAuthenticated, wrapController(gamesController.start));
gamesRoutes.post(
    '/:id/submit',
    isAuthenticated,
    validator(
        [
            body("route").notEmpty().withMessage("Route is required").isArray().escape()
        ]
    ),
    wrapController(gamesController.submit)
);

export default gamesRoutes;