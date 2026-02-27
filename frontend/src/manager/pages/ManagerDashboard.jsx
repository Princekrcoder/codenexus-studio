import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Users, FolderKanban, CreditCard, TrendingUp, Activity, Clock
} from 'lucide-react'
import { dashboardAPI } from '../../services/api'

const ManagerDashboard = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            const response = await dashboardAPI.getData()
            if (response.success) {
                setDashboardData(response.data)
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--m-muted)' }}>Loading dashboard...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#ef4444' }}>Error: {error}</p>
            </div>
        )
    }

    const stats = dashboardData || {}
    const revenue = stats.revenue || { total: 0, collected: 0, outstanding: 0 }
    const clients = stats.clients || { total: 0 }
    const projects = stats.projects || { total: 0, byStatus: {} }
    const recentActivity = stats.recentActivity || []

    return (
        <>
            <div className="m-page-header">
                <div><h2>Manager Dashboard</h2><p>Client & Project Overview</p></div>
            </div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div className="m-stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/manager/clients')}>
                    <div className="m-stat-icon" style={{ background: 'rgba(245,158,11,0.12)' }}><Users size={20} color="#f59e0b" /></div>
                    <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--m-text)' }}>{clients.total}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Total Clients</div>
                    </div>
                </div>
                <div className="m-stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/manager/projects')}>
                    <div className="m-stat-icon" style={{ background: 'rgba(99,102,241,0.12)' }}><FolderKanban size={20} color="#6366f1" /></div>
                    <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--m-text)' }}>{projects.byStatus['In Progress'] || 0}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Active Projects</div>
                    </div>
                </div>
                <div className="m-stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/manager/payments')}>
                    <div className="m-stat-icon" style={{ background: 'rgba(34,197,94,0.12)' }}><TrendingUp size={20} color="#22c55e" /></div>
                    <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#22c55e' }}>₹{revenue.collected.toLocaleString('en-IN')}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Revenue Collected</div>
                    </div>
                </div>
                <div className="m-stat-card">
                    <div className="m-stat-icon" style={{ background: 'rgba(249,115,22,0.12)' }}><CreditCard size={20} color="#f97316" /></div>
                    <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f97316' }}>₹{revenue.outstanding.toLocaleString('en-IN')}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Pending Dues</div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="m-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Activity size={18} color="var(--m-text)" />
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--m-text)' }}>Recent Activity</h3>
                </div>
                {recentActivity.length === 0 ? (
                    <p style={{ color: 'var(--m-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }}>No recent activity</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {recentActivity.slice(0, 10).map((activity, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: 12, padding: '10px', borderRadius: 6, background: 'var(--m-bg-secondary)' }}>
                                <Clock size={16} color="var(--m-muted)" style={{ marginTop: 2 }} />
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--m-text)', marginBottom: 4 }}>{activity.description}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>{new Date(activity.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ManagerDashboard
