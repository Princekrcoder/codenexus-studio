import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import { invoicesAPI } from '../../services/api'

const ClientPayments = () => {
    const [loading, setLoading] = useState(true)
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        fetchInvoices()
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

    if (loading) {
        return (
            <div className="c-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--c-muted)' }}>Loading payments...</p>
            </div>
        )
    }

    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0)
    const paidAmount = invoices.reduce((sum, inv) => sum + inv.paid, 0)
    const pendingAmount = totalAmount - paidAmount

    return (
        <>
            {/* Payment Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div className="c-card" style={{ padding: 16 }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: 4 }}>Total Amount</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--c-text)' }}>₹{totalAmount.toLocaleString('en-IN')}</p>
                </div>
                <div className="c-card" style={{ padding: 16 }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: 4 }}>Paid</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#22c55e' }}>₹{paidAmount.toLocaleString('en-IN')}</p>
                </div>
                <div className="c-card" style={{ padding: 16 }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: 4 }}>Pending</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f97316' }}>₹{pendingAmount.toLocaleString('en-IN')}</p>
                </div>
            </div>

            {/* Invoices List */}
            <div className="c-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 16 }}>Payment History</h3>
                {invoices.length === 0 ? (
                    <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }}>No invoices yet</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', fontSize: '0.85rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--c-border)' }}>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Project</th>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Amount</th>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Paid</th>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Balance</th>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Status</th>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Due Date</th>
                                    <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--c-muted)', fontWeight: 600 }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map(inv => {
                                    const balance = inv.amount - inv.paid
                                    return (
                                        <tr key={inv.id} style={{ borderBottom: '1px solid var(--c-border)' }}>
                                            <td style={{ padding: '12px 0', color: 'var(--c-text)', fontWeight: 600 }}>{inv.Project ? inv.Project.name : '—'}</td>
                                            <td style={{ padding: '12px 0', color: 'var(--c-text)' }}>₹{inv.amount.toLocaleString('en-IN')}</td>
                                            <td style={{ padding: '12px 0', color: '#22c55e', fontWeight: 600 }}>₹{inv.paid.toLocaleString('en-IN')}</td>
                                            <td style={{ padding: '12px 0', color: balance > 0 ? '#f97316' : '#22c55e', fontWeight: 600 }}>₹{balance.toLocaleString('en-IN')}</td>
                                            <td style={{ padding: '12px 0' }}>
                                                <span className={`badge ${inv.status === 'Paid' ? 'badge-green' : inv.status === 'Partial' ? 'badge-yellow' : 'badge-red'}`}>{inv.status}</span>
                                            </td>
                                            <td style={{ padding: '12px 0', color: 'var(--c-muted)' }}>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '—'}</td>
                                            <td style={{ padding: '12px 0' }}>
                                                <button 
                                                    className="client-icon-btn" 
                                                    title="Download Invoice"
                                                    style={{ padding: '6px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}
                                                >
                                                    <Download size={14} /> Download
                                                </button>
                                            </td>
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

export default ClientPayments
