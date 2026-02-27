import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    convertLeadToClient,
    deleteLead
} from '../controllers/leadController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Admin and Manager can manage leads
router.post('/', authorize('Admin', 'Manager'), createLead);
router.get('/', authorize('Admin', 'Manager'), getLeads);
router.get('/:id', authorize('Admin', 'Manager'), getLeadById);
router.put('/:id', authorize('Admin', 'Manager'), updateLead);
router.post('/:id/convert', authorize('Admin', 'Manager'), convertLeadToClient);
router.delete('/:id', authorize('Admin', 'Manager'), deleteLead);

export default router;
