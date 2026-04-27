import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import SEO from './SEO'
import { useAuth } from '../context/AuthContext'

const Login = ({ theme, toggleTheme }) => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const { login, user, isAuthenticated, loading: authLoading } = useAuth()

    // Already logged in → redirect to dashboard
    useEffect(() => {
        if (!authLoading && isAuthenticated && user) {
            const routes = { Admin: '/admin', Manager: '/manager', Client: '/client', Developer: '/' }
            navigate(routes[user.role] || '/', { replace: true })
        }
    }, [isAuthenticated, authLoading, user, navigate])


    const validate = () => {
        const newErrors = {}
        if (!formData.email) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email'
        if (!formData.password) newErrors.password = 'Password is required'
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
        return newErrors
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        setLoading(true)

        try {
            const response = await login(formData.email, formData.password)

            // Navigate based on role
            const roleRoutes = {
                'Admin': '/admin',
                'Manager': '/manager',
                'Developer': '/',
                'Client': '/client'
            }

            navigate(roleRoutes[response.user.role] || '/')
        } catch (error) {
            setErrors({ email: error.message || 'Invalid email or password' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SEO
                title="Login | CodeNexus Studio"
                description="Sign in to your CodeNexus Studio account to manage your projects and services."
                canonical="https://codenexusstudio.vercel.app/login"
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

                {/* Card */}
                <main className="login-main">
                    <div className="login-card">
                        {/* Icon */}
                        <div className="login-icon-wrap">
                            <svg className="login-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor" opacity="0.7" />
                                <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>

                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to your CodeNexus account</p>

                        <form onSubmit={handleSubmit} className="login-form" noValidate>
                            {/* Email */}
                            <div className={`input-group ${errors.email ? 'input-error' : ''}`}>
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                    />
                                </div>
                                {errors.email && <span className="error-msg">{errors.email}</span>}
                            </div>

                            {/* Password */}
                            <div className={`input-group ${errors.password ? 'input-error' : ''}`}>
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">
                                        <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                    </span>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
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

                            {/* Forgot Password */}
                            <div className="login-options">
                                <label className="remember-label">
                                    <input type="checkbox" id="remember" /> Remember me
                                </label>
                                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                            </div>

                            {/* Submit */}
                            <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                                {loading ? (
                                    <span className="spinner"></span>
                                ) : (
                                    <>Sign In <span className="btn-arrow">→</span></>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="login-divider"><span>or continue with</span></div>

                            {/* Social Buttons */}
                            <div className="social-btns">
                                <button type="button" className="social-btn" aria-label="Sign in with Google">
                                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                    Google
                                </button>
                                <button type="button" className="social-btn" aria-label="Sign in with GitHub">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                    GitHub
                                </button>
                            </div>
                        </form>

                        <p className="login-register">
                            Don't have an account? <Link to="/register">Create one free</Link>
                        </p>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Login
