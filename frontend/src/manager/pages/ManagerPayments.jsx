import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { invoicesAPI } from '../../services/api'

const StatusBadge = ({ s }) => {
    const m = { Paid: 'badge-green', Unpaid: 'badge-red', Partial: 'badge-yellow' }
    return <span className={`badge ${m[s] || 'badge-gray'}`}>{s}</span>
}

const ManagerPayments = () => {
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [stats, setStats] = useState({ totalRevenue: 0, collectedRevenue: 0, outstandingRevenue: 0 })

    useEffect(() => {
        fetchInvoices()
        fetchStats()
    }, [])

    const fetchInvoices = async () => {
        try {
            setLoading(true)
            const response = await invoicesAPI.getAll()
            setInvoices(response.invoices || [])
        } catch (error) {
            console.error('Failed to fetch invoices:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchStats = async () => {
        try {
            const response = await invoicesAPI.getRevenueStats()
            if (response.success) {
                setStats(response.stats)
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        }
    }

    const filtered = invoices.filter(inv =>
        (inv.Client && inv.Client.name.toLowerCase().includes(search.toLowerCase())) ||
        (inv.Project && inv.Project.name.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <>
            <div className="m-page-header">
                <div><h2>Payments & Billing</h2><p>Track invoices and revenue</p></div>
            </div>

            {/* Revenue Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
                <div className="m-card" style={{ padding: 16 }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--m-muted)', marginBottom: 4 }}>Total Revenue</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--m-text)' }}>₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
                </div>
                <div className="m-card" style={{ padding: 16 }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--m-muted)', marginBottom: 4 }}>Collected</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22c55e' }}>₹{stats.collectedRevenue.toLocaleString('en-IN')}</p>
                </div>
                <div className="m-card" style={{ padding: 16 }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--m-muted)', marginBottom: 4 }}>Outstanding</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f97316' }}>₹{stats.outstandingRevenue.toLocaleString('en-IN')}</p>
                </div>
            </div>

            {/* Search */}
            <div className="m-card" style={{ marginBottom: 16, padding: '12px 16px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--m-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search invoices..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%', paddingLeft: 36, height: 36, border: '1px solid var(--m-border)', borderRadius: 6, background: 'var(--m-bg)', color: 'var(--m-text)' }}
                    />
                </div>
            </div>

            {/* Invoices Table */}
            <div className="m-card">
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--m-muted)' }}>Loading invoices...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--m-muted)' }}>No invoices found</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="m-table">
                            <thead>
                                <tr>
                                    <th>Client</th>
                                    <th>Project</th>
                                    <th>Amount</th>
                                    <th>Paid</th>
                                    <th>Balance</th>
                                    <th>Status</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(inv => {
                                    const balance = inv.amount - inv.paid
                                    return (
                                        <tr key={inv.id}>
                                            <td style={{ fontWeight: 600 }}>{inv.Client ? inv.Client.name : '—'}</td>
                                            <td>{inv.Project ? inv.Project.name : '—'}</td>
                                            <td>₹{inv.amount.toLocaleString('en-IN')}</td>
                                            <td>₹{inv.paid.toLocaleString('en-IN')}</td>
                                            <td style={{ color: balance > 0 ? '#f97316' : '#22c55e' }}>₹{balance.toLocaleString('en-IN')}</td>
                                            <td><StatusBadge s={inv.status} /></td>
                                            <td>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '—'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default ManagerPayments
