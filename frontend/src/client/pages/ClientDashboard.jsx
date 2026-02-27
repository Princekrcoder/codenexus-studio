import { useState, useEffect } from 'react'
import { FolderKanban, TrendingUp, CreditCard, Clock } from 'lucide-react'
import { projectsAPI, invoicesAPI, authAPI } from '../../services/api'

const ClientDashboard = () => {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [invoices, setInvoices] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const currentUser = authAPI.getCurrentUser()
        setUser(currentUser)
        if (currentUser) {
            fetchDashboardData()
        }
    }, [])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            const [projectsRes, invoicesRes] = await Promise.all([
                projectsAPI.getAll(),
                invoicesAPI.getAll()
            ])
            setProjects(projectsRes.projects || [])
            setInvoices(invoicesRes.invoices || [])
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="c-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--c-muted)' }}>Loading dashboard...</p>
            </div>
        )
    }

    const activeProjects = projects.filter(p => p.status === 'In Progress')
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0)
    const paidRevenue = invoices.reduce((sum, inv) => sum + inv.paid, 0)
    const pendingRevenue = totalRevenue - paidRevenue

    return (
        <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div className="c-card" style={{ padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <FolderKanban size={20} color="#6366f1" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)', fontWeight: 600 }}>Active Projects</span>
                    </div>
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--c-text)' }}>{activeProjects.length}</p>
                </div>
                <div className="c-card" style={{ padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <TrendingUp size={20} color="#22c55e" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)', fontWeight: 600 }}>Total Spent</span>
                    </div>
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#22c55e' }}>₹{paidRevenue.toLocaleString('en-IN')}</p>
                </div>
                <div className="c-card" style={{ padding: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <CreditCard size={20} color="#f97316" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)', fontWeight: 600 }}>Pending Payments</span>
                    </div>
                    <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f97316' }}>₹{pendingRevenue.toLocaleString('en-IN')}</p>
                </div>
            </div>

            {/* Recent Projects */}
            <div className="c-card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 16 }}>Recent Projects</h3>
                {projects.length === 0 ? (
                    <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }}>No projects yet</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {projects.slice(0, 5).map(p => (
                            <div key={p.id} style={{ padding: 12, background: 'var(--c-bg-secondary)', borderRadius: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: 'var(--c-text)', marginBottom: 4 }}>{p.name}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)' }}>{p.service}</p>
                                    </div>
                                    <span className={`badge ${p.status === 'Delivered' ? 'badge-green' : p.status === 'In Progress' ? 'badge-blue' : 'badge-yellow'}`}>{p.status}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ flex: 1, height: 6, background: 'var(--c-border)', borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: `${p.progress}%`, height: '100%', background: '#6366f1' }} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)', minWidth: 35 }}>{p.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Recent Invoices */}
            <div className="c-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 16 }}>Recent Invoices</h3>
                {invoices.length === 0 ? (
                    <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }}>No invoices yet</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', fontSize: '0.85rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--c-border)' }}>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Project</th>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Amount</th>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Status</th>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.slice(0, 5).map(inv => (
                                    <tr key={inv.id} style={{ borderBottom: '1px solid var(--c-border)' }}>
                                        <td style={{ padding: '12px 0', color: 'var(--c-text)' }}>{inv.Project ? inv.Project.name : '—'}</td>
                                        <td style={{ padding: '12px 0', fontWeight: 600, color: 'var(--c-text)' }}>₹{inv.amount.toLocaleString('en-IN')}</td>
                                        <td style={{ padding: '12px 0' }}>
                                            <span className={`badge ${inv.status === 'Paid' ? 'badge-green' : inv.status === 'Partial' ? 'badge-yellow' : 'badge-red'}`}>{inv.status}</span>
                                        </td>
                                        <td style={{ padding: '12px 0', color: 'var(--c-muted)' }}>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default ClientDashboard
