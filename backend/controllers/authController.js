import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/index.js';
import sendEmail from '../utils/emailService.js';

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

export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email.toLowerCase() } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'There is no user with that email' });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validate: false });

        // Create reset URL (must match frontend route)
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password reset token',
                message,
                // Using a slightly more friendly HTML version as fallback
                htmlMessage: `
                    <h1>Password Reset Requested</h1>
                    <p>Click the link below to reset your password. It is valid for 10 minutes.</p>
                    <a href="${resetUrl}">Reset Password</a>
                `
            });

            res.status(200).json({ success: true, message: 'Email sent' });
        } catch (err) {
            console.error(err);
            user.resetPasswordToken = null;
            user.resetPasswordExpire = null;
            await user.save({ validate: false });
            return res.status(500).json({ success: false, message: 'Email could not be sent' });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        // Note: Using a raw query or OP for the date comparison is ideal
        // But simply fetching and comparing dates works too since it's a specific token
        const user = await User.findOne({
            where: {
                resetPasswordToken
            }
        });

        if (!user || user.resetPasswordExpire < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        // Generate token and auto-login
        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_key',
            { expiresIn: '7d' }
        );

        res.status(200).json({
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
        console.error('Reset password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
