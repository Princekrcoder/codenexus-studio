import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'Client'
        });

        // Generate token
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email: email.toLowerCase() } });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if user is active
        if (user.status !== 'Active') {
            return res.status(403).json({ success: false, message: 'Account is inactive' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;

        // Verify old token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

        // Find user
        const user = await User.findByPk(decoded.id);
        if (!user || user.status !== 'Active') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        // Generate new token
        const newToken = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '7d' }
        );

        res.json({ success: true, token: newToken });
    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};
