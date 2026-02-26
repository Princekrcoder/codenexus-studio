import { useState } from 'react'
import { Plus, X, Send } from 'lucide-react'
import { clientTickets, clientProjects } from '../clientMockData'

const STATUS_COLORS = { 'New': 'c-badge-blue', 'In Progress': 'c-badge-orange', 'Closed': 'c-badge-gray' }
const PRIORITY_COLORS = { 'Low': 'c-badge-gray', 'Medium': 'c-badge-orange', 'High': 'c-badge-red' }

const ClientMessages = () => {
    const [tickets, setTickets] = useState(clientTickets)
    const [filter, setFilter] = useState('All')
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [newMsg, setNewMsg] = useState('')
    const [showCreate, setShowCreate] = useState(false)
    const [newTicket, setNewTicket] = useState({ subject: '', project: clientProjects[0]?.name || '', priority: 'Medium', message: '' })

    const FILTERS = ['All', 'New', 'In Progress', 'Closed']
    const filtered = filter === 'All' ? tickets : tickets.filter(t => t.status === filter)

    const sendMessage = () => {
        if (!newMsg.trim() || !selectedTicket) return
        const updated = tickets.map(t => {
            if (t.id === selectedTicket.id) {
                const newMessages = [...t.messages, { id: t.messages.length + 1, sender: 'client', text: newMsg, time: new Date().toLocaleString() }]
                return { ...t, messages: newMessages, updated: new Date().toISOString().split('T')[0] }
            }
            return t
        })
        setTickets(updated)
        setSelectedTicket(updated.find(t => t.id === selectedTicket.id))
        setNewMsg('')
    }

    const createTicket = () => {
        if (!newTicket.subject.trim() || !newTicket.message.trim()) return
        const ticket = {
            id: tickets.length + 1,
            subject: newTicket.subject,
            status: 'New',
            priority: newTicket.priority,
            project: newTicket.project,
            created: new Date().toISOString().split('T')[0],
            updated: new Date().toISOString().split('T')[0],
            messages: [{ id: 1, sender: 'client', text: newTicket.message, time: new Date().toLocaleString() }]
        }
        setTickets([ticket, ...tickets])
        setShowCreate(false)
        setNewTicket({ subject: '', project: clientProjects[0]?.name || '', priority: 'Medium', message: '' })
        setSelectedTicket(ticket)
    }

    return (
        <>
            {/* Top bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                <div className="client-filter-bar" style={{ marginBottom: 0 }}>
                    {FILTERS.map(f => (
                        <button key={f} className={`c-filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
                    ))}
                </div>
                <button className="c-btn-primary" onClick={() => setShowCreate(true)}>
                    <Plus size={15} /> New Ticket
                </button>
            </div>

            <div className="c-grid-2">
                {/* Ticket list */}
                <div className="c-ticket-list">
                    {filtered.length === 0 && (
                        <div className="client-empty"><p>No tickets found</p></div>
                    )}
                    {filtered.map(t => (
                        <div key={t.id}
                            className={`c-ticket-item ${selectedTicket?.id === t.id ? 'active-ticket' : ''}`}
                            onClick={() => setSelectedTicket(t)}>
                            <div className="c-ticket-header">
                                <h4>{t.subject}</h4>
                                <span className={`c-badge ${STATUS_COLORS[t.status]}`}>{t.status}</span>
                            </div>
                            <div className="c-ticket-meta">
                                <span>{t.project}</span>
                                <span>·</span>
                                <span className={`c-badge ${PRIORITY_COLORS[t.priority]}`}>{t.priority}</span>
                                <span>·</span>
                                <span>{t.updated}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat */}
                <div className="client-card">
                    {!selectedTicket ? (
                        <div className="client-empty"><p>Select a ticket to view conversation</p></div>
                    ) : (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--c-text)' }}>{selectedTicket.subject}</h3>
                                <span className={`c-badge ${STATUS_COLORS[selectedTicket.status]}`}>{selectedTicket.status}</span>
                            </div>
                            <p style={{ fontSize: '0.72rem', color: 'var(--c-muted)', marginBottom: 6 }}>
                                {selectedTicket.project} · Created: {selectedTicket.created}
                            </p>

                            <div className="c-chat-area">
                                {selectedTicket.messages.map(m => (
                                    <div key={m.id}>
                                        <div className={`c-chat-msg ${m.sender}`}>{m.text}</div>
                                        <div className="c-chat-time" style={{ textAlign: m.sender === 'client' ? 'right' : 'left' }}>{m.time}</div>
                                    </div>
                                ))}
                            </div>

                            {selectedTicket.status !== 'Closed' && (
                                <div className="c-chat-input-bar">
                                    <input
                                        placeholder="Type a message…"
                                        value={newMsg}
                                        onChange={e => setNewMsg(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                    />
                                    <button onClick={sendMessage}><Send size={15} /></button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Create ticket modal */}
            {showCreate && (
                <div className="c-modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="c-modal" onClick={e => e.stopPropagation()}>
                        <div className="c-modal-header">
                            <h3>New Support Ticket</h3>
                            <button className="c-btn-icon" onClick={() => setShowCreate(false)}><X size={16} /></button>
                        </div>
                        <div className="c-form-group">
                            <label>Subject</label>
                            <input value={newTicket.subject} onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })} placeholder="Brief description of your issue" />
                        </div>
                        <div className="c-form-group">
                            <label>Project</label>
                            <select value={newTicket.project} onChange={e => setNewTicket({ ...newTicket, project: e.target.value })}>
                                {clientProjects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                            </select>
                        </div>
                        <div className="c-form-group">
                            <label>Priority</label>
                            <select value={newTicket.priority} onChange={e => setNewTicket({ ...newTicket, priority: e.target.value })}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="c-form-group">
                            <label>Message</label>
                            <textarea value={newTicket.message} onChange={e => setNewTicket({ ...newTicket, message: e.target.value })} placeholder="Describe your issue in detail…" />
                        </div>
                        <button className="c-btn-primary" onClick={createTicket} style={{ width: '100%', justifyContent: 'center' }}>
                            <Send size={15} /> Submit Ticket
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ClientMessages
