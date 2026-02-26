import { useState } from 'react'
import { Pencil, Trash2, Plus, List, Columns, ArrowRight, X, FolderKanban, Clock, Loader2, PackageCheck } from 'lucide-react'
import { mockProjects } from '../mockData'

const STATUSES = ['All', 'Pending', 'In Progress', 'Delivered']
const SERVICES = ['All', 'Website', 'Web App', 'SEO', 'Maintenance']
const emptyForm = { name: '', client: '', service: 'Website', status: 'Pending', deadline: '', dev: '', progress: 0 }

const StatusBadge = ({ s }) => {
    const m = { 'Delivered': 'badge-green', 'In Progress': 'badge-blue', 'Pending': 'badge-yellow' }
    return <span className={`badge ${m[s] || 'badge-gray'}`}>{s}</span>
}
const ServiceBadge = ({ s }) => {
    const m = { 'Website': 'badge-purple', 'Web App': 'badge-blue', 'SEO': 'badge-cyan', 'Maintenance': 'badge-orange' }
    return <span className={`badge ${m[s] || 'badge-gray'}`}>{s}</span>
}

const Projects = () => {
    const [projects, setProjects] = useState(mockProjects)
    const [statusFilter, setStatus] = useState('All')
    const [serviceFilter, setService] = useState('All')
    const [search, setSearch] = useState('')
    const [modal, setModal] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [viewMode, setViewMode] = useState('list')

    const openAdd = () => { setEditing(null); setForm(emptyForm); setModal(true) }
    const openEdit = (p) => { setEditing(p.id); setForm({ name: p.name, client: p.client, service: p.service, status: p.status, deadline: p.deadline, dev: p.dev, progress: p.progress }); setModal(true) }
    const save = () => {
        if (!form.name.trim()) return
        if (editing) setProjects(ps => ps.map(p => p.id === editing ? { ...p, ...form, progress: Number(form.progress) } : p))
        else setProjects(ps => [...ps, { id: Date.now(), ...form, progress: Number(form.progress) }])
        setModal(false)
    }
    const remove = (id) => { if (confirm('Delete project?')) setProjects(ps => ps.filter(p => p.id !== id)) }
    const moveKanban = (id, newStatus) => setProjects(ps => ps.map(p => p.id === id ? { ...p, status: newStatus } : p))

    const filtered = projects.filter(p => {
        const mS = statusFilter === 'All' || p.status === statusFilter
        const mSv = serviceFilter === 'All' || p.service === serviceFilter
        const mSr = p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase())
        return mS && mSv && mSr
    })

    const KANDBAN_COLS = [
        { key: 'Pending', label: 'Pending', badge: 'badge-yellow' },
        { key: 'In Progress', label: 'In Progress', badge: 'badge-blue' },
        { key: 'Delivered', label: 'Delivered', badge: 'badge-green' },
    ]

    const ViewBtn = ({ mode, Icon, label }) => (
        <button onClick={() => setViewMode(mode)} style={{
            padding: '5px 14px', borderRadius: 8, border: 'none',
            fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.18s',
            background: viewMode === mode ? 'var(--admin-primary)' : 'none',
            color: viewMode === mode ? '#fff' : 'var(--admin-muted)'
        }}><Icon size={13} /> {label}</button>
    )

    return (
        <>
            <div className="admin-page-header">
                <div><h2>Projects</h2><p>{projects.length} total projects</p></div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ display: 'flex', background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: 10, padding: 3, gap: 2 }}>
                        <ViewBtn mode="list" Icon={List} label="List" />
                        <ViewBtn mode="kanban" Icon={Columns} label="Kanban" />
                    </div>
                    <button className="btn-primary" onClick={openAdd}><Plus size={14} /> New Project</button>
                </div>
            </div>

            {/* Summary strip */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {[
                    ['Pending', Clock, '#eab308', 'rgba(234,179,8,0.12)'],
                    ['In Progress', Loader2, '#6366f1', 'rgba(99,102,241,0.12)'],
                    ['Delivered', PackageCheck, '#22c55e', 'rgba(34,197,94,0.12)'],
                ].map(([s, Icon, iconColor, iconBg]) => (
                    <div key={s} className="admin-stat-card" style={{ flex: 1, minWidth: 130, padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={20} color={iconColor} strokeWidth={1.8} />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--admin-text)', lineHeight: 1 }}>{projects.filter(p => p.status === s).length}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', fontWeight: 500, marginTop: 4 }}>{s}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="admin-filter-bar">
                <input style={{ background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: 10, padding: '0.45rem 0.9rem', color: 'var(--admin-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.875rem', outline: 'none', width: 230 }}
                    placeholder="Search projects…" value={search} onChange={e => setSearch(e.target.value)} />
                {STATUSES.map(s => <button key={s} className={`filter-tab ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatus(s)}>{s}</button>)}
                <span style={{ color: 'var(--admin-muted)', fontSize: '0.8rem' }}>Service:</span>
                {SERVICES.map(s => <button key={s} className={`filter-tab ${serviceFilter === s ? 'active' : ''}`} onClick={() => setService(s)}>{s}</button>)}
            </div>

            {/* Kanban */}
            {viewMode === 'kanban' && (
                <div className="kanban-board">
                    {KANDBAN_COLS.map(col => {
                        const colProjects = projects.filter(p => p.status === col.key)
                            .filter(p => {
                                const mSv = serviceFilter === 'All' || p.service === serviceFilter
                                const mSr = p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase())
                                return mSv && mSr
                            })
                        return (
                            <div className="kanban-col" key={col.key}>
                                <div className="kanban-col-header">
                                    <span>{col.label}</span>
                                    <span className={`badge ${col.badge}`}>{colProjects.length}</span>
                                </div>
                                <div className="kanban-col-body">
                                    {colProjects.length === 0 && <div style={{ textAlign: 'center', color: 'var(--admin-muted)', fontSize: '0.8rem', padding: '1.5rem 0.5rem' }}>No projects</div>}
                                    {colProjects.map(p => (
                                        <div className="kanban-card" key={p.id}>
                                            <div className="kanban-card-title">{p.name}</div>
                                            <div className="kanban-card-meta">
                                                <ServiceBadge s={p.service} />
                                                <span>{p.dev.split(' ')[0] || '—'}</span>
                                                <span>{p.deadline}</span>
                                            </div>
                                            <div style={{ marginTop: 8 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--admin-muted)', marginBottom: 4 }}>
                                                    <span>{p.client}</span><span>{p.progress}%</span>
                                                </div>
                                                <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.progress}%` }} /></div>
                                            </div>
                                            <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                                                {KANDBAN_COLS.filter(c => c.key !== col.key).map(c => (
                                                    <button key={c.key} className="btn-ghost" style={{ fontSize: '0.7rem', padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 3 }}
                                                        onClick={() => moveKanban(p.id, c.key)}>
                                                        <ArrowRight size={10} /> {c.key.split(' ')[0]}
                                                    </button>
                                                ))}
                                                <button className="btn-icon" style={{ fontSize: '0.8rem', marginLeft: 'auto' }} onClick={() => openEdit(p)}><Pencil size={13} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* List */}
            {viewMode === 'list' && (
                <div className="admin-card">
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead><tr><th>Project</th><th>Client</th><th>Service</th><th>Progress</th><th>Status</th><th>Deadline</th><th>Developer</th><th>Actions</th></tr></thead>
                            <tbody>
                                {filtered.length === 0 && <tr><td colSpan={8}><div className="admin-empty"><FolderKanban size={40} strokeWidth={1.5} color="var(--admin-muted)" style={{ marginBottom: 10 }} /><p>No projects found</p></div></td></tr>}
                                {filtered.map(p => (
                                    <tr key={p.id}>
                                        <td><strong style={{ fontSize: '0.875rem' }}>{p.name}</strong></td>
                                        <td style={{ color: 'var(--admin-muted)', fontSize: '0.82rem' }}>{p.client}</td>
                                        <td><ServiceBadge s={p.service} /></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 110 }}>
                                                <div className="progress-bar" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${p.progress}%` }} /></div>
                                                <span style={{ fontSize: '0.73rem', color: 'var(--admin-muted)', width: 28 }}>{p.progress}%</span>
                                            </div>
                                        </td>
                                        <td><StatusBadge s={p.status} /></td>
                                        <td style={{ color: 'var(--admin-muted)', fontSize: '0.8rem' }}>{p.deadline}</td>
                                        <td style={{ fontSize: '0.85rem' }}>{p.dev}</td>
                                        <td>
                                            <div className="action-btns">
                                                <button className="btn-icon" onClick={() => openEdit(p)} title="Edit"><Pencil size={14} /></button>
                                                <button className="btn-icon danger" onClick={() => remove(p.id)} title="Delete"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal */}
            {modal && (
                <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>{editing ? 'Edit Project' : 'New Project'}</h3>
                            <button className="btn-icon" onClick={() => setModal(false)}><X size={16} /></button>
                        </div>
                        <div className="admin-modal-body">
                            <div className="admin-form-grid">
                                <div className="admin-form-group full"><label>Project Name *</label><input placeholder="e.g. E-commerce Website" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Client</label><input placeholder="Client name" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Service</label><select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}><option>Website</option><option>Web App</option><option>SEO</option><option>Maintenance</option></select></div>
                                <div className="admin-form-group"><label>Status</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option>Pending</option><option>In Progress</option><option>Delivered</option></select></div>
                                <div className="admin-form-group"><label>Deadline</label><input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} /></div>
                                <div className="admin-form-group"><label>Developer</label><input placeholder="Developer name" value={form.dev} onChange={e => setForm({ ...form, dev: e.target.value })} /></div>
                                <div className="admin-form-group full"><label>Progress ({form.progress}%)</label>
                                    <input type="range" min="0" max="100" value={form.progress} onChange={e => setForm({ ...form, progress: e.target.value })} style={{ width: '100%', accentColor: 'var(--admin-primary)' }} /></div>
                            </div>
                        </div>
                        <div className="admin-modal-footer">
                            <button className="btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                            <button className="btn-primary" onClick={save}>{editing ? 'Save Changes' : 'Add Project'}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Projects
