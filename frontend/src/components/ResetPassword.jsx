import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import SEO from './SEO';
import { authAPI } from '../services/api';

const ResetPassword = ({ theme, toggleTheme }) => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            await authAPI.resetPassword(token, formData.password);

            // Success
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (error) {
            setErrors({ global: error.message || 'Invalid or expired token. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Create New Password | CodeNexus Studio"
                description="Create a new password for your CodeNexus Studio account."
                canonical={`https://codenexusstudio.vercel.app/reset-password/${token}`}
            />

            <div className="login-page">
                {/* Animated background blobs */}
                <div className="login-blob blob-a"></div>
                <div className="login-blob blob-b"></div>

                {/* Header */}
                <header className="login-header">
                    <Link to="/" className="login-logo">
                        Code<span>Nexus</span>.
                    </Link>
                    <button className="login-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? '🌞' : '🌙'}
                    </button>
                </header>

                <main className="login-main">
                    <div className="login-card">
                        <div className="login-icon-wrap">
                            <svg className="login-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>

                        <h1 className="login-title">Create New Password</h1>
                        <p className="login-subtitle">Your new password must be different from previously used passwords.</p>

                        {success ? (
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <p style={{ color: '#10b981', marginBottom: '15px' }}>
                                    Password reset successful! Redirecting to login...
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="login-form" noValidate>
                                {errors.global && (
                                    <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', textAlign: 'center', fontSize: '14px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                        {errors.global}
                                    </div>
                                )}

                                {/* Password */}
                                <div className={`input-group ${errors.password ? 'input-error' : ''}`}>
                                    <label htmlFor="password">New Password</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">
                                            <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                        </span>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Enter new password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowPassword(p => !p)}
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword ? (
                                                <svg viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <span className="error-msg">{errors.password}</span>}
                                </div>

                                {/* Confirm Password */}
                                <div className={`input-group ${errors.confirmPassword ? 'input-error' : ''}`}>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">
                                            <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                        </span>
                                        <input
                                            id="confirmPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            placeholder="Confirm new password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
                                </div>

                                <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                                    {loading ? (
                                        <span className="spinner"></span>
                                    ) : (
                                        <>Reset Password <span className="btn-arrow">→</span></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default ResetPassword;
