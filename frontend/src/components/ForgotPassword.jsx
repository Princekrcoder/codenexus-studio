import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import SEO from './SEO';
import { authAPI } from '../services/api';

const ForgotPassword = ({ theme, toggleTheme }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Email is required');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Enter a valid email');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await authAPI.forgotPassword(email);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to send reset email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Forgot Password | CodeNexus Studio"
                description="Reset your CodeNexus Studio account password."
                canonical="https://codenexusstudio.vercel.app/forgot-password"
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
                                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h1 className="login-title">Reset Password</h1>
                        <p className="login-subtitle">Enter your email to receive a reset link</p>

                        {success ? (
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <p style={{ color: '#10b981', marginBottom: '15px' }}>
                                    Password reset link has been sent to your email!
                                </p>
                                <Link to="/login" className="login-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                    Back to Login
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="login-form" noValidate>
                                <div className={`input-group ${error ? 'input-error' : ''}`}>
                                    <label htmlFor="email">Email Address</label>
                                    <div className="input-wrapper">
                                        <span className="input-icon">
                                            <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </span>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError('');
                                            }}
                                            autoComplete="email"
                                        />
                                    </div>
                                    {error && <span className="error-msg">{error}</span>}
                                </div>

                                <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                                    {loading ? (
                                        <span className="spinner"></span>
                                    ) : (
                                        <>Send Reset Link <span className="btn-arrow">→</span></>
                                    )}
                                </button>

                                <div className="login-options" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                                    <Link to="/login" className="forgot-link">← Back to Login</Link>
                                </div>
                            </form>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default ForgotPassword;
