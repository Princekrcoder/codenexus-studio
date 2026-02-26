import {
    FolderKanban, CreditCard, CalendarClock, MessageSquare,
    TrendingUp, FileDown, RefreshCcw, TicketCheck
} from 'lucide-react'
import { clientProjects, clientInvoices, clientTickets, clientActivity } from '../clientMockData'

const ClientDashboard = () => {
    const activeProjects = clientProjects.filter(p => p.status !== 'Delivered').length
    const totalDue = clientInvoices.reduce((s, i) => s + (i.amount - i.paid), 0)
    const nextDeadline = clientProjects.filter(p => p.status !== 'Delivered').sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0]
    const openTickets = clientTickets.filter(t => t.status !== 'Closed').length

    const stats = [
        { label: 'Active Projects', value: activeProjects, icon: FolderKanban, color: 'rgba(16, 185, 129, 0.12)', iconColor: '#10b981' },
        { label: 'Pending Payment', value: `₹${totalDue.toLocaleString()}`, icon: CreditCard, color: 'rgba(249, 115, 22, 0.12)', iconColor: '#f97316' },
        { label: 'Next Deadline', value: nextDeadline ? nextDeadline.deadline : '—', icon: CalendarClock, color: 'rgba(6, 182, 212, 0.12)', iconColor: '#06b6d4' },
        { label: 'Open Tickets', value: openTickets, icon: MessageSquare, color: 'rgba(99, 102, 241, 0.12)', iconColor: '#6366f1' },
    ]

    const activityIcons = {
        payment: { Icon: CreditCard, cls: 'green' },
        file: { Icon: FileDown, cls: 'cyan' },
        project: { Icon: RefreshCcw, cls: 'blue' },
        message: { Icon: TicketCheck, cls: 'orange' },
    }

    return (
        <>
            {/* Stats */}
            <div className="client-stats-grid">
                {stats.map((s, i) => (
                    <div className="client-stat-card" key={i}>
                        <div className="client-stat-icon" style={{ background: s.color }}>
                            <s.icon size={20} color={s.iconColor} />
                        </div>
                        <div className="client-stat-info">
                            <h3>{s.value}</h3>
                            <p>{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="c-grid-2">
                {/* Project progress */}
                <div className="client-card">
                    <h3 className="c-section-title"><FolderKanban size={16} /> Project Progress</h3>
                    {clientProjects.map(p => (
                        <div key={p.id} style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--c-text)' }}>{p.name}</span>
                                <span style={{ fontSize: '0.78rem', color: 'var(--c-muted)' }}>{p.progress}%</span>
                            </div>
                            <div className="c-progress-bar">
                                <div className="c-progress-fill" style={{ width: `${p.progress}%` }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                <span className={`c-badge ${p.status === 'Delivered' ? 'c-badge-green' : 'c-badge-cyan'}`}>{p.status}</span>
                                <span style={{ fontSize: '0.72rem', color: 'var(--c-muted)' }}>Due: {p.deadline}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment summary */}
                <div className="client-card">
                    <h3 className="c-section-title"><CreditCard size={16} /> Payment Summary</h3>
                    {(() => {
                        const totalAmount = clientInvoices.reduce((s, i) => s + i.amount, 0)
                        const totalPaid = clientInvoices.reduce((s, i) => s + i.paid, 0)
                        const paidPct = Math.round((totalPaid / totalAmount) * 100)
                        return (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--c-muted)', marginBottom: 2 }}>Total Invoiced</div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--c-text)' }}>₹{totalAmount.toLocaleString()}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--c-muted)', marginBottom: 2 }}>Paid</div>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--c-primary)' }}>₹{totalPaid.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className="c-progress-bar" style={{ height: 12, marginBottom: 8 }}>
                                    <div className="c-progress-fill" style={{ width: `${paidPct}%` }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                    <span style={{ color: 'var(--c-primary)', fontWeight: 600 }}>{paidPct}% Paid</span>
                                    <span style={{ color: 'var(--c-orange)', fontWeight: 600 }}>₹{(totalAmount - totalPaid).toLocaleString()} Due</span>
                                </div>
                            </div>
                        )
                    })()}

                    <div style={{ marginTop: 20 }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-muted2)', marginBottom: 8 }}>Recent Invoices</div>
                        {clientInvoices.slice(0, 3).map(inv => (
                            <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--c-border)' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--c-text)', fontWeight: 500 }}>{inv.invoiceId}</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--c-text)' }}>₹{inv.amount.toLocaleString()}</span>
                                <span className={`c-badge ${inv.status === 'Paid' ? 'c-badge-green' : inv.status === 'Partial' ? 'c-badge-orange' : 'c-badge-red'}`}>{inv.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activity feed */}
            <div className="client-card" style={{ marginTop: 14 }}>
                <h3 className="c-section-title"><TrendingUp size={16} /> Recent Activity</h3>
                <div className="c-activity-feed">
                    {clientActivity.map(a => {
                        const ai = activityIcons[a.type] || activityIcons.project
                        return (
                            <div className="c-activity-item" key={a.id}>
                                <div className={`c-activity-icon ${ai.cls}`}>
                                    <ai.Icon size={15} />
                                </div>
                                <div className="c-activity-text">
                                    <strong>{a.action}</strong>
                                    <span>{a.detail}</span>
                                </div>
                                <span className="c-activity-time">{a.time}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ClientDashboard
