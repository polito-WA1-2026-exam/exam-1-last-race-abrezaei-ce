import express from 'express';
import wrapController from '../../utils/wrapController.js';
import gamesController from '../../controllers/gamesController.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';

const gamesRoutes = express.Router();

gamesRoutes.get('/:id', isAuthenticated, wrapController(gamesController.get));
gamesRoutes.post('/start', isAuthenticated, wrapController(gamesController.start));
gamesRoutes.post('/:id/submit', isAuthenticated, wrapController(gamesController.submit));

export default gamesRoutes;