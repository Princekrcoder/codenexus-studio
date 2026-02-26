import { useState } from 'react'
import { Pencil, Trash2, Plus, CheckCircle, FileText, X, Inbox, UserPlus, Eye, ThumbsUp } from 'lucide-react'
import { mockLeads } from '../mockData'

const STATUSES = ['All', 'New', 'In Review', 'Converted']
const SOURCES = ['All', 'Website', 'WhatsApp', 'Email']
const emptyForm = { name: '', email: '', phone: '', source: 'Website', service: 'Website', status: 'New', notes: '' }

const LeadBadge = ({ status }) => {
    const map = { 'New': 'badge-red', 'In Review': 'badge-yellow', 'Converted': 'badge-green' }
    return <span className={`badge ${map[status] || 'badge-gray'} `}>{status}</span>
}

const Leads = () => {
    const [leads, setLeads] = useState(mockLeads)
    const [filter, setFilter] = useState('All')
    const [sourceFilter, setSourceFilter] = useState('All')
    const [modal, setModal] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [noteModal, setNoteModal] = useState(null)

    const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true) }
    const openEdit = (l) => { setEditing(l.id); setForm({ name: l.name, email: l.email, phone: l.phone, source: l.source, service: l.service, status: l.status, notes: l.notes }); setModal(true) }
    const save = () => {
        if (!form.name.trim()) return
        if (editing) setLeads(ls => ls.map(l => l.id === editing ? { ...l, ...form } : l))
        else setLeads(ls => [...ls, { id: Date.now(), date: new Date().toISOString().split('T')[0], ...form }])
        setModal(false)
    }
    const remove = (id) => { if (confirm('Delete lead?')) setLeads(ls => ls.filter(l => l.id !== id)) }
    const convert = (id) => setLeads(ls => ls.map(l => l.id === id ? { ...l, status: 'Converted' } : l))

    const filtered = leads.filter(l => {
        const mSt = filter === 'All' || l.status === filter
        const mSrc = sourceFilter === 'All' || l.source === sourceFilter
        return mSt && mSrc
    })

    const counts = {
        new: leads.filter(l => l.status === 'New').length,
        review: leads.filter(l => l.status === 'In Review').length,
        converted: leads.filter(l => l.status === 'Converted').length
    }

    return (
        <>
            <div className="admin-page-header">
                <div><h2>Leads & Requests</h2><p>{leads.length} total leads</p></div>
                <button className="btn-primary" onClick={openAdd}><Plus size={14} /> Add Lead</button>
            </div>

            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                {[
                    ['New Leads', counts.new, UserPlus, '#ef4444', 'rgba(239,68,68,0.12)'],
                    ['In Review', counts.review, Eye, '#eab308', 'rgba(234,179,8,0.12)'],
                    ['Converted', counts.converted, ThumbsUp, '#22c55e', 'rgba(34,197,94,0.12)']
                ].map(([label, count, Icon, iconColor, iconBg]) => (
                    <div className="admin-stat-card" key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '1rem 1.25rem' }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={20} color={iconColor} strokeWidth={1.8} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--admin-text)', lineHeight: 1 }}>{count}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', fontWeight: 500, marginTop: 4 }}>{label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="admin-filter-bar">
                {STATUSES.map(s => <button key={s} className={`filter-tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>)}
                <span style={{ color: 'var(--admin-muted)', fontSize: '0.8rem', marginLeft: 4 }}>Source:</span>
                {SOURCES.map(s => <button key={s} className={`filter-tab ${sourceFilter === s ? 'active' : ''}`} onClick={() => setSourceFilter(s)}>{s}</button>)}
            </div>

            <div className="admin-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead><tr><th>Lead</th><th>Service</th><th>Source</th><th>Status</th><th>Notes</th><th>Date</th><th>Actions</th></tr></thead>
                        <tbody>
                            {filtered.length === 0 && <tr><td colSpan={7}><div className="admin-empty"><Inbox size={40} strokeWidth={1.5} color="var(--admin-muted)" style={{ marginBottom: 10 }} /><p>No leads found</p></div></td></tr>}
                            {filtered.map(l => (
                                <tr key={l.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div className="team-avatar" style={{ width: 30, height: 30, fontSize: '0.7rem' }}>{l.name.slice(0, 2).toUpperCase()}</div>
                                            <div><strong>{l.name}</strong><div style={{ fontSize: '0.75rem', color: 'var(--admin-muted)' }}>{l.email}</div></div>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-blue">{l.service}</span></td>
                                    <td><span className="badge badge-gray">{l.source}</span></td>
                                    <td><LeadBadge status={l.status} /></td>
                                    <td>
                                        <button className="btn-icon" onClick={() => setNoteModal(l)} title="View notes" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--admin-muted)' }}>
                                            <FileText size={13} /> {l.notes.length > 25 ? l.notes.slice(0, 25) + '…' : l.notes || '—'}
                                        </button>
                                    </td>
                                    <td style={{ color: 'var(--admin-muted)', fontSize: '0.8rem' }}>{l.date}</td>
                                    <td>
                                        <div className="action-btns">
                                            {l.status !== 'Converted' && <button className="btn-icon" onClick={() => convert(l.id)} title="Mark Converted" style={{ color: 'var(--admin-green)' }}><CheckCircle size={14} /></button>}
                                            <button className="btn-icon" onClick={() => openEdit(l)} title="Edit"><Pencil size={14} /></button>
                                            <button className="btn-icon danger" onClick={() => remove(l.id)} title="Delete"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Note modal */}
            {noteModal && (
                <div className="admin-modal-overlay" onClick={() => setNoteModal(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <div className="admin-modal-header"><h3>Notes — {noteModal.name}</h3><button className="btn-icon" onClick={() => setNoteModal(null)}><X size={16} /></button></div>
                        <div className="admin-modal-body"><p style={{ color: 'var(--admin-muted)', lineHeight: 1.7 }}>{noteModal.notes || 'No notes.'}</p></div>
                    </div>
                </div>
            )}

            {/* Add/Edit modal */}
            {modal && (
                <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
                    <div className="admin-modal">
                        <div className="admin-modal-header"><h3>{editing ? 'Edit Lead' : 'Add Lead'}</h3><button className="btn-icon" onClick={() => setModal(false)}><X size={16} /></button></div>
                        <div className="admin-modal-body">
                            <div className="admin-form-grid">
                                <div className="admin-form-group full"><label>Name *</label><input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Email</label><input type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Phone</label><input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Source</label><select value={form.source} onChange={e => setForm({ ...form, source: e.target.value })}><option>Website</option><option>WhatsApp</option><option>Email</option></select></div>
                                <div className="admin-form-group"><label>Service</label><select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}><option>Website</option><option>Web App</option><option>SEO</option><option>E-commerce</option><option>Maintenance</option></select></div>
                                <div className="admin-form-group"><label>Status</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option>New</option><option>In Review</option><option>Converted</option></select></div>
                                <div className="admin-form-group full"><label>Notes</label><textarea rows={3} placeholder="Follow-up notes…" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <button className="btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={save}>{editing ? 'Save' : 'Add Lead'}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Leads
