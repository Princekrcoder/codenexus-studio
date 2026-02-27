import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getDashboardData, getActivityFeed } from '../controllers/dashboardController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Admin and Manager can view dashboard
router.get('/', authorize('Admin', 'Manager'), getDashboardData);
router.get('/activity', authorize('Admin', 'Manager'), getActivityFeed);

export default router;
