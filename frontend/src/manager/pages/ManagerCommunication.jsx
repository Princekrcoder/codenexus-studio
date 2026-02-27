import { useState, useEffect } from 'react'
import { Plus, X, Phone, Mail, MessageSquare, Calendar, User, Search } from 'lucide-react'
import { communicationsAPI, clientsAPI } from '../../services/api'

const ManagerCommunication = () => {
    const [loading, setLoading] = useState(true)
    const [communications, setCommunications] = useState([])
    const [clients, setClients] = useState([])
    const [search, setSearch] = useState('')
    const [modal, setModal] = useState(false)
    const [form, setForm] = useState({
        clientId: '',
        type: 'Email',
        subject: '',
        notes: '',
        followUpDate: ''
    })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [commsRes, clientsRes] = await Promise.all([
                communicationsAPI.getAll(),
                clientsAPI.getAll()
            ])
            setCommunications(commsRes.communications || [])
            setClients(clientsRes.clients || [])
        } catch (error) {
            console.error('Failed to fetch data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.clientId || !form.subject) return

        try {
            setSaving(true)
            await communicationsAPI.create({
                clientId: form.clientId,
                type: form.type,
                message: form.subject,
                internal: false,
                followUp: form.followUpDate || null
            })
            await fetchData()
            setModal(false)
            setForm({
                clientId: '',
                type: 'Email',
                subject: '',
                notes: '',
                followUpDate: ''
            })
        } catch (error) {
            console.error('Failed to save communication:', error)
            alert('Failed to save communication')
        } finally {
            setSaving(false)
        }
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Phone': return <Phone size={16} color="#6366f1" />
            case 'Email': return <Mail size={16} color="#22c55e" />
            case 'Meeting': return <Calendar size={16} color="#f59e0b" />
            default: return <MessageSquare size={16} color="#8b5cf6" />
        }
    }

    const filtered = communications.filter(c =>
        c.message?.toLowerCase().includes(search.toLowerCase()) ||
        c.client?.name?.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--m-muted)' }}>Loading communications...</p>
            </div>
        )
    }

    return (
        <>
            <div className="m-page-header">
                <div><h2>Communication Log</h2><p>Track all client interactions</p></div>
                <button className="m-btn-primary" onClick={() => setModal(true)}>
                    <Plus size={14} /> Log Communication
                </button>
            </div>

            {/* Search */}
            <div className="m-card" style={{ marginBottom: 16, padding: '12px 16px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--m-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search communications..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%', paddingLeft: 36, height: 36, border: '1px solid var(--m-border)', borderRadius: 6, background: 'var(--m-bg)', color: 'var(--m-text)' }}
                    />
                </div>
            </div>

            {/* Communications List */}
            <div className="m-card">
                {filtered.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <MessageSquare size={48} color="var(--m-muted)" style={{ marginBottom: 16 }} />
                        <p style={{ color: 'var(--m-muted)' }}>No communications logged yet</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {filtered.map(comm => (
                            <div key={comm.id} style={{
                                padding: 16,
                                background: 'var(--m-bg-secondary)',
                                borderRadius: 8,
                                border: '1px solid var(--m-border)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                                    <div style={{ display: 'flex', alignItems: 'start', gap: 12, flex: 1 }}>
                                        <div style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: 8,
                                            background: 'var(--m-bg)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {getTypeIcon(comm.type)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--m-text)' }}>
                                                    {comm.message || comm.subject}
                                                </h4>
                                                <span className={`badge badge-${comm.type === 'Phone' ? 'blue' : comm.type === 'Email' ? 'green' : 'yellow'}`}>
                                                    {comm.type}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.8rem', color: 'var(--m-muted)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <User size={14} />
                                                    <span>{comm.client?.name || 'Unknown Client'}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <Calendar size={14} />
                                                    <span>{new Date(comm.date || comm.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {comm.followUp && (
                                        <div style={{
                                            padding: '4px 10px',
                                            background: 'rgba(245, 158, 11, 0.1)',
                                            borderRadius: 6,
                                            fontSize: '0.75rem',
                                            color: '#f59e0b',
                                            fontWeight: 600
                                        }}>
                                            Follow-up: {new Date(comm.followUp).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Communication Modal */}
            {modal && (
                <div className="admin-modal-overlay" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
                    <div className="admin-modal" style={{ maxWidth: 500 }}>
                        <div className="admin-modal-header">
                            <h3>Log Communication</h3>
                            <button className="btn-icon" onClick={() => setModal(false)}><X size={16} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--m-muted)', marginBottom: 6 }}>
                                            Client *
                                        </label>
                                        <select
                                            value={form.clientId}
                                            onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                background: 'var(--m-bg)',
                                                border: '1px solid var(--m-border)',
                                                borderRadius: 6,
                                                color: 'var(--m-text)',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            <option value="">Select a client</option>
                                            {clients.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--m-muted)', marginBottom: 6 }}>
                                            Type *
                                        </label>
                                        <select
                                            value={form.type}
                                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                background: 'var(--m-bg)',
                                                border: '1px solid var(--m-border)',
                                                borderRadius: 6,
                                                color: 'var(--m-text)',
                                                fontSize: '0.85rem'
                                            }}
                                        >
                                            <option>Email</option>
                                            <option>Phone</option>
                                            <option>Meeting</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--m-muted)', marginBottom: 6 }}>
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Brief description"
                                            value={form.subject}
                                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                background: 'var(--m-bg)',
                                                border: '1px solid var(--m-border)',
                                                borderRadius: 6,
                                                color: 'var(--m-text)',
                                                fontSize: '0.85rem'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--m-muted)', marginBottom: 6 }}>
                                            Notes
                                        </label>
                                        <textarea
                                            placeholder="Detailed notes about the communication"
                                            value={form.notes}
                                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                            rows={4}
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                background: 'var(--m-bg)',
                                                border: '1px solid var(--m-border)',
                                                borderRadius: 6,
                                                color: 'var(--m-text)',
                                                fontSize: '0.85rem',
                                                resize: 'vertical'
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--m-muted)', marginBottom: 6 }}>
                                            Follow-up Date
                                        </label>
                                        <input
                                            type="date"
                                            value={form.followUpDate}
                                            onChange={(e) => setForm({ ...form, followUpDate: e.target.value })}
                                            style={{
                                                width: '100%',
                                                padding: '0.5rem',
                                                background: 'var(--m-bg)',
                                                border: '1px solid var(--m-border)',
                                                borderRadius: 6,
                                                color: 'var(--m-text)',
                                                fontSize: '0.85rem'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                                <button type="submit" className="btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Communication'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ManagerCommunication
