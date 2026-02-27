import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    submitContactForm,
    getInquiries,
    updateInquiryStatus
} from '../controllers/contactController.js';

const router = express.Router();

// Public endpoint - no authentication required
router.post('/submit', submitContactForm);

// Protected endpoints - require authentication
router.get('/', authenticate, authorize('Admin', 'Manager'), getInquiries);
router.put('/:id/status', authenticate, authorize('Admin', 'Manager'), updateInquiryStatus);

export default router;
