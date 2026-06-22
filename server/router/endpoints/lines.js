import express from 'express';
import wrapController from '../../utils/wrapController.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';
import linesController from '../../controllers/linesController.js';

const linesRoutes = express.Router();

linesRoutes.get('', isAuthenticated, wrapController(linesController.list));

export default linesRoutes;