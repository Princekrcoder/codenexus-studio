import { useState } from 'react'
import { Save, Lock, Bell } from 'lucide-react'
import { clientProfile } from '../clientMockData'

const ClientProfile = () => {
    const [profile, setProfile] = useState({
        name: clientProfile.name,
        email: clientProfile.email,
        phone: clientProfile.phone,
        company: clientProfile.company,
    })
    const [passwords, setPasswords] = useState({ current: '', newPwd: '', confirm: '' })
    const [notifications, setNotifications] = useState(clientProfile.notifications)
    const [saved, setSaved] = useState('')

    const handleSave = (section) => {
        setSaved(section)
        setTimeout(() => setSaved(''), 2000)
    }

    return (
        <div className="c-grid-2">
            {/* Profile info */}
            <div className="client-card">
                <h3 className="c-section-title" style={{ marginBottom: 16 }}>Profile Information</h3>
                <div className="c-form-group">
                    <label>Full Name</label>
                    <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                </div>
                <div className="c-form-group">
                    <label>Email Address</label>
                    <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                </div>
                <div className="c-form-group">
                    <label>Phone Number</label>
                    <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
                </div>
                <div className="c-form-group">
                    <label>Company</label>
                    <input value={profile.company} onChange={e => setProfile({ ...profile, company: e.target.value })} />
                </div>
                <button className="c-btn-primary" onClick={() => handleSave('profile')}>
                    <Save size={15} /> {saved === 'profile' ? 'Saved ✓' : 'Save Changes'}
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Change password */}
                <div className="client-card">
                    <h3 className="c-section-title"><Lock size={16} /> Change Password</h3>
                    <div className="c-form-group">
                        <label>Current Password</label>
                        <input type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} placeholder="••••••••" />
                    </div>
                    <div className="c-form-group">
                        <label>New Password</label>
                        <input type="password" value={passwords.newPwd} onChange={e => setPasswords({ ...passwords, newPwd: e.target.value })} placeholder="Minimum 8 characters" />
                    </div>
                    <div className="c-form-group">
                        <label>Confirm New Password</label>
                        <input type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} placeholder="Re-enter new password" />
                    </div>
                    <button className="c-btn-primary" onClick={() => handleSave('password')}>
                        <Lock size={15} /> {saved === 'password' ? 'Updated ✓' : 'Update Password'}
                    </button>
                </div>

                {/* Notification preferences */}
                <div className="client-card">
                    <h3 className="c-section-title"><Bell size={16} /> Notification Preferences</h3>
                    <div className="c-toggle-row">
                        <span className="c-toggle-label">Email Notifications</span>
                        <label className="c-toggle">
                            <input type="checkbox" checked={notifications.email} onChange={e => setNotifications({ ...notifications, email: e.target.checked })} />
                            <span className="c-toggle-slider" />
                        </label>
                    </div>
                    <div className="c-toggle-row">
                        <span className="c-toggle-label">SMS Notifications</span>
                        <label className="c-toggle">
                            <input type="checkbox" checked={notifications.sms} onChange={e => setNotifications({ ...notifications, sms: e.target.checked })} />
                            <span className="c-toggle-slider" />
                        </label>
                    </div>
                    <div className="c-toggle-row">
                        <span className="c-toggle-label">Browser Notifications</span>
                        <label className="c-toggle">
                            <input type="checkbox" checked={notifications.browser} onChange={e => setNotifications({ ...notifications, browser: e.target.checked })} />
                            <span className="c-toggle-slider" />
                        </label>
                    </div>
                    <button className="c-btn-primary" style={{ marginTop: 12 }} onClick={() => handleSave('notif')}>
                        <Save size={15} /> {saved === 'notif' ? 'Saved ✓' : 'Save Preferences'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ClientProfile
