import { useState, useRef, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
    LayoutDashboard, FolderKanban, FileDown, CreditCard, MessageSquare, User,
    Menu, Sun, Moon, Bell, ChevronRight, Globe, Settings, BarChart3, LogOut
} from 'lucide-react'
import './ClientLayout.css'
import { authAPI } from '../services/api'

import ClientDashboard from './pages/ClientDashboard'
import ClientProjects from './pages/ClientProjects'
import ClientFiles from './pages/ClientFiles'
import ClientPayments from './pages/ClientPayments'
import ClientMessages from './pages/ClientMessages'
import ClientProfile from './pages/ClientProfile'

const NAV = [
    { section: 'Overview' },
    { path: '/client', label: 'Dashboard', Icon: LayoutDashboard },
    { section: 'Project' },
    { path: '/client/projects', label: 'My Projects', Icon: FolderKanban },
    { path: '/client/files', label: 'Files & Deliverables', Icon: FileDown },
    { path: '/client/payments', label: 'Payments', Icon: CreditCard },
    { section: 'Support' },
    { path: '/client/messages', label: 'Messages', Icon: MessageSquare, badge: 1 },
    { section: 'Account' },
    { path: '/client/profile', label: 'Profile & Settings', Icon: User },
]

const ClientLayout = ({ theme, toggleTheme }) => {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const notifRef = useRef(null)

    useEffect(() => {
        // Check if user is logged in and has valid token
        const user = authAPI.getCurrentUser()
        const isAuth = authAPI.isAuthenticated()
        
        if (!user || !isAuth) {
            navigate('/client/login')
            return
        }
        
        // Check if user has client role
        if (user.role !== 'Client') {
            authAPI.logout()
            navigate('/client/login')
            return
        }
        
        setUserInfo(user)
    }, [navigate])

    const pageInfo = userInfo ? {
        '/client': { title: 'Dashboard', subtitle: `Welcome back, ${userInfo.name} 👋` },
        '/client/projects': { title: 'My Projects', subtitle: 'Track your project progress' },
        '/client/files': { title: 'Files & Deliverables', subtitle: 'Download your project files' },
        '/client/payments': { title: 'Payments & Invoices', subtitle: 'View your billing history' },
        '/client/messages': { title: 'Messages', subtitle: 'Communicate with our team' },
        '/client/profile': { title: 'Profile & Settings', subtitle: 'Manage your account' },
    }[location.pathname] || { title: 'Client Portal', subtitle: '' } : { title: 'Client Portal', subtitle: '' }

    useEffect(() => {
        const h = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false) }
        document.addEventListener('mousedown', h)
        return () => document.removeEventListener('mousedown', h)
    }, [])

    const handleNav = (path) => { navigate(path); setMobileOpen(false) }
    const toggleSidebar = () => {
        if (window.innerWidth <= 900) setMobileOpen(o => !o)
        else setCollapsed(c => !c)
    }

    const handleLogout = () => {
        authAPI.logout()
        navigate('/client/login')
    }

    if (!userInfo) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>
    }

    const userInitials = userInfo.name ? userInfo.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'CL'

    return (
        <div className="client-shell">
            {mobileOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 199 }}
                    onClick={() => setMobileOpen(false)} />
            )}

            {/* ── Sidebar ── */}
            <aside className={`client-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
                <div className="client-sidebar-brand">
                    <div className="client-brand-icon">
                        <BarChart3 size={18} color="#fff" />
                    </div>
                    <div className="client-brand-logo">Code<span>Nexus</span></div>
                    <div className="client-brand-badge">CLIENT</div>
                </div>

                <nav className="client-nav">
                    {NAV.map((item, i) => {
                        if (item.section) return (
                            <div key={i} className="client-nav-section">{item.section}</div>
                        )
                        const isActive = item.path === '/client'
                            ? location.pathname === '/client'
                            : location.pathname.startsWith(item.path)
                        const { Icon } = item
                        return (
                            <button key={item.path}
                                className={`client-nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => handleNav(item.path)}>
                                <span className="nav-icon"><Icon size={17} strokeWidth={1.8} /></span>
                                <span className="nav-label">{item.label}</span>
                                {item.badge && <span className="nav-badge">{item.badge}</span>}
                            </button>
                        )
                    })}
                </nav>

                <div style={{ padding: '0 0.6rem' }}>
                    <button className="client-nav-link" onClick={() => navigate('/')}>
                        <span className="nav-icon"><Globe size={17} strokeWidth={1.8} /></span>
                        <span className="nav-label">Back to Site</span>
                    </button>
                    <button className="client-nav-link" onClick={handleLogout} style={{ color: '#ef4444' }}>
                        <span className="nav-icon"><LogOut size={17} strokeWidth={1.8} /></span>
                        <span className="nav-label">Logout</span>
                    </button>
                </div>

                <div className="client-sidebar-profile" onClick={() => handleNav('/client/profile')}>
                    <div className="profile-avatar">{userInitials}</div>
                    <div className="profile-info">
                        <strong>{userInfo.name}</strong>
                        <span>{userInfo.email}</span>
                    </div>
                    <Settings size={14} color="var(--c-muted)" />
                </div>
            </aside>

            {/* ── Body ── */}
            <div className={`client-body ${collapsed ? 'collapsed' : ''}`}>
                <header className="client-topbar">
                    <button className="client-topbar-toggle" onClick={toggleSidebar}>
                        <Menu size={20} strokeWidth={1.8} />
                    </button>

                    <div className="client-breadcrumb">
                        <span>CodeNexus</span>
                        <ChevronRight size={14} />
                        <strong>{pageInfo.title}</strong>
                    </div>

                    <div className="client-topbar-actions">
                        <button className="client-icon-btn" onClick={toggleTheme} title="Toggle theme">
                            {theme === 'light'
                                ? <Sun size={17} strokeWidth={1.8} />
                                : <Moon size={17} strokeWidth={1.8} />}
                        </button>

                        <div ref={notifRef} style={{ position: 'relative' }}>
                            <button className="client-icon-btn" onClick={() => setNotifOpen(o => !o)}>
                                <Bell size={17} strokeWidth={1.8} />
                            </button>

                            {notifOpen && (
                                <div className="c-modal" style={{ position: 'absolute', right: 0, top: '110%', width: 300, padding: '1rem' }}>
                                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 10 }}>Notifications</h4>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--c-muted)' }}>No new notifications</p>
                                </div>
                            )}
                        </div>

                        <div className="client-topbar-avatar" title="Profile">{userInitials}</div>
                    </div>
                </header>

                <main className="client-main">
                    <div className="client-page-header">
                        <h1>{pageInfo.title}</h1>
                        <p>{pageInfo.subtitle}</p>
                    </div>
                    <Routes>
                        <Route path="/" element={<ClientDashboard />} />
                        <Route path="/projects" element={<ClientProjects />} />
                        <Route path="/files" element={<ClientFiles />} />
                        <Route path="/payments" element={<ClientPayments />} />
                        <Route path="/messages" element={<ClientMessages />} />
                        <Route path="/profile" element={<ClientProfile />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default ClientLayout
