import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    createTeamMember,
    getTeamMembers,
    getTeamMemberById,
    updateTeamMember,
    deactivateTeamMember,
    deleteTeamMember
} from '../controllers/teamController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Only Admin can manage team members
router.post('/', authorize('Admin'), createTeamMember);
router.get('/', authorize('Admin', 'Manager'), getTeamMembers);
router.get('/:id', authorize('Admin', 'Manager'), getTeamMemberById);
router.put('/:id', authorize('Admin'), updateTeamMember);
router.post('/:id/deactivate', authorize('Admin'), deactivateTeamMember);
router.delete('/:id', authorize('Admin'), deleteTeamMember);

export default router;
