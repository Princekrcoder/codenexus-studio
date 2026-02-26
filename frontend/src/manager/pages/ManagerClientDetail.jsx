import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft, Building2, Mail, Phone, MapPin, Globe2, Hash, CalendarDays,
    FolderKanban, CreditCard, MessageSquare, User, Plus,
    PhoneCall, MessageCircle, Send, StickyNote, Clock, Lock
} from 'lucide-react'
import { mockClients, mockProjects, mockInvoices, mockCommunications } from '../managerMockData'

const TABS = [
    { key: 'overview', label: 'Overview', Icon: User },
    { key: 'projects', label: 'Projects', Icon: FolderKanban },
    { key: 'payments', label: 'Payments', Icon: CreditCard },
    { key: 'communication', label: 'Communication', Icon: MessageSquare },
]

const StatusBadge = ({ s }) => {
    const m = { Lead: 'm-badge-cyan', Active: 'm-badge-green', 'On Hold': 'm-badge-yellow', Completed: 'm-badge-blue', Lost: 'm-badge-red' }
    return <span className={`m-badge ${m[s] || 'm-badge-gray'}`}>{s}</span>
}

const InfoRow = ({ icon: I, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--m-border)' }}>
        <I size={15} color="var(--m-muted)" />
        <span style={{ fontSize: '0.78rem', color: 'var(--m-muted)', minWidth: 90 }}>{label}</span>
        <span style={{ fontSize: '0.84rem', color: 'var(--m-text)', fontWeight: 500 }}>{value || '—'}</span>
    </div>
)

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

const ManagerClientDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [tab, setTab] = useState('overview')
    const [comms, setComms] = useState(mockCommunications)
    const [newNote, setNewNote] = useState({ type: 'Note', message: '', internal: true })

    const client = mockClients.find(c => c.id === Number(id))
    if (!client) return <div className="m-empty"><p>Client not found</p><button className="m-btn-primary" onClick={() => navigate('/manager/clients')}>← Back</button></div>

    const projects = mockProjects.filter(p => p.client === client.name)
    const invoices = mockInvoices.filter(i => i.client === client.name)
    const clientComms = comms.filter(c => c.clientId === client.id).sort((a, b) => new Date(b.date) - new Date(a.date))

    const totalAmount = invoices.reduce((s, i) => s + i.amount, 0)
    const totalPaid = invoices.reduce((s, i) => s + i.paid, 0)
    const totalDue = totalAmount - totalPaid

    const addNote = () => {
        if (!newNote.message.trim()) return
        setComms(prev => [...prev, { id: Date.now(), clientId: client.id, type: newNote.type, message: newNote.message, date: new Date().toISOString().split('T')[0], by: 'Manager', internal: newNote.internal }])
        setNewNote({ type: 'Note', message: '', internal: true })
    }

    return (
        <>
            <div style={{ marginBottom: 20 }}>
                <button className="m-btn-ghost" onClick={() => navigate('/manager/clients')} style={{ marginBottom: 12, fontSize: '0.82rem' }}>
                    <ArrowLeft size={15} /> Back to Clients
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div className="m-avatar" style={{ width: 54, height: 54, fontSize: '1.1rem', borderRadius: 16 }}>{client.name.slice(0, 2).toUpperCase()}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                            <h2 style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--m-text)' }}>{client.name}</h2>
                            <StatusBadge s={client.status} />
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--m-muted)', marginTop: 2 }}>{client.company || '—'} · {client.industry || '—'} · Since {client.joined}</p>
                    </div>
                </div>
            </div>

            <div className="m-filter-bar" style={{ marginBottom: 20 }}>
                {TABS.map(t => (
                    <button key={t.key} className={`m-filter-tab ${tab === t.key ? 'active' : ''}`}
                        onClick={() => setTab(t.key)} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <t.Icon size={14} /> {t.label}
                    </button>
                ))}
            </div>

            {/* OVERVIEW */}
            {tab === 'overview' && (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
                        {[
                            { label: 'Projects', value: projects.length, color: '#6366f1', icon: FolderKanban },
                            { label: 'Paid', value: `₹${totalPaid.toLocaleString()}`, color: '#22c55e', icon: CreditCard },
                            { label: 'Due', value: `₹${totalDue.toLocaleString()}`, color: '#f97316', icon: CreditCard },
                            { label: 'Communications', value: clientComms.length, color: '#06b6d4', icon: MessageSquare },
                        ].map(s => (
                            <div key={s.label} className="m-stat-card" style={{ padding: '1rem' }}>
                                <div className="m-stat-icon" style={{ background: `${s.color}18` }}><s.icon size={18} color={s.color} /></div>
                                <div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: s.color === '#6366f1' || s.color === '#06b6d4' ? 'var(--m-text)' : s.color }}>{s.value}</div>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>{s.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
                        <div className="m-card">
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--m-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><User size={15} /> Basic Info</h3>
                            <InfoRow icon={User} label="Name" value={client.name} />
                            <InfoRow icon={Mail} label="Email" value={client.email} />
                            <InfoRow icon={Phone} label="Phone" value={client.phone} />
                            <InfoRow icon={MapPin} label="Address" value={client.address} />
                            <InfoRow icon={CalendarDays} label="Since" value={client.joined} />
                        </div>
                        <div className="m-card">
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--m-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Building2 size={15} /> Business Info</h3>
                            <InfoRow icon={Building2} label="Company" value={client.company} />
                            <InfoRow icon={Globe2} label="Website" value={client.website} />
                            <InfoRow icon={Hash} label="GST" value={client.gst} />
                            <InfoRow icon={FolderKanban} label="Industry" value={client.industry} />
                            <InfoRow icon={CreditCard} label="Service" value={client.servicePreference} />
                        </div>
                    </div>
                </>
            )}

            {/* PROJECTS */}
            {tab === 'projects' && (
                <div>
                    {projects.length === 0 && <div className="m-empty"><p>No projects</p></div>}
                    {projects.map(p => (
                        <div key={p.id} className="m-card" style={{ marginBottom: 10 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                                <div>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--m-text)' }}>{p.name}</h4>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--m-muted)', marginTop: 2 }}>{p.service} · {p.dev}</p>
                                </div>
                                <span className={`m-badge ${p.status === 'Delivered' ? 'm-badge-green' : p.status === 'In Progress' ? 'm-badge-cyan' : 'm-badge-yellow'}`}>{p.status}</span>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                                    <span style={{ color: 'var(--m-muted)' }}>Progress</span>
                                    <span style={{ color: 'var(--m-primary)', fontWeight: 700 }}>{p.progress}%</span>
                                </div>
                                <div style={{ width: '100%', height: 7, borderRadius: 10, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                    <div style={{ width: `${p.progress}%`, height: '100%', borderRadius: 10, background: 'linear-gradient(90deg, #f59e0b, #f97316)', transition: 'width 0.4s' }} />
                                </div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)', marginTop: 8 }}>Deadline: <strong style={{ color: 'var(--m-text)' }}>{p.deadline}</strong></div>
                        </div>
                    ))}
                </div>
            )}

            {/* PAYMENTS */}
            {tab === 'payments' && (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
                        {[
                            { label: 'Total Contract', val: `₹${totalAmount.toLocaleString()}`, col: 'var(--m-text)' },
                            { label: 'Paid', val: `₹${totalPaid.toLocaleString()}`, col: '#22c55e' },
                            { label: 'Due', val: `₹${totalDue.toLocaleString()}`, col: totalDue > 0 ? '#f97316' : '#22c55e' },
                        ].map(s => (
                            <div key={s.label} className="m-stat-card" style={{ padding: '1rem' }}>
                                <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: s.col }}>{s.val}</div><div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>{s.label}</div></div>
                            </div>
                        ))}
                    </div>
                    <div className="m-card">
                        <div className="m-table-wrap">
                            <table className="m-table">
                                <thead><tr><th>Invoice</th><th>Project</th><th>Amount</th><th>Paid</th><th>Status</th><th>Mode</th><th>Date</th></tr></thead>
                                <tbody>
                                    {invoices.length === 0 && <tr><td colSpan={7}><div className="m-empty"><p>No invoices</p></div></td></tr>}
                                    {invoices.map(inv => (
                                        <tr key={inv.id}>
                                            <td><strong>{inv.invoiceId}</strong></td>
                                            <td style={{ fontSize: '0.82rem' }}>{inv.project}</td>
                                            <td style={{ fontWeight: 700 }}>₹{inv.amount.toLocaleString()}</td>
                                            <td style={{ color: '#22c55e', fontWeight: 600 }}>₹{inv.paid.toLocaleString()}</td>
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
            )}

            {/* COMMUNICATION */}
            {tab === 'communication' && (
                <>
                    <div className="m-card" style={{ marginBottom: 14 }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--m-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Plus size={15} /> Add Communication</h3>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                            <select value={newNote.type} onChange={e => setNewNote({ ...newNote, type: e.target.value })}
                                style={{ padding: '0.45rem 0.8rem', background: 'var(--m-surface2)', border: '1px solid var(--m-border)', borderRadius: 8, color: 'var(--m-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem' }}>
                                <option>Call</option><option>WhatsApp</option><option>Email</option><option>Note</option>
                            </select>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--m-muted2)', cursor: 'pointer' }}>
                                <input type="checkbox" checked={newNote.internal} onChange={e => setNewNote({ ...newNote, internal: e.target.checked })} style={{ accentColor: 'var(--m-primary)' }} />
                                <Lock size={12} /> Internal
                            </label>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <input placeholder="Add a note or log communication…" value={newNote.message}
                                onChange={e => setNewNote({ ...newNote, message: e.target.value })}
                                onKeyDown={e => e.key === 'Enter' && addNote()}
                                style={{ flex: 1, padding: '0.5rem 0.9rem', background: 'var(--m-surface2)', border: '1px solid var(--m-border)', borderRadius: 10, color: 'var(--m-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem', outline: 'none' }} />
                            <button className="m-btn-primary" onClick={addNote}><Plus size={14} /> Add</button>
                        </div>
                    </div>
                    <div className="m-card">
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--m-text)', marginBottom: 14 }}>History</h3>
                        {clientComms.length === 0 && <div className="m-empty"><p>No communications</p></div>}
                        {clientComms.map(c => (
                            <div key={c.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--m-border)' }}>
                                <CommIcon type={c.type} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                                        <span className={`m-badge ${c.type === 'Call' || c.type === 'WhatsApp' ? 'm-badge-green' : c.type === 'Email' ? 'm-badge-blue' : 'm-badge-yellow'}`} style={{ fontSize: '0.65rem' }}>{c.type}</span>
                                        {c.internal && <span className="m-badge m-badge-gray" style={{ fontSize: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: 3 }}><Lock size={9} /> Internal</span>}
                                        {c.followUp && <span className="m-badge m-badge-amber" style={{ fontSize: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: 3 }}><Clock size={9} /> {c.followUp}</span>}
                                    </div>
                                    <p style={{ fontSize: '0.84rem', color: 'var(--m-text)', lineHeight: 1.45 }}>{c.message}</p>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)', marginTop: 3 }}>{c.by} · {c.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default ManagerClientDetail
