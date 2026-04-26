import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/index.js';
import sendEmail from '../utils/emailService.js';

// ── Constants ──────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_in_prod';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_change_in_prod';

const ACCESS_TOKEN_EXPIRY  = '15m';   // Short-lived access token
const REFRESH_TOKEN_EXPIRY = '7d';    // Long-lived refresh token

const IS_PROD = process.env.NODE_ENV === 'production';

// ── Cookie Helper ──────────────────────────────────────────────────────────
/**
 * Set secure httpOnly cookies for access + refresh tokens.
 * Cross-domain: sameSite='none' + secure=true (requires HTTPS in prod).
 * Same-domain:  sameSite='lax' is fine (dev only).
 */
const setCookies = (res, accessToken, refreshToken) => {
    const cookieBase = {
        httpOnly: true,                       // JS cannot access — prevents XSS theft
        secure: IS_PROD,                      // HTTPS only in production
        sameSite: IS_PROD ? 'none' : 'lax',   // 'none' needed for cross-domain in prod
        path: '/',
    };

    res.cookie('accessToken', accessToken, {
        ...cookieBase,
        maxAge: 15 * 60 * 1000,              // 15 minutes in ms
    });

    res.cookie('refreshToken', refreshToken, {
        ...cookieBase,
        maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days in ms
        path: '/api/auth',                    // Only sent to auth endpoints
    });
};

const clearCookies = (res) => {
    const opts = {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: IS_PROD ? 'none' : 'lax',
        path: '/',
    };
    res.clearCookie('accessToken', opts);
    res.clearCookie('refreshToken', { ...opts, path: '/api/auth' });
};

// ── Token Generators ───────────────────────────────────────────────────────
const generateTokens = (user) => {
    const payload = { id: user.id, role: user.role, email: user.email };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

    return { accessToken, refreshToken };
};

// ── User safe fields ───────────────────────────────────────────────────────
const safeUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
});

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────────────────────────────────────────
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        const user = await User.create({ name, email, password, role: role || 'Client' });

        const { accessToken, refreshToken } = generateTokens(user);
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            success: true,
            token: accessToken,                  // Also return in body for localStorage fallback
            user: safeUser(user),
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────────────────────
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (user.status !== 'Active') {
            return res.status(403).json({ success: false, message: 'Account is inactive. Contact support.' });
        }

        const { accessToken, refreshToken } = generateTokens(user);
        setCookies(res, accessToken, refreshToken);

        res.json({
            success: true,
            token: accessToken,                  // Also return in body for localStorage fallback
            expiresIn: 15 * 60,                  // Seconds until access token expires
            user: safeUser(user),
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// LOGOUT  — clears cookies + invalidates on client
// ─────────────────────────────────────────────────────────────────────────────
export const logout = (req, res) => {
    clearCookies(res);
    res.json({ success: true, message: 'Logged out successfully' });
};

// ─────────────────────────────────────────────────────────────────────────────
// GET CURRENT USER  — used to restore session on page refresh
// ─────────────────────────────────────────────────────────────────────────────
export const getMe = async (req, res) => {
    try {
        // req.user is set by the authenticate middleware
        const user = await User.findByPk(req.user.id);
        if (!user || user.status !== 'Active') {
            clearCookies(res);
            return res.status(401).json({ success: false, message: 'User not found or inactive' });
        }
        res.json({ success: true, user: safeUser(user) });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// REFRESH TOKEN  — issue new access token using refresh token
// ─────────────────────────────────────────────────────────────────────────────
export const refreshToken = async (req, res) => {
    try {
        // Accept refresh token from: cookie (preferred) OR body (fallback)
        const token = req.cookies?.refreshToken || req.body?.refreshToken;

        if (!token) {
            return res.status(401).json({ success: false, message: 'No refresh token provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_REFRESH_SECRET);
        } catch (err) {
            clearCookies(res);
            return res.status(401).json({ success: false, message: 'Refresh token expired or invalid. Please login again.' });
        }

        const user = await User.findByPk(decoded.id);
        if (!user || user.status !== 'Active') {
            clearCookies(res);
            return res.status(401).json({ success: false, message: 'User not found or inactive' });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
        setCookies(res, accessToken, newRefreshToken);

        res.json({
            success: true,
            token: accessToken,
            expiresIn: 15 * 60,
            user: safeUser(user),
        });
    } catch (error) {
        console.error('Token refresh error:', error);
        clearCookies(res);
        res.status(401).json({ success: false, message: 'Token refresh failed' });
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// FORGOT PASSWORD
// ─────────────────────────────────────────────────────────────────────────────
export const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email.toLowerCase() } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'There is no user with that email' });
        }

        const resetToken = user.getResetPasswordToken();
        await user.save({ validate: false });

        // Use frontend URL for reset link
        const frontendUrl = process.env.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested a password reset.\n\nReset link (valid 10 min):\n\n${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Token — CodeNexus Studio',
                message,
                htmlMessage: `
                    <h2>Password Reset Requested</h2>
                    <p>Click the link below to reset your password. It expires in <strong>10 minutes</strong>.</p>
                    <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;">Reset Password</a>
                    <p style="margin-top:16px;font-size:12px;color:#888;">If you didn't request this, please ignore this email.</p>
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

// ─────────────────────────────────────────────────────────────────────────────
// RESET PASSWORD
// ─────────────────────────────────────────────────────────────────────────────
export const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({ where: { resetPasswordToken } });

        if (!user || user.resetPasswordExpire < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();

        // Auto-login after reset
        const { accessToken, refreshToken } = generateTokens(user);
        setCookies(res, accessToken, refreshToken);

        res.status(200).json({
            success: true,
            token: accessToken,
            user: safeUser(user),
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
