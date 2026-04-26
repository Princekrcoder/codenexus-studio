import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_in_prod';

/**
 * authenticate middleware
 * Accepts token from:
 *  1. httpOnly cookie (preferred — production)
 *  2. Authorization: Bearer <token> header (localStorage fallback)
 */
export const authenticate = async (req, res, next) => {
    try {
        // 1. Try cookie first (httpOnly — more secure)
        let token = req.cookies?.accessToken;

        // 2. Fallback to Authorization header (for localStorage-based clients)
        if (!token) {
            const authHeader = req.header('Authorization');
            if (authHeader?.startsWith('Bearer ')) {
                token = authHeader.replace('Bearer ', '').trim();
            }
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'No authentication token provided' });
        }

        // Verify token — will throw if expired or invalid
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ success: false, message: 'Token expired', code: 'TOKEN_EXPIRED' });
            }
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        // Find user in DB to confirm they still exist and are active
        const user = await User.findByPk(decoded.id);
        if (!user || user.status !== 'Active') {
            return res.status(401).json({ success: false, message: 'User not found or account inactive' });
        }

        // Attach user to request for downstream handlers
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ success: false, message: 'Authentication failed' });
    }
};

/**
 * authorize middleware factory
 * Usage: router.get('/admin', authenticate, authorize('Admin'), handler)
 */
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required role: ${roles.join(' or ')}`
            });
        }

        next();
    };
};
