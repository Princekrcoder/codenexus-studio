import { useState, useEffect } from 'react'
import { Save, User, Bell, Shield } from 'lucide-react'
import { authAPI } from '../../services/api'

const ClientProfile = () => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState({ name: '', email: '', phone: '' })
    const [notifications, setNotifications] = useState({ email: true, push: true })
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const currentUser = authAPI.getCurrentUser()
        if (currentUser) {
            setUser(currentUser)
            setProfile({
                name: currentUser.name || '',
                email: currentUser.email || '',
                phone: currentUser.phone || ''
            })
        }
    }, [])

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const inputStyle = {
        width: '100%',
        padding: '0.5rem 0.85rem',
        background: 'var(--c-bg-secondary)',
        border: '1px solid var(--c-border)',
        borderRadius: 8,
        color: 'var(--c-text)',
        fontSize: '0.85rem',
        outline: 'none'
    }

    const labelStyle = {
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--c-muted)',
        marginBottom: 6
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 4 }}>Profile Settings</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--c-muted)' }}>Manage your account information</p>
                </div>
                <button
                    onClick={handleSave}
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#6366f1',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                    }}
                >
                    <Save size={14} /> {saved ? 'Saved ✓' : 'Save Changes'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                {/* Profile Information */}
                <div className="c-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(99, 102, 241, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={18} color="#6366f1" />
                        </div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--c-text)' }}>Profile Information</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Full Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={profile.email}
                                disabled
                                style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+91 ..."
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="c-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={18} color="#f59e0b" />
                        </div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--c-text)' }}>Notifications</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { label: 'Email Notifications', desc: 'Receive project updates via email', key: 'email' },
                            { label: 'Push Notifications', desc: 'Browser push alerts', key: 'push' }
                        ].map(n => (
                            <div key={n.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--c-text)', marginBottom: 2 }}>{n.label}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--c-muted)' }}>{n.desc}</div>
                                </div>
                                <button
                                    onClick={() => setNotifications({ ...notifications, [n.key]: !notifications[n.key] })}
                                    style={{
                                        width: 44,
                                        height: 24,
                                        borderRadius: 12,
                                        border: 'none',
                                        cursor: 'pointer',
                                        background: notifications[n.key] ? '#6366f1' : 'var(--c-border)',
                                        position: 'relative',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        background: '#fff',
                                        position: 'absolute',
                                        top: 3,
                                        left: notifications[n.key] ? 23 : 3,
                                        transition: 'left 0.2s'
                                    }} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security */}
                <div className="c-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(239, 68, 68, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Shield size={18} color="#ef4444" />
                        </div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--c-text)' }}>Security</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                            <label style={labelStyle}>Current Password</label>
                            <input type="password" placeholder="••••••••" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>New Password</label>
                            <input type="password" placeholder="Enter new password" style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Confirm Password</label>
                            <input type="password" placeholder="Confirm new password" style={inputStyle} />
                        </div>
                        <button
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'transparent',
                                color: '#6366f1',
                                border: '1px solid var(--c-border)',
                                borderRadius: 8,
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                marginTop: 4
                            }}
                        >
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientProfile
