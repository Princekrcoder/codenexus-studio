import { useState } from 'react'
import { PhoneCall, MessageCircle, Send, StickyNote, MessageSquare, Lock, Clock, Plus } from 'lucide-react'
import { mockCommunications, mockClients } from '../managerMockData'

const CommIcon = ({ type }) => {
    const icons = { Call: PhoneCall, WhatsApp: MessageCircle, Email: Send, Note: StickyNote }
    const colors = { Call: '#22c55e', WhatsApp: '#25d366', Email: '#6366f1', Note: '#f97316' }
    const I = icons[type] || MessageSquare
    return (
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${colors[type]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <I size={16} color={colors[type]} />
        </div>
    )
}

const ManagerCommunication = () => {
    const [comms, setComms] = useState(mockCommunications)
    const [filter, setFilter] = useState('All')
    const [newNote, setNewNote] = useState({ clientId: mockClients[0]?.id || 1, type: 'Note', message: '', internal: true })

    const FILTERS = ['All', 'Call', 'WhatsApp', 'Email', 'Note']
    const sorted = [...comms].sort((a, b) => new Date(b.date) - new Date(a.date))
    const filtered = filter === 'All' ? sorted : sorted.filter(c => c.type === filter)

    const addNote = () => {
        if (!newNote.message.trim()) return
        setComms(prev => [...prev, { id: Date.now(), clientId: newNote.clientId, type: newNote.type, message: newNote.message, date: new Date().toISOString().split('T')[0], by: 'Manager', internal: newNote.internal }])
        setNewNote({ ...newNote, message: '' })
    }

    return (
        <>
            <div className="m-page-header">
                <div><h2>Communication Logs</h2><p>{comms.length} entries</p></div>
            </div>

            {/* Add */}
            <div className="m-card" style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--m-text)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}><Plus size={15} /> Log Communication</h3>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                    <select value={newNote.clientId} onChange={e => setNewNote({ ...newNote, clientId: Number(e.target.value) })}
                        style={{ padding: '0.45rem 0.8rem', background: 'var(--m-surface2)', border: '1px solid var(--m-border)', borderRadius: 8, color: 'var(--m-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem' }}>
                        {mockClients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
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
                    <input placeholder="Add communication log…" value={newNote.message}
                        onChange={e => setNewNote({ ...newNote, message: e.target.value })}
                        onKeyDown={e => e.key === 'Enter' && addNote()}
                        style={{ flex: 1, padding: '0.5rem 0.9rem', background: 'var(--m-surface2)', border: '1px solid var(--m-border)', borderRadius: 10, color: 'var(--m-text)', fontFamily: 'Outfit,sans-serif', fontSize: '0.82rem', outline: 'none' }} />
                    <button className="m-btn-primary" onClick={addNote}><Plus size={14} /> Add</button>
                </div>
            </div>

            {/* Filters */}
            <div className="m-filter-bar">
                {FILTERS.map(f => <button key={f} className={`m-filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>)}
            </div>

            {/* Timeline */}
            <div className="m-card">
                {filtered.length === 0 && <div className="m-empty"><p>No communications</p></div>}
                {filtered.map(c => {
                    const client = mockClients.find(cl => cl.id === c.clientId)
                    return (
                        <div key={c.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--m-border)' }}>
                            <CommIcon type={c.type} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                                    <strong style={{ fontSize: '0.82rem', color: 'var(--m-text)' }}>{client?.name || '—'}</strong>
                                    <span className={`m-badge ${c.type === 'Call' || c.type === 'WhatsApp' ? 'm-badge-green' : c.type === 'Email' ? 'm-badge-blue' : 'm-badge-yellow'}`} style={{ fontSize: '0.65rem' }}>{c.type}</span>
                                    {c.internal && <span className="m-badge m-badge-gray" style={{ fontSize: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: 3 }}><Lock size={9} /> Internal</span>}
                                    {c.followUp && <span className="m-badge m-badge-amber" style={{ fontSize: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: 3 }}><Clock size={9} /> {c.followUp}</span>}
                                </div>
                                <p style={{ fontSize: '0.84rem', color: 'var(--m-muted2)', lineHeight: 1.45 }}>{c.message}</p>
                                <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)', marginTop: 3 }}>{c.by} · {c.date}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ManagerCommunication
