import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    markAsPaid,
    getRevenueStats,
    deleteInvoice
} from '../controllers/invoiceController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Admin and Manager can manage invoices, Clients can view their own
router.post('/', authorize('Admin', 'Manager'), createInvoice);
router.get('/', authorize('Admin', 'Manager', 'Client'), getInvoices);
router.get('/stats/revenue', authorize('Admin', 'Manager'), getRevenueStats);
router.get('/:id', authorize('Admin', 'Manager', 'Client'), getInvoiceById);
router.put('/:id', authorize('Admin', 'Manager'), updateInvoice);
router.post('/:id/mark-paid', authorize('Admin', 'Manager'), markAsPaid);
router.delete('/:id', authorize('Admin', 'Manager'), deleteInvoice);

export default router;
