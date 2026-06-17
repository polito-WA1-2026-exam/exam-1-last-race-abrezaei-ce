import express from 'express';
import wrapController from '../../utils/wrapController.js';
import mapController from '../../controllers/mapController.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';

const mapRouter = express.Router();

mapRouter.get('', isAuthenticated, wrapController(mapController.map));

export default mapRouter;