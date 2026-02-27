import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Admin and Manager can manage projects, Clients can view their own
router.post('/', authorize('Admin', 'Manager'), createProject);
router.get('/', authorize('Admin', 'Manager', 'Developer', 'Client'), getProjects);
router.get('/:id', authorize('Admin', 'Manager', 'Developer', 'Client'), getProjectById);
router.put('/:id', authorize('Admin', 'Manager'), updateProject);
router.delete('/:id', authorize('Admin', 'Manager'), deleteProject);

export default router;
