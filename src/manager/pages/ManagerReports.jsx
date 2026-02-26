import { useState } from 'react'
import {
    BarChart3, TrendingUp, Download, Calendar, Filter,
    Users, FolderKanban, CreditCard, PieChart, ArrowUpRight,
    ArrowDownRight, IndianRupee, FileText, Clock, CheckCircle2
} from 'lucide-react'

const TABS = ['Overview', 'Revenue', 'Clients', 'Projects']

const revenueData = [
    { month: 'Sep', amount: 85000 },
    { month: 'Oct', amount: 120000 },
    { month: 'Nov', amount: 95000 },
    { month: 'Dec', amount: 145000 },
    { month: 'Jan', amount: 110000 },
    { month: 'Feb', amount: 175000 },
]

const topClients = [
    { name: 'Raj Industries', revenue: 245000, projects: 3, status: 'Active' },
    { name: 'TechVision Pvt', revenue: 198000, projects: 2, status: 'Active' },
    { name: 'StartupHub', revenue: 155000, projects: 4, status: 'Active' },
    { name: 'Digital Wave', revenue: 120000, projects: 1, status: 'Completed' },
    { name: 'Nexus Corp', revenue: 98000, projects: 2, status: 'Active' },
]

const recentInvoices = [
    { id: 'INV-2026-042', client: 'Raj Industries', amount: 45000, status: 'Paid', date: '2026-02-20' },
    { id: 'INV-2026-041', client: 'TechVision Pvt', amount: 32000, status: 'Pending', date: '2026-02-18' },
    { id: 'INV-2026-040', client: 'StartupHub', amount: 28000, status: 'Overdue', date: '2026-02-10' },
    { id: 'INV-2026-039', client: 'Digital Wave', amount: 55000, status: 'Paid', date: '2026-02-05' },
    { id: 'INV-2026-038', client: 'Nexus Corp', amount: 18000, status: 'Pending', date: '2026-01-28' },
]

const projectStats = [
    { label: 'Websites', count: 8, color: '#f59e0b' },
    { label: 'Web Apps', count: 5, color: '#6366f1' },
    { label: 'SEO', count: 4, color: '#22c55e' },
    { label: 'Maintenance', count: 3, color: '#06b6d4' },
]

const maxRevenue = Math.max(...revenueData.map(r => r.amount))

const ManagerReports = () => {
    const [activeTab, setActiveTab] = useState('Overview')
    const [period, setPeriod] = useState('6 Months')

    return (
        <>
            <div className="m-page-header">
                <div><h2>Reports & Analytics</h2><p>Business performance insights</p></div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="m-btn-ghost"><Filter size={13} /> {period}</button>
                    <button className="m-btn-primary"><Download size={14} /> Export</button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="m-filter-bar" style={{ marginBottom: 20 }}>
                {TABS.map(t => (
                    <button key={t} className={`m-filter-tab ${activeTab === t ? 'active' : ''}`}
                        onClick={() => setActiveTab(t)}>{t}</button>
                ))}
            </div>

            {/* Quick Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 24 }}>
                {[
                    { label: 'Total Revenue', value: '₹12,45,000', change: '+18.2%', up: true, Icon: IndianRupee, color: '#22c55e' },
                    { label: 'Active Clients', value: '24', change: '+6 new', up: true, Icon: Users, color: '#6366f1' },
                    { label: 'Projects Delivered', value: '18', change: '+3 this month', up: true, Icon: CheckCircle2, color: '#f59e0b' },
                    { label: 'Pending Invoices', value: '₹2,35,000', change: '5 overdue', up: false, Icon: Clock, color: '#ef4444' },
                ].map((s, i) => (
                    <div key={i} className="m-stat-card">
                        <div className="m-stat-icon" style={{ background: `${s.color}18` }}>
                            <s.Icon size={20} color={s.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--m-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--m-text)', lineHeight: 1.2 }}>{s.value}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.7rem', fontWeight: 600, color: s.up ? '#22c55e' : '#ef4444', marginTop: 2 }}>
                                {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {s.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 20 }}>
                {/* Revenue Chart (bar chart) */}
                <div className="m-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--m-text)', fontSize: '0.95rem' }}>Revenue Trend</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>Last 6 months performance</div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            {['6 Months', '1 Year'].map(p => (
                                <button key={p} className={`m-filter-tab ${period === p ? 'active' : ''}`}
                                    onClick={() => setPeriod(p)} style={{ padding: '0.3rem 0.7rem', fontSize: '0.7rem' }}>{p}</button>
                            ))}
                        </div>
                    </div>
                    {/* Bar Chart */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 180, padding: '0 8px' }}>
                        {revenueData.map((r, i) => {
                            const h = (r.amount / maxRevenue) * 100
                            return (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--m-primary)' }}>₹{(r.amount / 1000).toFixed(0)}K</div>
                                    <div style={{
                                        width: '100%', maxWidth: 42, height: `${h}%`, minHeight: 8,
                                        background: `linear-gradient(180deg, #f59e0b, #f9731640)`,
                                        borderRadius: '6px 6px 3px 3px',
                                        transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            position: 'absolute', inset: 0, borderRadius: 'inherit',
                                            background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 60%)'
                                        }} />
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--m-muted)', fontWeight: 600 }}>{r.month}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{ borderTop: '1px solid var(--m-border)', marginTop: 16, paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--m-muted)' }}>Avg Monthly: <strong style={{ color: 'var(--m-text)' }}>₹1,21,667</strong></span>
                        <span style={{ color: '#22c55e', fontWeight: 600 }}>↑ 18.2% vs last period</span>
                    </div>
                </div>

                {/* Project Distribution */}
                <div className="m-card">
                    <div style={{ fontWeight: 700, color: 'var(--m-text)', fontSize: '0.95rem', marginBottom: 4 }}>Project Distribution</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)', marginBottom: 20 }}>By service type</div>

                    {/* Donut Chart Placeholder - Visual Ring */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <div style={{ position: 'relative', width: 120, height: 120 }}>
                            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                {(() => {
                                    const total = projectStats.reduce((s, p) => s + p.count, 0)
                                    let offset = 0
                                    return projectStats.map((p, i) => {
                                        const pct = (p.count / total) * 100
                                        const dashArray = `${pct} ${100 - pct}`
                                        const el = <circle key={i} cx="18" cy="18" r="15.9" fill="none" stroke={p.color} strokeWidth="3.2" strokeDasharray={dashArray} strokeDashoffset={-offset} strokeLinecap="round" />
                                        offset += pct
                                        return el
                                    })
                                })()}
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--m-text)' }}>20</div>
                                <div style={{ fontSize: '0.6rem', color: 'var(--m-muted)', fontWeight: 600 }}>Total</div>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {projectStats.map((p, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                                    <span style={{ fontSize: '0.8rem', color: 'var(--m-text)' }}>{p.label}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--m-text)' }}>{p.count}</span>
                                    <span style={{ fontSize: '0.68rem', color: 'var(--m-muted)' }}>({((p.count / 20) * 100).toFixed(0)}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Top Clients Table */}
                <div className="m-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--m-text)', fontSize: '0.95rem' }}>Top Clients</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>By revenue contribution</div>
                        </div>
                        <button className="m-btn-ghost" style={{ fontSize: '0.72rem', padding: '0.3rem 0.7rem' }}>View All</button>
                    </div>
                    <div className="m-table-wrap">
                        <table className="m-table">
                            <thead><tr><th>Client</th><th>Revenue</th><th>Projects</th><th>Status</th></tr></thead>
                            <tbody>
                                {topClients.map((c, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div className="m-avatar" style={{ width: 28, height: 28, fontSize: '0.6rem' }}>{c.name.slice(0, 2).toUpperCase()}</div>
                                                <span style={{ fontWeight: 600 }}>{c.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 700, color: 'var(--m-primary)' }}>₹{c.revenue.toLocaleString()}</td>
                                        <td><span style={{ fontWeight: 600 }}>{c.projects}</span></td>
                                        <td><span className={`m-badge ${c.status === 'Active' ? 'm-badge-green' : 'm-badge-blue'}`}>{c.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Invoices Table */}
                <div className="m-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--m-text)', fontSize: '0.95rem' }}>Recent Invoices</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>Latest billing activity</div>
                        </div>
                        <button className="m-btn-ghost" style={{ fontSize: '0.72rem', padding: '0.3rem 0.7rem' }}><FileText size={12} /> All Invoices</button>
                    </div>
                    <div className="m-table-wrap">
                        <table className="m-table">
                            <thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Status</th></tr></thead>
                            <tbody>
                                {recentInvoices.map((inv, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, fontSize: '0.78rem', color: 'var(--m-primary)' }}>{inv.id}</td>
                                        <td>{inv.client}</td>
                                        <td style={{ fontWeight: 700 }}>₹{inv.amount.toLocaleString()}</td>
                                        <td>
                                            <span className={`m-badge ${inv.status === 'Paid' ? 'm-badge-green' : inv.status === 'Pending' ? 'm-badge-yellow' : 'm-badge-red'}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManagerReports
