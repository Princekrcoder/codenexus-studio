import { useState } from 'react'
import { Save, User, Bell, Shield, Palette } from 'lucide-react'

const ManagerSettings = () => {
    const [profile, setProfile] = useState({ name: 'Manager', email: 'manager@codenexus.com', phone: '+91 98765 43210', role: 'Manager' })
    const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, weekly: true })
    const [saved, setSaved] = useState(false)

    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

    const inputStyle = { width: '100%', padding: '0.5rem 0.85rem', background: 'var(--m-surface2)', border: '1px solid var(--m-border)', borderRadius: 10, color: 'var(--m-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem', outline: 'none', boxSizing: 'border-box' }
    const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--m-muted)', marginBottom: 4 }

    return (
        <>
            <div className="m-page-header">
                <div><h2>Settings</h2><p>Manage your account & preferences</p></div>
                <button className="m-btn-primary" onClick={handleSave}>
                    <Save size={14} /> {saved ? 'Saved ✓' : 'Save Changes'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
                {/* Profile Section */}
                <div className="m-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div className="m-stat-icon" style={{ background: 'rgba(99, 102, 241, 0.12)' }}>
                            <User size={18} color="#6366f1" />
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--m-text)' }}>Profile Information</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            { label: 'Full Name', key: 'name', ph: 'Your name' },
                            { label: 'Email Address', key: 'email', ph: 'email@example.com' },
                            { label: 'Phone Number', key: 'phone', ph: '+91 ...' },
                            { label: 'Role', key: 'role', ph: 'Role', disabled: true },
                        ].map(f => (
                            <div key={f.key}>
                                <label style={labelStyle}>{f.label}</label>
                                <input placeholder={f.ph} value={profile[f.key]} disabled={f.disabled}
                                    onChange={e => setProfile({ ...profile, [f.key]: e.target.value })}
                                    style={{ ...inputStyle, opacity: f.disabled ? 0.5 : 1 }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="m-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div className="m-stat-icon" style={{ background: 'rgba(245, 158, 11, 0.12)' }}>
                            <Bell size={18} color="#f59e0b" />
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--m-text)' }}>Notifications</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            { label: 'Email Notifications', desc: 'Receive updates via email', key: 'email' },
                            { label: 'Push Notifications', desc: 'Browser push alerts', key: 'push' },
                            { label: 'SMS Alerts', desc: 'Text message notifications', key: 'sms' },
                            { label: 'Weekly Digest', desc: 'Weekly summary report', key: 'weekly' },
                        ].map(n => (
                            <div key={n.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--m-text)' }}>{n.label}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>{n.desc}</div>
                                </div>
                                <button
                                    onClick={() => setNotifications({ ...notifications, [n.key]: !notifications[n.key] })}
                                    style={{
                                        width: 42, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                                        background: notifications[n.key] ? 'var(--m-primary)' : 'var(--m-border)',
                                        position: 'relative', transition: 'background 0.2s'
                                    }}>
                                    <div style={{
                                        width: 18, height: 18, borderRadius: '50%', background: '#fff',
                                        position: 'absolute', top: 3,
                                        left: notifications[n.key] ? 21 : 3,
                                        transition: 'left 0.2s'
                                    }} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security */}
                <div className="m-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div className="m-stat-icon" style={{ background: 'rgba(239, 68, 68, 0.12)' }}>
                            <Shield size={18} color="#ef4444" />
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--m-text)' }}>Security</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                        <button className="m-btn-ghost" style={{ alignSelf: 'flex-start', marginTop: 4 }}>Update Password</button>
                    </div>
                </div>

                {/* Appearance */}
                <div className="m-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div className="m-stat-icon" style={{ background: 'rgba(6, 182, 212, 0.12)' }}>
                            <Palette size={18} color="#06b6d4" />
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--m-text)' }}>Appearance</div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {['Amber (default)', 'Blue', 'Green', 'Purple'].map(t => (
                            <button key={t} className={`m-filter-tab ${t.includes('default') ? 'active' : ''}`}>{t}</button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManagerSettings
