import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom'
import {
    LayoutDashboard, Users, FolderKanban, CreditCard,
    BarChart3, Settings as SettingsIcon, LogOut,
    UserCheck, UserPlus, CheckCircle2,
    ChevronDown, ChevronRight, Menu, Sun, Moon, Bell,
    Search, TrendingUp, AlertCircle, RefreshCcw
} from 'lucide-react'
<<<<<<< HEAD
import './ManagerLayout.css'
import { authAPI } from '../services/api'
=======
import '../styles/ManagerLayout.css'
>>>>>>> 284ba4f6126df7127df364123ba165668c199ff0

import ManagerDashboard from './pages/ManagerDashboard'
import ManagerClients from './pages/ManagerClients'
import ManagerClientDetail from './pages/ManagerClientDetail'
import ManagerProjects from './pages/ManagerProjects'
import ManagerPayments from './pages/ManagerPayments'
import ManagerReports from './pages/ManagerReports'
import ManagerSettings from './pages/ManagerSettings'

const NAV = [
    { path: '/manager', label: 'Dashboard', Icon: LayoutDashboard },
    {
        label: 'Clients', Icon: Users, children: [
            { path: '/manager/clients', label: 'All Clients', Icon: Users },
            { path: '/manager/clients?status=Active', label: 'Active Clients', Icon: UserCheck },
            { path: '/manager/clients?status=Lead', label: 'Leads', Icon: UserPlus },
            { path: '/manager/clients?status=Completed', label: 'Completed', Icon: CheckCircle2 },
        ]
    },
    { path: '/manager/projects', label: 'Projects', Icon: FolderKanban },
    { path: '/manager/payments', label: 'Payments', Icon: CreditCard },
    { path: '/manager/reports', label: 'Reports', Icon: BarChart3 },
    { path: '/manager/settings', label: 'Settings', Icon: SettingsIcon },
]

const PAGE_TITLES = {
    '/manager': { title: 'Dashboard' },
    '/manager/clients': { title: 'Client Records' },
    '/manager/projects': { title: 'Project Tracker' },
    '/manager/payments': { title: 'Payments & Billing' },
    '/manager/reports': { title: 'Reports' },
    '/manager/settings': { title: 'Settings' },
}

const NOTIFICATIONS = [
    { id: 1, Icon: TrendingUp, iconClass: 'green', title: 'New lead received', desc: 'Kavya Nair — Website project', time: '5 min ago', unread: true },
    { id: 2, Icon: CheckCircle2, iconClass: 'green', title: 'Invoice paid', desc: 'Kunal Verma — ₹95,000', time: '2 hrs ago', unread: true },
    { id: 3, Icon: RefreshCcw, iconClass: 'blue', title: 'Project updated', desc: 'BusinessCo Web App — 60%', time: '4 hrs ago', unread: false },
    { id: 4, Icon: AlertCircle, iconClass: 'orange', title: 'Deadline approaching', desc: 'SEO Optimization — 5 days', time: 'Yesterday', unread: false },
]

const ManagerLayout = ({ theme, toggleTheme }) => {
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [clientsOpen, setClientsOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()
    const { pathname, search } = useLocation()
    const notifRef = useRef(null)

    const unreadCount = NOTIFICATIONS.filter(n => n.unread).length

    useEffect(() => {
        // Check if user is logged in and has valid token
        const user = authAPI.getCurrentUser()
        const isAuth = authAPI.isAuthenticated()
        
        if (!user || !isAuth) {
            navigate('/login')
            return
        }
        
        // Check if user has manager role
        if (user.role !== 'Manager') {
            authAPI.logout()
            navigate('/login')
            return
        }
        
        setUserInfo(user)
    }, [navigate])

    useEffect(() => { setMobileOpen(false) }, [pathname])

    useEffect(() => {
        if (pathname.startsWith('/manager/clients')) setClientsOpen(true)
    }, [pathname])

    // Close notif panel on outside click
    useEffect(() => {
        const h = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false) }
        document.addEventListener('mousedown', h)
        return () => document.removeEventListener('mousedown', h)
    }, [])

    const page = PAGE_TITLES[pathname] || { title: 'Manager' }

    const isActive = (navPath) => {
        if (!navPath) return false
        const [p, q] = navPath.split('?')
        if (q) return pathname === p && search === `?${q}`
        return pathname === p && !search
    }

    const isParentActive = (children) => children?.some(c => isActive(c.path))

    const handleLogout = () => {
        authAPI.logout()
        navigate('/login')
    }

    if (!userInfo) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>
    }

    const userInitials = userInfo.name ? userInfo.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'MG'

    return (
        <div className="manager-shell">
            {/* Sidebar */}
            <aside className={`manager-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
                <Link to="/manager" className="m-sidebar-brand">
                    <div className="m-logo">M</div>
                    <span className="m-brand-text">Manager</span>
                </Link>

                <nav className="manager-nav">
                    {NAV.map((n, i) => {
                        if (n.children) {
                            return (
                                <div key={n.label} className="m-nav-group">
                                    <button
                                        className={`m-nav-link ${isParentActive(n.children) ? 'active' : ''}`}
                                        onClick={() => setClientsOpen(o => !o)}
                                    >
                                        <n.Icon size={18} />
                                        <span className="m-nav-label">{n.label}</span>
                                        <ChevronDown size={14} className={`m-nav-chevron ${clientsOpen ? 'open' : ''}`} />
                                    </button>
                                    <div className={`m-nav-children ${clientsOpen ? 'open' : ''}`}>
                                        {n.children.map(c => (
                                            <button key={c.path}
                                                className={`m-nav-link m-nav-child ${isActive(c.path) ? 'active' : ''}`}
                                                onClick={() => navigate(c.path)}
                                            >
                                                <span className="m-nav-label">{c.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <button key={n.path}
                                className={`m-nav-link ${isActive(n.path) ? 'active' : ''}`}
                                onClick={() => navigate(n.path)}
                            >
                                <n.Icon size={18} />
                                <span className="m-nav-label">{n.label}</span>
                            </button>
                        )
                    })}
                </nav>

                {/* Logout at bottom */}
                <div className="m-sidebar-footer">
                    <button className="m-nav-link m-logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span className="m-nav-label">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Body */}
            <div className={`manager-body ${collapsed ? 'collapsed' : ''}`}>
                <header className="manager-topbar">

                    {/* Left: hamburger + collapse + breadcrumb */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <button className="m-menu-btn" onClick={() => setMobileOpen(o => !o)}>
                            <Menu size={18} />
                        </button>
                        <button className="m-btn-icon" onClick={() => setCollapsed(c => !c)} style={{ border: 'none' }}>
                            <ChevronRight size={16} style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.2s' }} />
                        </button>
                        <div className="m-breadcrumb">
                            <span>Manager</span>
                            <ChevronRight size={13} />
                            <strong>{page.title}</strong>
                        </div>
                    </div>

                    {/* Centre: search */}
                    <div className="m-topbar-search">
                        <Search size={15} className="m-search-icon" />
                        <input placeholder="Search clients, projects…" />
                    </div>

                    {/* Right: theme + bell + avatar */}
                    <div className="m-topbar-right">
                        <button className="m-btn-icon" onClick={toggleTheme} title="Toggle theme">
                            {theme === 'light' ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
                        </button>

                        {/* Notification bell */}
                        <div ref={notifRef} style={{ position: 'relative' }}>
                            <button className="m-btn-icon" onClick={() => setNotifOpen(o => !o)}>
                                <Bell size={16} strokeWidth={1.8} />
                                {unreadCount > 0 && <span className="m-notif-dot" />}
                            </button>

                            {notifOpen && (
                                <div className="m-notif-panel">
                                    <div className="m-notif-header">
                                        <h4>Notifications</h4>
                                        <span className="m-badge-red">{unreadCount} new</span>
                                    </div>
                                    {NOTIFICATIONS.map(n => {
                                        const { Icon: NIcon } = n
                                        return (
                                            <div className="m-notif-item" key={n.id} style={{ opacity: n.unread ? 1 : 0.6 }}>
                                                <div className={`m-notif-icon ${n.iconClass}`}>
                                                    <NIcon size={15} strokeWidth={1.8} />
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <strong>{n.title}</strong>
                                                    <span>{n.desc}</span>
                                                </div>
                                                <small>{n.time}</small>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="m-topbar-avatar">{userInitials}</div>
                    </div>
                </header>

                <main className="manager-main">
                    <Routes>
                        <Route path="/" element={<ManagerDashboard />} />
                        <Route path="/clients" element={<ManagerClients />} />
                        <Route path="/clients/:id" element={<ManagerClientDetail />} />
                        <Route path="/projects" element={<ManagerProjects />} />
                        <Route path="/payments" element={<ManagerPayments />} />
                        <Route path="/reports" element={<ManagerReports />} />
                        <Route path="/settings" element={<ManagerSettings />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default ManagerLayout
