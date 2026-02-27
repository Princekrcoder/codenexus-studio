import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Building2, Globe, MapPin, FileText, FolderKanban, CreditCard } from 'lucide-react'
import { clientsAPI, projectsAPI, invoicesAPI } from '../../services/api'

const StatusBadge = ({ s }) => {
    const m = { Lead: 'badge-cyan', Active: 'badge-green', 'On Hold': 'badge-yellow', Completed: 'badge-blue', Lost: 'badge-red' }
    return <span className={`badge ${m[s] || 'badge-gray'}`}>{s}</span>
}

const ManagerClientDetail = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [client, setClient] = useState(null)
    const [projects, setProjects] = useState([])
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            fetchClientData()
        }
    }, [id])

    const fetchClientData = async () => {
        try {
            setLoading(true)
            const [clientRes, projectsRes, invoicesRes] = await Promise.all([
                clientsAPI.getById(id),
                projectsAPI.getAll({ clientId: id }),
                invoicesAPI.getAll({ clientId: id })
            ])
            
            setClient(clientRes.client)
            setProjects(projectsRes.projects || [])
            setInvoices(invoicesRes.invoices || [])
        } catch (error) {
            console.error('Failed to fetch client data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--m-muted)' }}>Loading client details...</p>
            </div>
        )
    }

    if (!client) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#ef4444' }}>Client not found</p>
            </div>
        )
    }

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0)
    const paidRevenue = invoices.reduce((sum, inv) => sum + inv.paid, 0)

    return (
        <>
            <button className="m-btn-ghost" onClick={() => navigate('/manager/clients')} style={{ marginBottom: 12, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                <ArrowLeft size={15} /> Back to Clients
            </button>

            {/* Client Header */}
            <div className="m-card" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--m-text)', marginBottom: 8 }}>{client.name}</h2>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                            <StatusBadge s={client.status} />
                            <span className="badge badge-blue">{client.type}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.85rem', color: 'var(--m-muted)' }}>
                            {client.email && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Mail size={14} />
                                    <span>{client.email}</span>
                                </div>
                            )}
                            {client.phone && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Phone size={14} />
                                    <span>{client.phone}</span>
                                </div>
                            )}
                            {client.company && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Building2 size={14} />
                                    <span>{client.company}</span>
                                </div>
                            )}
                            {client.website && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Globe size={14} />
                                    <a href={client.website} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1' }}>{client.website}</a>
                                </div>
                            )}
                            {client.address && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <MapPin size={14} />
                                    <span>{client.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <div style={{ textAlign: 'center', padding: '12px 20px', background: 'var(--m-bg-secondary)', borderRadius: 8 }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--m-text)' }}>{projects.length}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Projects</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '12px 20px', background: 'var(--m-bg-secondary)', borderRadius: 8 }}>
                            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: '#22c55e' }}>₹{paidRevenue.toLocaleString('en-IN')}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>Revenue</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects */}
            <div className="m-card" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <FolderKanban size={18} color="var(--m-text)" />
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--m-text)' }}>Projects</h3>
                </div>
                {projects.length === 0 ? (
                    <p style={{ color: 'var(--m-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }}>No projects yet</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {projects.map(p => (
                            <div key={p.id} style={{ padding: 12, background: 'var(--m-bg-secondary)', borderRadius: 6 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                                    <div>
                                        <p style={{ fontWeight: 600, color: 'var(--m-text)', marginBottom: 4 }}>{p.name}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--m-muted)' }}>{p.service}</p>
                                    </div>
                                    <span className={`badge ${p.status === 'Delivered' ? 'badge-green' : p.status === 'In Progress' ? 'badge-blue' : 'badge-yellow'}`}>{p.status}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ flex: 1, height: 6, background: 'var(--m-border)', borderRadius: 3, overflow: 'hidden' }}>
                                        <div style={{ width: `${p.progress}%`, height: '100%', background: '#6366f1' }} />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--m-muted)', minWidth: 35 }}>{p.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Invoices */}
            <div className="m-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <CreditCard size={18} color="var(--m-text)" />
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--m-text)' }}>Invoices</h3>
                </div>
                {invoices.length === 0 ? (
                    <p style={{ color: 'var(--m-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }}>No invoices yet</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="m-table">
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Amount</th>
                                    <th>Paid</th>
                                    <th>Balance</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map(inv => {
                                    const balance = inv.amount - inv.paid
                                    return (
                                        <tr key={inv.id}>
                                            <td>{inv.Project ? inv.Project.name : '—'}</td>
                                            <td>₹{inv.amount.toLocaleString('en-IN')}</td>
                                            <td>₹{inv.paid.toLocaleString('en-IN')}</td>
                                            <td style={{ color: balance > 0 ? '#f97316' : '#22c55e' }}>₹{balance.toLocaleString('en-IN')}</td>
                                            <td><span className={`badge ${inv.status === 'Paid' ? 'badge-green' : inv.status === 'Partial' ? 'badge-yellow' : 'badge-red'}`}>{inv.status}</span></td>
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

export default ManagerClientDetail
