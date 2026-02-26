import { mockInvoices, mockClients } from '../managerMockData'

const ManagerPayments = () => {
    const totalAmount = mockInvoices.reduce((s, i) => s + i.amount, 0)
    const totalPaid = mockInvoices.reduce((s, i) => s + i.paid, 0)
    const totalDue = totalAmount - totalPaid

    return (
        <>
            <div className="m-page-header">
                <div><h2>Payments & Billing</h2><p>{mockInvoices.length} invoices</p></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div className="m-stat-card" style={{ padding: '1rem' }}>
                    <div><div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--m-text)' }}>₹{totalAmount.toLocaleString()}</div><div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>Total Revenue</div></div>
                </div>
                <div className="m-stat-card" style={{ padding: '1rem' }}>
                    <div><div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#22c55e' }}>₹{totalPaid.toLocaleString()}</div><div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>Collected</div></div>
                </div>
                <div className="m-stat-card" style={{ padding: '1rem' }}>
                    <div><div style={{ fontSize: '1.3rem', fontWeight: 800, color: totalDue > 0 ? '#f97316' : '#22c55e' }}>₹{totalDue.toLocaleString()}</div><div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>Pending</div></div>
                </div>
            </div>

            <div className="m-card">
                <div className="m-table-wrap">
                    <table className="m-table">
                        <thead><tr><th>Invoice</th><th>Client</th><th>Project</th><th>Amount</th><th>Paid</th><th>Due</th><th>Status</th><th>Mode</th><th>Date</th></tr></thead>
                        <tbody>
                            {mockInvoices.map(inv => (
                                <tr key={inv.id}>
                                    <td><strong>{inv.invoiceId}</strong></td>
                                    <td style={{ fontWeight: 600 }}>{inv.client}</td>
                                    <td style={{ fontSize: '0.82rem', color: 'var(--m-muted2)' }}>{inv.project}</td>
                                    <td style={{ fontWeight: 700 }}>₹{inv.amount.toLocaleString()}</td>
                                    <td style={{ color: '#22c55e', fontWeight: 600 }}>₹{inv.paid.toLocaleString()}</td>
                                    <td style={{ color: (inv.amount - inv.paid) > 0 ? '#f97316' : 'var(--m-muted)', fontWeight: 600 }}>
                                        {(inv.amount - inv.paid) > 0 ? `₹${(inv.amount - inv.paid).toLocaleString()}` : '—'}
                                    </td>
                                    <td><span className={`m-badge ${inv.status === 'Paid' ? 'm-badge-green' : inv.status === 'Partial' ? 'm-badge-yellow' : 'm-badge-red'}`}>{inv.status}</span></td>
                                    <td style={{ color: 'var(--m-muted)', fontSize: '0.8rem' }}>{inv.mode}</td>
                                    <td style={{ color: 'var(--m-muted)', fontSize: '0.8rem' }}>{inv.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ManagerPayments
