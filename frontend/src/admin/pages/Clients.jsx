import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash2, Plus, Eye, X, Users, Search, Ban } from 'lucide-react'
import { mockClients, CLIENT_STATUSES, mockProjects, mockInvoices } from '../mockData'

const TYPES = ['All', 'Startup', 'Business', 'Personal']
const PAYMENTS = ['All', 'Paid', 'Unpaid', 'Partial']
const STATUS_ALL = ['All', ...CLIENT_STATUSES]

const empty = { name: '', email: '', phone: '', type: 'Startup', payment: 'Unpaid', company: '', address: '', gst: '', website: '', industry: '', status: 'Lead', servicePreference: 'Website' }

const StatusBadge = ({ s }) => {
    const m = { Lead: 'badge-cyan', Active: 'badge-green', 'On Hold': 'badge-yellow', Completed: 'badge-blue', Lost: 'badge-red' }
    return <span className={`badge ${m[s] || 'badge-gray'}`}>{s}</span>
}
const TypeBadge = ({ t }) => {
    const m = { Startup: 'badge-cyan', Business: 'badge-blue', Personal: 'badge-purple' }
    return <span className={`badge ${m[t] || 'badge-gray'}`}>{t}</span>
}
const PayBadge = ({ p }) => {
    const m = { Paid: 'badge-green', Unpaid: 'badge-red', Partial: 'badge-yellow' }
    return <span className={`badge ${m[p] || 'badge-gray'}`}>{p}</span>
}

const Clients = () => {
    const navigate = useNavigate()
    const [clients, setClients] = useState(mockClients)
    const [statusFilter, setStatusFilter] = useState('All')
    const [typeFilter, setTypeFilter] = useState('All')
    const [payFilter, setPayFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [modal, setModal] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(empty)

    const openAdd = () => { setEditing(null); setForm(empty); setModal(true) }
    const openEdit = (c) => {
        setEditing(c.id)
        setForm({ name: c.name, email: c.email, phone: c.phone, type: c.type, payment: c.payment, company: c.company || '', address: c.address || '', gst: c.gst || '', website: c.website || '', industry: c.industry || '', status: c.status || 'Lead', servicePreference: c.servicePreference || 'Website' })
        setModal(true)
    }
    const save = () => {
        if (!form.name.trim() || !form.email.trim()) return
        if (editing) setClients(cl => cl.map(c => c.id === editing ? { ...c, ...form } : c))
        else setClients(cl => [...cl, { id: Date.now(), projects: 0, joined: new Date().toISOString().split('T')[0], ...form }])
        setModal(false)
    }
    const disable = (id) => {
        if (confirm('Disable this client?')) setClients(cl => cl.map(c => c.id === id ? { ...c, status: 'Lost' } : c))
    }

    const filtered = clients.filter(c => {
        const mS = statusFilter === 'All' || c.status === statusFilter
        const mT = typeFilter === 'All' || c.type === typeFilter
        const mP = payFilter === 'All' || c.payment === payFilter
        const mQ = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company || '').toLowerCase().includes(search.toLowerCase())
        return mS && mT && mP && mQ
    })

    // Compute stats per client
    const getClientProjects = (name) => mockProjects.filter(p => p.client === name)
    const getClientInvoices = (name) => mockInvoices.filter(i => i.client === name)
    const getClientDue = (name) => {
        const invoices = getClientInvoices(name)
        return invoices.reduce((s, i) => s + (i.amount - i.paid), 0)
    }

    return (
        <>
            <div className="admin-page-header">
                <div>
                    <h2>Client Manager</h2>
                    <p>{clients.length} clients · {clients.filter(c => c.status === 'Active').length} active</p>
                </div>
                <button className="btn-primary" onClick={openAdd}><Plus size={14} /> Add Client</button>
            </div>

            {/* Filters */}
            <div className="admin-filter-bar" style={{ flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, color: 'var(--admin-muted)' }} />
                    <input style={{ background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: 10, padding: '0.45rem 0.9rem 0.45rem 2rem', color: 'var(--admin-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem', outline: 'none', width: 200 }}
                        placeholder="Search clients…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                <span style={{ color: 'var(--admin-muted)', fontSize: '0.75rem', fontWeight: 600 }}>Status:</span>
                {STATUS_ALL.map(s => <button key={s} className={`filter-tab ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>)}

                <span style={{ color: 'var(--admin-muted)', fontSize: '0.75rem', fontWeight: 600, marginLeft: 8 }}>Type:</span>
                {TYPES.map(t => <button key={t} className={`filter-tab ${typeFilter === t ? 'active' : ''}`} onClick={() => setTypeFilter(t)}>{t}</button>)}

                <span style={{ color: 'var(--admin-muted)', fontSize: '0.75rem', fontWeight: 600, marginLeft: 8 }}>Pay:</span>
                {PAYMENTS.map(p => <button key={p} className={`filter-tab ${payFilter === p ? 'active' : ''}`} onClick={() => setPayFilter(p)}>{p}</button>)}
            </div>

            {/* Status stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
                {CLIENT_STATUSES.map(s => {
                    const count = clients.filter(c => c.status === s).length
                    const colors = { Lead: '#06b6d4', Active: '#22c55e', 'On Hold': '#eab308', Completed: '#6366f1', Lost: '#ef4444' }
                    return (
                        <div key={s} className="admin-stat-card" style={{ padding: '0.8rem 1rem', cursor: 'pointer', borderColor: statusFilter === s ? colors[s] : undefined }}
                            onClick={() => setStatusFilter(statusFilter === s ? 'All' : s)}>
                            <div>
                                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: colors[s] }}>{count}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)', fontWeight: 600 }}>{s}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Table */}
            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Company</th>
                                <th>Status</th>
                                <th>Service</th>
                                <th>Projects</th>
                                <th>Payment</th>
                                <th>Due</th>
                                <th>Since</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 && <tr><td colSpan={9}><div className="admin-empty"><Users size={40} strokeWidth={1.5} color="var(--admin-muted)" style={{ marginBottom: 10 }} /><p>No clients found</p></div></td></tr>}
                            {filtered.map(c => {
                                const due = getClientDue(c.name)
                                return (
                                    <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/clients/${c.id}`)}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div className="team-avatar">{c.name.slice(0, 2).toUpperCase()}</div>
                                                <div>
                                                    <strong>{c.name}</strong>
                                                    <div style={{ fontSize: '0.72rem', color: 'var(--admin-muted)' }}>{c.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: '0.8rem', color: 'var(--admin-muted2)' }}>{c.company || '—'}</td>
                                        <td><StatusBadge s={c.status} /></td>
                                        <td><span className="badge badge-blue">{c.servicePreference}</span></td>
                                        <td><strong>{c.projects}</strong></td>
                                        <td><PayBadge p={c.payment} /></td>
                                        <td style={{ fontWeight: 600, color: due > 0 ? 'var(--admin-orange)' : 'var(--admin-green)', fontSize: '0.82rem' }}>
                                            {due > 0 ? `₹${due.toLocaleString()}` : '—'}
                                        </td>
                                        <td style={{ color: 'var(--admin-muted)', fontSize: '0.78rem' }}>{c.joined}</td>
                                        <td onClick={e => e.stopPropagation()}>
                                            <div className="action-btns">
                                                <button className="btn-icon" onClick={() => navigate(`/admin/clients/${c.id}`)} title="View Profile"><Eye size={14} /></button>
                                                <button className="btn-icon" onClick={() => openEdit(c)} title="Edit"><Pencil size={14} /></button>
                                                <button className="btn-icon danger" onClick={() => disable(c.id)} title="Disable"><Ban size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {modal && (
                <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
                    <div className="admin-modal" style={{ maxWidth: 560 }}>
                        <div className="admin-modal-header">
                            <h3>{editing ? 'Edit Client' : 'Add New Client'}</h3>
                            <button className="btn-icon" onClick={() => setModal(false)}><X size={16} /></button>
                        </div>
                        <div className="admin-modal-body">
                            <div className="admin-form-grid">
                                <div className="admin-form-group full"><label>Full Name *</label><input placeholder="Client name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Company</label><input placeholder="Company name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Email *</label><input type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Phone</label><input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Address</label><input placeholder="City, State" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
                                <div className="admin-form-group"><label>GST Number</label><input placeholder="GST03XXXXX" value={form.gst} onChange={e => setForm({ ...form, gst: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Website URL</label><input placeholder="https://..." value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Industry</label><input placeholder="Technology, Retail…" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Client Type</label>
                                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Startup</option><option>Business</option><option>Personal</option></select>
                                </div>
                                <div className="admin-form-group"><label>Client Status</label>
                                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                        {CLIENT_STATUSES.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="admin-form-group"><label>Service Preference</label>
                                    <select value={form.servicePreference} onChange={e => setForm({ ...form, servicePreference: e.target.value })}>
                                        <option>Website</option><option>Web App</option><option>SEO</option><option>Maintenance</option>
                                    </select>
                                </div>
                                <div className="admin-form-group"><label>Payment Status</label>
                                    <select value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}><option>Paid</option><option>Unpaid</option><option>Partial</option></select>
                                </div>
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <button className="btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={save}>{editing ? 'Save Changes' : 'Add Client'}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Clients
