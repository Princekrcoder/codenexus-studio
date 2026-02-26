import { useState } from 'react'
import { Eye, CheckCircle, X, FileText, Download, CreditCard, Receipt, TrendingUp, AlertCircle, CheckCheck, XCircle, Clock } from 'lucide-react'
import { mockInvoices } from '../mockData'

const StatusBadge = ({ s }) => {
    const m = { Paid: 'badge-green', Unpaid: 'badge-red', Partial: 'badge-yellow' }
    return <span className={`badge ${m[s] || 'badge-gray'}`}>{s}</span>
}

const Payments = () => {
    const [invoices, setInvoices] = useState(mockInvoices)
    const [filter, setFilter] = useState('All')
    const [detail, setDetail] = useState(null)

    const markPaid = (id) => setInvoices(inv => inv.map(i => i.id === id ? { ...i, paid: i.amount, status: 'Paid' } : i))

    const filtered = invoices.filter(i => filter === 'All' || i.status === filter)

    const total = invoices.reduce((s, i) => s + i.amount, 0)
    const collected = invoices.reduce((s, i) => s + i.paid, 0)
    const outstanding = total - collected
    const paid2 = invoices.filter(i => i.status === 'Paid').length
    const unpaid = invoices.filter(i => i.status === 'Unpaid').length
    const partial = invoices.filter(i => i.status === 'Partial').length

    return (
        <>
            <div className="admin-page-header">
                <div><h2>Payments & Invoices</h2><p>{invoices.length} invoices total</p></div>
            </div>

            {/* Revenue cards */}
            <div className="revenue-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))' }}>
                {[
                    ['Total Invoiced', `₹${total.toLocaleString('en-IN')}`, 'var(--admin-text)', Receipt],
                    ['Revenue Collected', `₹${collected.toLocaleString('en-IN')}`, 'var(--admin-green)', TrendingUp],
                    ['Outstanding', `₹${outstanding.toLocaleString('en-IN')}`, 'var(--admin-red)', AlertCircle],
                    ['Paid', paid2, 'var(--admin-green)', CheckCheck],
                    ['Unpaid', unpaid, 'var(--admin-red)', XCircle],
                    ['Partial', partial, 'var(--admin-orange)', Clock],
                ].map(([label, val, color, Icon]) => (
                    <div className="revenue-card" key={label}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                            <Icon size={18} color={color} strokeWidth={1.8} />
                        </div>
                        <div className="revenue-amount" style={{ color }}>{val}</div>
                        <div className="revenue-label">{label}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="admin-filter-bar">
                {['All', 'Paid', 'Unpaid', 'Partial'].map(s => (
                    <button key={s} className={`filter-tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>
                ))}
            </div>

            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead><tr><th>Invoice ID</th><th>Client</th><th>Project</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Status</th><th>Mode</th><th>Date</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 && <tr><td colSpan={10}><div className="admin-empty"><CreditCard size={40} strokeWidth={1.5} color="var(--admin-muted)" style={{ marginBottom: 10 }} /><p>No invoices found</p></div></td></tr>}
                            {filtered.map(i => (
                                <tr key={i.id}>
                                    <td><span style={{ color: 'var(--admin-primary)', fontWeight: 600, fontSize: '0.85rem' }}>{i.invoiceId}</span></td>
                                    <td style={{ fontWeight: 600, fontSize: '0.875rem' }}>{i.client}</td>
                                    <td style={{ color: 'var(--admin-muted)', fontSize: '0.8rem' }}>{i.project}</td>
                                    <td><strong>₹{i.amount.toLocaleString('en-IN')}</strong></td>
                                    <td style={{ color: 'var(--admin-green)' }}>₹{i.paid.toLocaleString('en-IN')}</td>
                                    <td style={{ color: (i.amount - i.paid) > 0 ? 'var(--admin-red)' : 'var(--admin-green)' }}>₹{(i.amount - i.paid).toLocaleString('en-IN')}</td>
                                    <td><StatusBadge s={i.status} /></td>
                                    <td><span className="badge badge-gray">{i.mode || '—'}</span></td>
                                    <td style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}>{i.date}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button className="btn-icon" onClick={() => setDetail(i)} title="View"><Eye size={14} /></button>
                                            {i.status !== 'Paid' && <button className="btn-icon" onClick={() => markPaid(i.id)} title="Mark Paid" style={{ color: 'var(--admin-green)' }}><CheckCircle size={14} /></button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invoice detail modal */}
            {detail && (
                <div className="admin-modal-overlay" onClick={() => setDetail(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3><FileText size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />{detail.invoiceId}</h3>
                            <button className="btn-icon" onClick={() => setDetail(null)}><X size={16} /></button>
                        </div>
                        <div className="admin-modal-body">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {[['Client', detail.client], ['Project', detail.project], ['Amount', `₹${detail.amount.toLocaleString('en-IN')}`], ['Paid', `₹${detail.paid.toLocaleString('en-IN')}`], ['Balance', `₹${(detail.amount - detail.paid).toLocaleString('en-IN')}`], ['Status', detail.status], ['Mode', detail.mode || '—'], ['Date', detail.date]].map(([k, v]) => (
                                    <div key={k}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)', fontWeight: 600, marginBottom: 3 }}>{k}</div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--admin-text)', fontWeight: 600 }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <button className="btn-ghost" onClick={() => setDetail(null)}>Close</button>
                            <button className="btn-primary"><Download size={14} /> Export PDF</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Payments
