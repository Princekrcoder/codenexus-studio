import { useNavigate } from 'react-router-dom'
import {
    Users, FolderKanban, CreditCard, MessageSquare, TrendingUp,
    Clock, AlertCircle, PhoneCall, MessageCircle, Send, StickyNote, ArrowRight
} from 'lucide-react'
import { getManagerStats, getFollowUps, getRecentComms, getDueClients, mockClients, CLIENT_STATUSES } from '../managerMockData'

const CommTypeIcon = ({ type }) => {
    const icons = { Call: PhoneCall, WhatsApp: MessageCircle, Email: Send, Note: StickyNote }
    const I = icons[type] || MessageSquare
    return <I size={14} />
}

const ManagerDashboard = () => {
    const navigate = useNavigate()
    const stats = getManagerStats()
    const followUps = getFollowUps()
    const recentComms = getRecentComms()
    const dueClients = getDueClients()

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
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--m-text)' }}>{stats.totalClients}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Total Clients</div>
                    </div>
                </div>
                <div className="m-stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/manager/projects')}>
                    <div className="m-stat-icon" style={{ background: 'rgba(99,102,241,0.12)' }}><FolderKanban size={20} color="#6366f1" /></div>
                    <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--m-text)' }}>{stats.activeProjects}<span style={{ fontSize: '0.85rem', color: 'var(--m-muted)', fontWeight: 400 }}> / {stats.totalProjects}</span></div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Active Projects</div>
                    </div>
                </div>
                <div className="m-stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/manager/payments')}>
                    <div className="m-stat-icon" style={{ background: 'rgba(34,197,94,0.12)' }}><TrendingUp size={20} color="#22c55e" /></div>
                    <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#22c55e' }}>₹{(stats.collected / 1000).toFixed(0)}k</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Revenue Collected</div>
                    </div>
                </div>
                <div className="m-stat-card">
                    <div className="m-stat-icon" style={{ background: 'rgba(249,115,22,0.12)' }}><CreditCard size={20} color="#f97316" /></div>
                    <div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f97316' }}>₹{(stats.pending / 1000).toFixed(0)}k</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Pending Dues</div>
                    </div>
                </div>
            </div>

            {/* Client Status Breakdown */}
            <div className="m-card" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--m-text)' }}>Client Status Breakdown</h3>
                    <button className="m-btn-ghost" onClick={() => navigate('/manager/clients')} style={{ fontSize: '0.75rem' }}>View All <ArrowRight size={12} /></button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 10 }}>
                    {CLIENT_STATUSES.map(s => {
                        const count = mockClients.filter(c => c.status === s).length
                        const colors = { Lead: '#06b6d4', Active: '#22c55e', 'On Hold': '#eab308', Completed: '#6366f1', Lost: '#ef4444' }
                        const pct = stats.totalClients ? Math.round((count / stats.totalClients) * 100) : 0
                        return (
                            <div key={s} style={{ textAlign: 'center', padding: '0.8rem 0.5rem', borderRadius: 12, background: `${colors[s]}08`, border: `1px solid ${colors[s]}20` }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: colors[s] }}>{count}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--m-muted)', fontWeight: 600 }}>{s}</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--m-muted)', marginTop: 2 }}>{pct}%</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
                {/* Follow-ups */}
                <div className="m-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--m-text)', display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={15} /> Upcoming Follow-ups</h3>
                    </div>
                    {followUps.length === 0 && <div className="m-empty"><p>No follow-ups</p></div>}
                    {followUps.map(f => {
                        const client = mockClients.find(c => c.id === f.clientId)
                        return (
                            <div key={f.id} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--m-border)', alignItems: 'center' }}>
                                <div className="m-avatar">{client?.name.slice(0, 2).toUpperCase()}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--m-text)' }}>{client?.name}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.message}</div>
                                </div>
                                <span className="m-badge m-badge-amber" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>{f.followUp}</span>
                            </div>
                        )
                    })}
                </div>

                {/* Payment Due */}
                <div className="m-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--m-text)', display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={15} /> Payment Due</h3>
                        <button className="m-btn-ghost" onClick={() => navigate('/manager/payments')} style={{ fontSize: '0.75rem' }}>View All <ArrowRight size={12} /></button>
                    </div>
                    {dueClients.length === 0 && <div className="m-empty"><p>All payments clear</p></div>}
                    {dueClients.map(c => (
                        <div key={c.id} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--m-border)', alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => navigate(`/manager/clients/${c.id}`)}>
                            <div className="m-avatar">{c.name.slice(0, 2).toUpperCase()}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--m-text)' }}>{c.name}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>{c.company}</div>
                            </div>
                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f97316' }}>₹{c.dueAmount.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="m-card" style={{ marginTop: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--m-text)' }}>Recent Communication</h3>
                    <button className="m-btn-ghost" onClick={() => navigate('/manager/communication')} style={{ fontSize: '0.75rem' }}>View All <ArrowRight size={12} /></button>
                </div>
                <div className="m-table-wrap">
                    <table className="m-table">
                        <thead><tr><th>Type</th><th>Client</th><th>Message</th><th>By</th><th>Date</th></tr></thead>
                        <tbody>
                            {recentComms.map(c => {
                                const client = mockClients.find(cl => cl.id === c.clientId)
                                return (
                                    <tr key={c.id}>
                                        <td><span className={`m-badge ${c.type === 'Call' ? 'm-badge-green' : c.type === 'WhatsApp' ? 'm-badge-green' : c.type === 'Email' ? 'm-badge-blue' : 'm-badge-yellow'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><CommTypeIcon type={c.type} /> {c.type}</span></td>
                                        <td style={{ fontWeight: 600 }}>{client?.name || '—'}</td>
                                        <td style={{ fontSize: '0.78rem', color: 'var(--m-muted2)', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</td>
                                        <td style={{ fontSize: '0.78rem', color: 'var(--m-muted)' }}>{c.by}</td>
                                        <td style={{ fontSize: '0.78rem', color: 'var(--m-muted)' }}>{c.date}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ManagerDashboard
