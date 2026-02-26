import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus, Eye, Pencil, Ban, Search, Users, X } from 'lucide-react'
import { mockClients, CLIENT_STATUSES, mockInvoices } from '../managerMockData'

const TYPES = ['All', 'Startup', 'Business', 'Personal']
const STATUS_ALL = ['All', ...CLIENT_STATUSES]

const StatusBadge = ({ s }) => {
    const m = { Lead: 'm-badge-cyan', Active: 'm-badge-green', 'On Hold': 'm-badge-yellow', Completed: 'm-badge-blue', Lost: 'm-badge-red' }
    return <span className={`m-badge ${m[s] || 'm-badge-gray'}`}>{s}</span>
}

const ManagerClients = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const initialStatus = searchParams.get('status') || 'All'
    const [clients, setClients] = useState(mockClients)
    const [statusFilter, setStatusFilter] = useState(initialStatus)
    const [typeFilter, setTypeFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [modal, setModal] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'Startup', company: '', address: '', gst: '', website: '', industry: '', status: 'Lead', servicePreference: 'Website' })

    // Sync filter from URL query param
    useEffect(() => {
        const s = searchParams.get('status') || 'All'
        setStatusFilter(s)
    }, [searchParams])

    const openAdd = () => { setEditing(null); setForm({ name: '', email: '', phone: '', type: 'Startup', company: '', address: '', gst: '', website: '', industry: '', status: 'Lead', servicePreference: 'Website' }); setModal(true) }
    const openEdit = (c) => { setEditing(c.id); setForm({ name: c.name, email: c.email, phone: c.phone, type: c.type, company: c.company || '', address: c.address || '', gst: c.gst || '', website: c.website || '', industry: c.industry || '', status: c.status || 'Lead', servicePreference: c.servicePreference || 'Website' }); setModal(true) }
    const save = () => {
        if (!form.name.trim() || !form.email.trim()) return
        if (editing) setClients(cl => cl.map(c => c.id === editing ? { ...c, ...form } : c))
        else setClients(cl => [...cl, { id: Date.now(), projects: 0, joined: new Date().toISOString().split('T')[0], payment: 'Unpaid', ...form }])
        setModal(false)
    }
    const disable = (id) => { if (confirm('Disable this client?')) setClients(cl => cl.map(c => c.id === id ? { ...c, status: 'Lost' } : c)) }

    const filtered = clients.filter(c => {
        const mS = statusFilter === 'All' || c.status === statusFilter
        const mT = typeFilter === 'All' || c.type === typeFilter
        const mQ = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || (c.company || '').toLowerCase().includes(search.toLowerCase())
        return mS && mT && mQ
    })

    const getDue = (name) => mockInvoices.filter(i => i.client === name).reduce((s, i) => s + (i.amount - i.paid), 0)

    return (
        <>
            <div className="m-page-header">
                <div><h2>Client Records</h2><p>{clients.length} total · {clients.filter(c => c.status === 'Active').length} active</p></div>
                <button className="m-btn-primary" onClick={openAdd}><Plus size={14} /> Add Client</button>
            </div>

            <div className="m-filter-bar">
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, color: 'var(--m-muted)' }} />
                    <input style={{ background: 'var(--m-surface2)', border: '1px solid var(--m-border)', borderRadius: 10, padding: '0.45rem 0.9rem 0.45rem 2rem', color: 'var(--m-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem', outline: 'none', width: 200 }}
                        placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {STATUS_ALL.map(s => <button key={s} className={`m-filter-tab ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>)}
                <span style={{ color: 'var(--m-muted)', fontSize: '0.72rem', fontWeight: 600, marginLeft: 6 }}>Type:</span>
                {TYPES.map(t => <button key={t} className={`m-filter-tab ${typeFilter === t ? 'active' : ''}`} onClick={() => setTypeFilter(t)}>{t}</button>)}
            </div>

            <div className="m-card">
                <div className="m-table-wrap">
                    <table className="m-table">
                        <thead><tr><th>Client</th><th>Company</th><th>Status</th><th>Service</th><th>Projects</th><th>Due</th><th>Since</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 && <tr><td colSpan={8}><div className="m-empty"><Users size={36} color="var(--m-muted)" style={{ marginBottom: 8 }} /><p>No clients found</p></div></td></tr>}
                            {filtered.map(c => {
                                const due = getDue(c.name)
                                return (
                                    <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/manager/clients/${c.id}`)}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div className="m-avatar">{c.name.slice(0, 2).toUpperCase()}</div>
                                                <div><strong>{c.name}</strong><div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>{c.email}</div></div>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: '0.8rem', color: 'var(--m-muted2)' }}>{c.company || '—'}</td>
                                        <td><StatusBadge s={c.status} /></td>
                                        <td><span className="m-badge m-badge-blue">{c.servicePreference}</span></td>
                                        <td><strong>{c.projects}</strong></td>
                                        <td style={{ fontWeight: 600, color: due > 0 ? '#f97316' : '#22c55e', fontSize: '0.82rem' }}>{due > 0 ? `₹${due.toLocaleString()}` : '—'}</td>
                                        <td style={{ color: 'var(--m-muted)', fontSize: '0.78rem' }}>{c.joined}</td>
                                        <td onClick={e => e.stopPropagation()}>
                                            <div className="m-action-btns">
                                                <button className="m-btn-icon" onClick={() => navigate(`/manager/clients/${c.id}`)} title="View"><Eye size={14} /></button>
                                                <button className="m-btn-icon" onClick={() => openEdit(c)} title="Edit"><Pencil size={14} /></button>
                                                <button className="m-btn-icon danger" onClick={() => disable(c.id)} title="Disable"><Ban size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }} onClick={e => e.target === e.currentTarget && setModal(false)}>
                    <div style={{ background: 'var(--m-surface)', border: '1px solid var(--m-border)', borderRadius: 16, width: '90%', maxWidth: 520, padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--m-text)' }}>{editing ? 'Edit Client' : 'Add New Client'}</h3>
                            <button className="m-btn-icon" onClick={() => setModal(false)}><X size={16} /></button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            {[
                                { label: 'Name *', key: 'name', ph: 'Client name', span: true },
                                { label: 'Company', key: 'company', ph: 'Company' },
                                { label: 'Email *', key: 'email', ph: 'email@example.com' },
                                { label: 'Phone', key: 'phone', ph: '+91 XXXXX' },
                                { label: 'Address', key: 'address', ph: 'City, State' },
                                { label: 'GST', key: 'gst', ph: 'GST number' },
                                { label: 'Website', key: 'website', ph: 'https://...' },
                                { label: 'Industry', key: 'industry', ph: 'Technology…' },
                            ].map(f => (
                                <div key={f.key} style={{ gridColumn: f.span ? '1 / -1' : undefined }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--m-muted)', marginBottom: 4 }}>{f.label}</label>
                                    <input placeholder={f.ph} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                        style={{ width: '100%', padding: '0.45rem 0.8rem', background: 'var(--m-surface2)', border: '1px solid var(--m-border)', borderRadius: 8, color: 'var(--m-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem', outline: 'none', boxSizing: 'border-box' }} />
                                </div>
                            ))}
                            {[
                                { label: 'Type', key: 'type', opts: ['Startup', 'Business', 'Personal'] },
                                { label: 'Status', key: 'status', opts: CLIENT_STATUSES },
                                { label: 'Service', key: 'servicePreference', opts: ['Website', 'Web App', 'SEO', 'Maintenance'] },
                            ].map(f => (
                                <div key={f.key}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--m-muted)', marginBottom: 4 }}>{f.label}</label>
                                    <select value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                        style={{ width: '100%', padding: '0.45rem 0.8rem', background: 'var(--m-surface2)', border: '1px solid var(--m-border)', borderRadius: 8, color: 'var(--m-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem', outline: 'none' }}>
                                        {f.opts.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                            <button className="m-btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                            <button className="m-btn-primary" onClick={save}>{editing ? 'Save' : 'Add Client'}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ManagerClients
