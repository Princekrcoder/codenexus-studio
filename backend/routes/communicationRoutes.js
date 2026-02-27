import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    createCommunication,
    getCommunications,
    getFollowUpReminders,
    updateCommunication,
    deleteCommunication
} from '../controllers/communicationController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Admin and Manager can manage communications
router.post('/', authorize('Admin', 'Manager'), createCommunication);
router.get('/', authorize('Admin', 'Manager'), getCommunications);
router.get('/follow-ups', authorize('Admin', 'Manager'), getFollowUpReminders);
router.put('/:id', authorize('Admin', 'Manager'), updateCommunication);
router.delete('/:id', authorize('Admin', 'Manager'), deleteCommunication);

export default router;
