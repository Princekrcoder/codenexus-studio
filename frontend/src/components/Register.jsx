import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Register.css'
import SEO from './SEO'
import { authAPI } from '../services/api'

const Register = ({ theme, toggleTheme }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const validate = () => {
        const e = {}
        if (!formData.name.trim()) e.name = 'Full name is required'
        if (!formData.email) e.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email'
        if (!formData.password) e.password = 'Password is required'
        else if (formData.password.length < 6) e.password = 'Minimum 6 characters'
        if (!formData.confirm) e.confirm = 'Please confirm your password'
        else if (formData.confirm !== formData.password) e.confirm = 'Passwords do not match'
        return e
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }
        setLoading(true)
        
        try {
            await authAPI.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: 'Client' // Default role for new registrations
            })
            
            // Navigate to login or dashboard based on your preference
            navigate('/login')
        } catch (error) {
            setErrors({ email: error.message || 'Registration failed. Please try again.' })
        } finally {
            setLoading(false)
        }
    }

    const EyeOpen = () => (
        <svg viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" /></svg>
    )
    const EyeOff = () => (
        <svg viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
    )

    return (
        <>
            <SEO
                title="Create Account | CodeNexus Studio"
                description="Sign up for a free CodeNexus Studio account and start building high-performance web apps today."
                canonical="https://codenexusstudio.vercel.app/register"
            />

            <div className="register-page">
                <div className="reg-blob blob-a"></div>
                <div className="reg-blob blob-b"></div>

                {/* Header */}
                <header className="reg-header">
                    <Link to="/" className="reg-logo">Code<span>Nexus</span>.</Link>
                    <button className="reg-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? '🌞' : '🌙'}
                    </button>
                </header>

                <main className="reg-main">
                    <div className="reg-card">

                        {/* Icon */}
                        <div className="reg-icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" className="reg-icon">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                                <line x1="19" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="22" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>

                        <h1 className="reg-title">Create Account</h1>
                        <p className="reg-subtitle">Join CodeNexus — it's free forever</p>

                        <form onSubmit={handleSubmit} className="reg-form" noValidate>

                            {/* Full Name */}
                            <div className={`reg-input-group ${errors.name ? 'reg-input-error' : ''}`}>
                                <label htmlFor="reg-name">Full Name</label>
                                <div className="reg-input-wrapper">
                                    <span className="reg-icon-field">
                                        <svg viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" /></svg>
                                    </span>
                                    <input id="reg-name" name="name" type="text" placeholder="Your full name"
                                        value={formData.name} onChange={handleChange} autoComplete="name" />
                                </div>
                                {errors.name && <span className="reg-error">{errors.name}</span>}
                            </div>

                            {/* Email */}
                            <div className={`reg-input-group ${errors.email ? 'reg-input-error' : ''}`}>
                                <label htmlFor="reg-email">Email Address</label>
                                <div className="reg-input-wrapper">
                                    <span className="reg-icon-field">
                                        <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </span>
                                    <input id="reg-email" name="email" type="email" placeholder="you@example.com"
                                        value={formData.email} onChange={handleChange} autoComplete="email" />
                                </div>
                                {errors.email && <span className="reg-error">{errors.email}</span>}
                            </div>

                            {/* Password */}
                            <div className={`reg-input-group ${errors.password ? 'reg-input-error' : ''}`}>
                                <label htmlFor="reg-password">Password</label>
                                <div className="reg-input-wrapper">
                                    <span className="reg-icon-field">
                                        <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                    </span>
                                    <input id="reg-password" name="password" type={showPassword ? 'text' : 'password'}
                                        placeholder="Min. 6 characters" value={formData.password} onChange={handleChange} autoComplete="new-password" />
                                    <button type="button" className="reg-eye" onClick={() => setShowPassword(p => !p)} aria-label="Toggle password">
                                        {showPassword ? <EyeOff /> : <EyeOpen />}
                                    </button>
                                </div>
                                {errors.password && <span className="reg-error">{errors.password}</span>}
                            </div>

                            {/* Confirm Password */}
                            <div className={`reg-input-group ${errors.confirm ? 'reg-input-error' : ''}`}>
                                <label htmlFor="reg-confirm">Confirm Password</label>
                                <div className="reg-input-wrapper">
                                    <span className="reg-icon-field">
                                        <svg viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                    </span>
                                    <input id="reg-confirm" name="confirm" type={showConfirm ? 'text' : 'password'}
                                        placeholder="Re-enter password" value={formData.confirm} onChange={handleChange} autoComplete="new-password" />
                                    <button type="button" className="reg-eye" onClick={() => setShowConfirm(p => !p)} aria-label="Toggle confirm password">
                                        {showConfirm ? <EyeOff /> : <EyeOpen />}
                                    </button>
                                </div>
                                {errors.confirm && <span className="reg-error">{errors.confirm}</span>}
                            </div>

                            {/* Terms */}
                            <p className="reg-terms">
                                By signing up, you agree to our <a href="#">Terms of Service</a> &amp; <a href="#">Privacy Policy</a>.
                            </p>

                            {/* Submit */}
                            <button type="submit" className={`reg-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                                {loading ? <span className="reg-spinner"></span> : <>Create Account <span className="reg-arrow">→</span></>}
                            </button>

                            {/* Divider */}
                            <div className="reg-divider"><span>or sign up with</span></div>

                            {/* Social */}
                            <div className="reg-social">
                                <button type="button" className="reg-social-btn">
                                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                    Google
                                </button>
                                <button type="button" className="reg-social-btn">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                    GitHub
                                </button>
                            </div>
                        </form>

                        <p className="reg-login-link">
                            Already have an account? <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Register
