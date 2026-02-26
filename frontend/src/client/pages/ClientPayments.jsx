import { Receipt, TrendingUp, AlertCircle, Download } from 'lucide-react'
import { clientInvoices } from '../clientMockData'

const ClientPayments = () => {
    const totalAmount = clientInvoices.reduce((s, i) => s + i.amount, 0)
    const totalPaid = clientInvoices.reduce((s, i) => s + i.paid, 0)
    const totalDue = totalAmount - totalPaid

    const stats = [
        { label: 'Total Cost', value: `₹${totalAmount.toLocaleString()}`, icon: Receipt, color: 'rgba(99, 102, 241, 0.12)', iconColor: '#6366f1' },
        { label: 'Paid', value: `₹${totalPaid.toLocaleString()}`, icon: TrendingUp, color: 'rgba(34, 197, 94, 0.12)', iconColor: '#22c55e' },
        { label: 'Due', value: `₹${totalDue.toLocaleString()}`, icon: AlertCircle, color: 'rgba(249, 115, 22, 0.12)', iconColor: '#f97316' },
    ]

    return (
        <>
            {/* Summary cards */}
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

            {/* Invoice table */}
            <div className="client-card">
                <h3 className="c-section-title"><Receipt size={16} /> Invoices</h3>
                <div className="client-table-wrap">
                    <table className="client-table">
                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Project</th>
                                <th>Amount</th>
                                <th>Paid</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Mode</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientInvoices.map(inv => (
                                <tr key={inv.id}>
                                    <td><strong>{inv.invoiceId}</strong></td>
                                    <td style={{ fontSize: '0.8rem' }}>{inv.project}</td>
                                    <td style={{ fontWeight: 700 }}>₹{inv.amount.toLocaleString()}</td>
                                    <td style={{ color: 'var(--c-primary)', fontWeight: 600 }}>₹{inv.paid.toLocaleString()}</td>
                                    <td style={{ color: 'var(--c-muted)', fontSize: '0.8rem' }}>{inv.dueDate}</td>
                                    <td>
                                        <span className={`c-badge ${inv.status === 'Paid' ? 'c-badge-green' : inv.status === 'Partial' ? 'c-badge-orange' : 'c-badge-red'}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--c-muted)', fontSize: '0.78rem' }}>{inv.mode}</td>
                                    <td>
                                        <button className="c-btn-icon" title="Download PDF">
                                            <Download size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ClientPayments
