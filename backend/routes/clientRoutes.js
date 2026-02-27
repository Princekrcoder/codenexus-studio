import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
} from '../controllers/clientController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Admin and Manager can manage clients
router.post('/', authorize('Admin', 'Manager'), createClient);
router.get('/', authorize('Admin', 'Manager'), getClients);
router.get('/:id', authorize('Admin', 'Manager'), getClientById);
router.put('/:id', authorize('Admin', 'Manager'), updateClient);
router.delete('/:id', authorize('Admin', 'Manager'), deleteClient);

export default router;
