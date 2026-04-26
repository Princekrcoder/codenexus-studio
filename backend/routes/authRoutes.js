import express from 'express';
import {
    register,
    login,
    logout,
    getMe,
    refreshToken,
    forgotPassword,
    resetPassword
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);

// Protected routes (require valid token)
router.get('/me', authenticate, getMe);

export default router;
