import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft, Building2, Mail, Phone, MapPin, Globe2, Hash, CalendarDays,
    FolderKanban, CreditCard, MessageSquare, StickyNote, Plus, PhoneCall,
    MessageCircle, Send, Clock, Lock, User
} from 'lucide-react'
import { mockClients, mockProjects, mockInvoices, mockCommunications } from '../mockData'

const TABS = [
    { key: 'overview', label: 'Overview', Icon: User },
    { key: 'projects', label: 'Projects', Icon: FolderKanban },
    { key: 'payments', label: 'Payments', Icon: CreditCard },
    { key: 'communication', label: 'Communication', Icon: MessageSquare },
]

const StatusBadge = ({ s }) => {
    const m = { Lead: 'badge-cyan', Active: 'badge-green', 'On Hold': 'badge-yellow', Completed: 'badge-blue', Lost: 'badge-red' }
    return <span className={`badge ${m[s] || 'badge-gray'}`}>{s}</span>
}

const CommIcon = ({ type }) => {
    const icons = { Call: PhoneCall, WhatsApp: MessageCircle, Email: Send, Note: StickyNote }
    const colors = { Call: '#22c55e', WhatsApp: '#25d366', Email: '#6366f1', Note: '#f97316' }
    const I = icons[type] || MessageSquare
    return (
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${colors[type] || '#64748b'}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <I size={16} color={colors[type] || '#64748b'} />
        </div>
    )
}

const InfoRow = ({ icon: I, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--admin-border)' }}>
        <I size={15} color="var(--admin-muted)" />
        <span style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', minWidth: 90 }}>{label}</span>
        <span style={{ fontSize: '0.84rem', color: 'var(--admin-text)', fontWeight: 500 }}>{value || '—'}</span>
    </div>
)

const ClientDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [tab, setTab] = useState('overview')
    const [comms, setComms] = useState(mockCommunications)
    const [newNote, setNewNote] = useState({ type: 'Note', message: '', internal: true })

    const client = mockClients.find(c => c.id === Number(id))
    if (!client) return <div className="admin-empty"><p>Client not found</p><button className="btn-primary" onClick={() => navigate('/admin/clients')}>← Back to Clients</button></div>

    const projects = mockProjects.filter(p => p.client === client.name)
    const invoices = mockInvoices.filter(i => i.client === client.name)
    const clientComms = comms.filter(c => c.clientId === client.id).sort((a, b) => new Date(b.date) - new Date(a.date))

    const totalAmount = invoices.reduce((s, i) => s + i.amount, 0)
    const totalPaid = invoices.reduce((s, i) => s + i.paid, 0)
    const totalDue = totalAmount - totalPaid

    const addNote = () => {
        if (!newNote.message.trim()) return
        setComms(prev => [...prev, { id: Date.now(), clientId: client.id, type: newNote.type, message: newNote.message, date: new Date().toISOString().split('T')[0], by: 'Admin', internal: newNote.internal }])
        setNewNote({ type: 'Note', message: '', internal: true })
    }

    return (
        <>
            {/* Back + Header */}
            <div style={{ marginBottom: 20 }}>
                <button className="btn-ghost" onClick={() => navigate('/admin/clients')} style={{ marginBottom: 12, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <ArrowLeft size={15} /> Back to Clients
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div className="team-avatar" style={{ width: 54, height: 54, fontSize: '1.1rem', borderRadius: 16 }}>{client.name.slice(0, 2).toUpperCase()}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                            <h2 style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--admin-text)' }}>{client.name}</h2>
                            <StatusBadge s={client.status} />
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--admin-muted)', marginTop: 2 }}>{client.company || '—'} · {client.industry || '—'} · Client since {client.joined}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="admin-filter-bar" style={{ marginBottom: 20 }}>
                {TABS.map(t => (
                    <button key={t.key} className={`filter-tab ${tab === t.key ? 'active' : ''}`}
                        onClick={() => setTab(t.key)} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <t.Icon size={14} /> {t.label}
                    </button>
                ))}
            </div>

            {/* ─── OVERVIEW TAB ─── */}
            {tab === 'overview' && (
                <>
                    {/* Stat cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
                        <div className="admin-stat-card" style={{ padding: '1rem' }}>
                            <div className="admin-stat-icon" style={{ background: 'rgba(99, 102, 241, 0.12)' }}><FolderKanban size={18} color="#6366f1" /></div>
                            <div><div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--admin-text)' }}>{projects.length}</div><div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)' }}>Total Projects</div></div>
                        </div>
                        <div className="admin-stat-card" style={{ padding: '1rem' }}>
                            <div className="admin-stat-icon" style={{ background: 'rgba(34, 197, 94, 0.12)' }}><CreditCard size={18} color="#22c55e" /></div>
                            <div><div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#22c55e' }}>₹{totalPaid.toLocaleString()}</div><div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)' }}>Total Paid</div></div>
                        </div>
                        <div className="admin-stat-card" style={{ padding: '1rem' }}>
                            <div className="admin-stat-icon" style={{ background: 'rgba(249, 115, 22, 0.12)' }}><CreditCard size={18} color="#f97316" /></div>
                            <div><div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f97316' }}>₹{totalDue.toLocaleString()}</div><div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)' }}>Due Amount</div></div>
                        </div>
                        <div className="admin-stat-card" style={{ padding: '1rem' }}>
                            <div className="admin-stat-icon" style={{ background: 'rgba(6, 182, 212, 0.12)' }}><MessageSquare size={18} color="#06b6d4" /></div>
                            <div><div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--admin-text)' }}>{clientComms.length}</div><div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)' }}>Communications</div></div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
                        {/* Basic info */}
                        <div className="admin-card" style={{ padding: '1.2rem' }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><User size={15} /> Basic Information</h3>
                            <InfoRow icon={User} label="Name" value={client.name} />
                            <InfoRow icon={Mail} label="Email" value={client.email} />
                            <InfoRow icon={Phone} label="Phone" value={client.phone} />
                            <InfoRow icon={MapPin} label="Address" value={client.address} />
                            <InfoRow icon={CalendarDays} label="Since" value={client.joined} />
                        </div>
                        {/* Business info */}
                        <div className="admin-card" style={{ padding: '1.2rem' }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Building2 size={15} /> Business Information</h3>
                            <InfoRow icon={Building2} label="Company" value={client.company} />
                            <InfoRow icon={Globe2} label="Website" value={client.website} />
                            <InfoRow icon={Hash} label="GST" value={client.gst} />
                            <InfoRow icon={FolderKanban} label="Industry" value={client.industry} />
                            <InfoRow icon={CreditCard} label="Service" value={client.servicePreference} />
                        </div>
                    </div>
                </>
            )}

            {/* ─── PROJECTS TAB ─── */}
            {tab === 'projects' && (
                <div>
                    {projects.length === 0 && <div className="admin-empty"><p>No projects linked to this client</p></div>}
                    {projects.map(p => (
                        <div key={p.id} className="admin-card" style={{ padding: '1.1rem', marginBottom: 10 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                                <div>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--admin-text)' }}>{p.name}</h4>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', marginTop: 2 }}>{p.service} · Assigned: {p.dev}</p>
                                </div>
                                <span className={`badge ${p.status === 'Delivered' ? 'badge-green' : p.status === 'In Progress' ? 'badge-cyan' : 'badge-yellow'}`}>{p.status}</span>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 5 }}>
                                    <span style={{ color: 'var(--admin-muted)' }}>Progress</span>
                                    <span style={{ color: 'var(--admin-primary)', fontWeight: 700 }}>{p.progress}%</span>
                                </div>
                                <div style={{ width: '100%', height: 8, borderRadius: 10, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                    <div style={{ width: `${p.progress}%`, height: '100%', borderRadius: 10, background: 'linear-gradient(90deg, var(--admin-primary), var(--admin-accent))', transition: 'width 0.4s' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: '0.75rem' }}>
                                <span style={{ color: 'var(--admin-muted)' }}>Deadline: <strong style={{ color: 'var(--admin-text)' }}>{p.deadline}</strong></span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ─── PAYMENTS TAB ─── */}
            {tab === 'payments' && (
                <>
                    {/* Summary */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
                        <div className="admin-stat-card" style={{ padding: '1rem' }}>
                            <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--admin-text)' }}>₹{totalAmount.toLocaleString()}</div><div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)' }}>Total Contract</div></div>
                        </div>
                        <div className="admin-stat-card" style={{ padding: '1rem' }}>
                            <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#22c55e' }}>₹{totalPaid.toLocaleString()}</div><div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)' }}>Paid Amount</div></div>
                        </div>
                        <div className="admin-stat-card" style={{ padding: '1rem' }}>
                            <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: totalDue > 0 ? '#f97316' : '#22c55e' }}>₹{totalDue.toLocaleString()}</div><div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)' }}>Due Amount</div></div>
                        </div>
                    </div>

                    {/* Invoice table */}
                    <div className="admin-card">
                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                    <tr><th>Invoice</th><th>Project</th><th>Amount</th><th>Paid</th><th>Status</th><th>Mode</th><th>Date</th></tr>
                                </thead>
                                <tbody>
                                    {invoices.length === 0 && <tr><td colSpan={7}><div className="admin-empty"><p>No invoices</p></div></td></tr>}
                                    {invoices.map(inv => (
                                        <tr key={inv.id}>
                                            <td><strong>{inv.invoiceId}</strong></td>
                                            <td style={{ fontSize: '0.82rem' }}>{inv.project}</td>
                                            <td style={{ fontWeight: 700 }}>₹{inv.amount.toLocaleString()}</td>
                                            <td style={{ color: '#22c55e', fontWeight: 600 }}>₹{inv.paid.toLocaleString()}</td>
                                            <td><span className={`badge ${inv.status === 'Paid' ? 'badge-green' : inv.status === 'Partial' ? 'badge-yellow' : 'badge-red'}`}>{inv.status}</span></td>
                                            <td style={{ color: 'var(--admin-muted)', fontSize: '0.8rem' }}>{inv.mode}</td>
                                            <td style={{ color: 'var(--admin-muted)', fontSize: '0.8rem' }}>{inv.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* ─── COMMUNICATION TAB ─── */}
            {tab === 'communication' && (
                <>
                    {/* Add note */}
                    <div className="admin-card" style={{ padding: '1.1rem', marginBottom: 16 }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Plus size={15} /> Add Communication</h3>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                            <select value={newNote.type} onChange={e => setNewNote({ ...newNote, type: e.target.value })}
                                style={{ padding: '0.45rem 0.8rem', background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: 8, color: 'var(--admin-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem' }}>
                                <option>Call</option><option>WhatsApp</option><option>Email</option><option>Note</option>
                            </select>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--admin-muted2)', cursor: 'pointer' }}>
                                <input type="checkbox" checked={newNote.internal} onChange={e => setNewNote({ ...newNote, internal: e.target.checked })} style={{ accentColor: 'var(--admin-primary)' }} />
                                <Lock size={12} /> Internal Note
                            </label>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input placeholder="Add a note or log a communication…" value={newNote.message}
                                onChange={e => setNewNote({ ...newNote, message: e.target.value })}
                                onKeyDown={e => e.key === 'Enter' && addNote()}
                                style={{ flex: 1, padding: '0.5rem 0.9rem', background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: 10, color: 'var(--admin-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem', outline: 'none' }} />
                            <button className="btn-primary" onClick={addNote} style={{ padding: '0.5rem 1rem' }}><Plus size={14} /> Add</button>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="admin-card" style={{ padding: '1.1rem' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--admin-text)', marginBottom: 16 }}>Communication History</h3>
                        {clientComms.length === 0 && <div className="admin-empty"><p>No communications logged</p></div>}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {clientComms.map(c => (
                                <div key={c.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--admin-border)' }}>
                                    <CommIcon type={c.type} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                                            <span className={`badge ${c.type === 'Call' ? 'badge-green' : c.type === 'WhatsApp' ? 'badge-green' : c.type === 'Email' ? 'badge-blue' : 'badge-yellow'}`} style={{ fontSize: '0.65rem' }}>{c.type}</span>
                                            {c.internal && <span className="badge badge-gray" style={{ fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: 3 }}><Lock size={9} /> Internal</span>}
                                            {c.followUp && <span className="badge badge-cyan" style={{ fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={9} /> Follow-up: {c.followUp}</span>}
                                        </div>
                                        <p style={{ fontSize: '0.84rem', color: 'var(--admin-text)', lineHeight: 1.45 }}>{c.message}</p>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)', marginTop: 3 }}>{c.by} · {c.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ClientDetail
