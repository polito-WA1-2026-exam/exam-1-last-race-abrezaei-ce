import express from 'express';
import wrapController from '../../utils/wrapController.js';
import mapController from '../../controllers/mapController.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';

const mapRoutes = express.Router();

mapRoutes.get('', isAuthenticated, wrapController(mapController.map));

export default mapRoutes;