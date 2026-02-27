import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/ClientLayout.css'
import { useAuth } from '../context/AuthContext'

const ClientLogin = ({ theme, toggleTheme }) => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const { login, logout } = useAuth()

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

            // Check if user is a client
            if (response.user.role !== 'Client') {
                setErrors({ email: 'This portal is for clients only. Please use the main login page.' })
                logout()
                return
            }

            // Navigate to client dashboard
            navigate('/client')
        } catch (error) {
            setErrors({ email: error.message || 'Invalid email or password' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="client-shell" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--c-bg)' }}>
            {/* Background blobs */}
            <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: 420, padding: '2rem 1rem', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 900, color: 'var(--c-text)', letterSpacing: -1 }}>
                        Code<span style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nexus</span>.
                    </Link>
                    <button
                        onClick={toggleTheme}
                        style={{ position: 'absolute', top: '2rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                    >
                        {theme === 'light' ? '🌞' : '🌙'}
                    </button>
                </div>

                {/* Card */}
                <div style={{
                    background: 'var(--c-surface)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 20,
                    padding: '2rem 1.8rem',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.3)'
                }}>
                    {/* Icon */}
                    <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: 16,
                            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.15))',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary)" strokeWidth="2" strokeLinecap="round">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="rgba(16,185,129,0.2)" stroke="var(--c-primary)" />
                                <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21" stroke="var(--c-primary)" />
                            </svg>
                        </div>
                    </div>

                    <h1 style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 800, color: 'var(--c-text)', marginBottom: 4 }}>Client Portal</h1>
                    <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--c-muted)', marginBottom: 24 }}>Sign in to view your projects & files</p>

                    <form onSubmit={handleSubmit}>
                        <div className="c-form-group">
                            <label>Email Address</label>
                            <input
                                type="email" name="email"
                                placeholder="you@company.com"
                                value={formData.email} onChange={handleChange}
                                style={{ borderColor: errors.email ? 'var(--c-red)' : undefined }}
                            />
                            {errors.email && <span style={{ fontSize: '0.72rem', color: 'var(--c-red)', marginTop: 4 }}>{errors.email}</span>}
                        </div>

                        <div className="c-form-group">
                            <label>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'} name="password"
                                    placeholder="Enter your password"
                                    value={formData.password} onChange={handleChange}
                                    style={{ borderColor: errors.password ? 'var(--c-red)' : undefined, paddingRight: 40 }}
                                />
                                <button type="button" onClick={() => setShowPassword(p => !p)}
                                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--c-muted)', cursor: 'pointer', fontSize: '0.8rem' }}>
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            {errors.password && <span style={{ fontSize: '0.72rem', color: 'var(--c-red)', marginTop: 4 }}>{errors.password}</span>}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0 20px', fontSize: '0.78rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--c-muted2)', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ accentColor: 'var(--c-primary)' }} /> Remember me
                            </label>
                            <a href="#" style={{ color: 'var(--c-primary)', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
                        </div>

                        <button type="submit" className="c-btn-primary"
                            disabled={loading}
                            style={{ width: '100%', justifyContent: 'center', padding: '0.7rem', fontSize: '0.88rem', opacity: loading ? 0.7 : 1 }}>
                            {loading ? (
                                <span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                            ) : 'Sign In →'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.8rem', color: 'var(--c-muted)' }}>
                        Don't have access? <a href="mailto:hello@codenexus.in" style={{ color: 'var(--c-primary)', textDecoration: 'none', fontWeight: 600 }}>Contact us</a>
                    </p>
                </div>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
    )
}

export default ClientLogin
