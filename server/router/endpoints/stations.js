import express from 'express';
import wrapController from '../../utils/wrapController.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';
import stationsController from '../../controllers/stationsController.js';

const stationsRoutes = express.Router();

stationsRoutes.get('', isAuthenticated, wrapController(stationsController.list));

export default stationsRoutes;