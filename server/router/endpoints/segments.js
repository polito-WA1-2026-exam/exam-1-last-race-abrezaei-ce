import express from 'express';
import wrapController from '../../utils/wrapController.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';
import segmentsController from '../../controllers/segmentsController.js';

const segmentsRoutes = express.Router();

segmentsRoutes.get('', isAuthenticated, wrapController(segmentsController.list));

export default segmentsRoutes;