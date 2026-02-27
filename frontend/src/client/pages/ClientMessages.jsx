import { useState, useEffect, useRef } from 'react'
import { Send, User } from 'lucide-react'
import { messagesAPI, authAPI } from '../../services/api'

const ClientMessages = () => {
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [user, setUser] = useState(null)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        const currentUser = authAPI.getCurrentUser()
        setUser(currentUser)
        fetchMessages()
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const fetchMessages = async () => {
        try {
            setLoading(true)
            const response = await messagesAPI.getAll()
            setMessages(response.messages || [])
        } catch (error) {
            console.error('Failed to fetch messages:', error)
        } finally {
            setLoading(false)
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!newMessage.trim() || sending) return

        try {
            setSending(true)
            const response = await messagesAPI.create({
                content: newMessage,
                clientId: user?.id
            })
            
            if (response.success) {
                setMessages([response.message, ...messages])
                setNewMessage('')
            }
        } catch (error) {
            console.error('Failed to send message:', error)
            alert('Failed to send message. Please try again.')
        } finally {
            setSending(false)
        }
    }

    if (loading) {
        return (
            <div className="c-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--c-muted)' }}>Loading messages...</p>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 250px)' }}>
            {/* Messages Container */}
            <div className="c-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginBottom: 16 }}>
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    gap: 16
                }}>
                    <div ref={messagesEndRef} />
                    {messages.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--c-muted)' }}>
                            <p style={{ fontSize: '0.9rem', marginBottom: 8 }}>No messages yet</p>
                            <p style={{ fontSize: '0.8rem' }}>Start a conversation with the team</p>
                        </div>
                    ) : (
                        messages.map(msg => {
                            const isOwnMessage = msg.senderId === user?.id
                            return (
                                <div
                                    key={msg.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                                        gap: 10
                                    }}
                                >
                                    {!isOwnMessage && (
                                        <div style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            background: '#6366f1',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            flexShrink: 0
                                        }}>
                                            {msg.Sender?.name?.slice(0, 2).toUpperCase() || <User size={16} />}
                                        </div>
                                    )}
                                    <div style={{ maxWidth: '70%' }}>
                                        {!isOwnMessage && (
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: 'var(--c-muted)',
                                                marginBottom: 4,
                                                fontWeight: 600
                                            }}>
                                                {msg.Sender?.name || 'Team Member'}
                                            </div>
                                        )}
                                        <div style={{
                                            padding: '10px 14px',
                                            borderRadius: 12,
                                            background: isOwnMessage ? '#6366f1' : 'var(--c-bg-secondary)',
                                            color: isOwnMessage ? '#fff' : 'var(--c-text)',
                                            fontSize: '0.85rem',
                                            lineHeight: 1.5,
                                            wordWrap: 'break-word'
                                        }}>
                                            {msg.content}
                                        </div>
                                        <div style={{
                                            fontSize: '0.7rem',
                                            color: 'var(--c-muted)',
                                            marginTop: 4,
                                            textAlign: isOwnMessage ? 'right' : 'left'
                                        }}>
                                            {new Date(msg.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                    {isOwnMessage && (
                                        <div style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            background: '#22c55e',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            flexShrink: 0
                                        }}>
                                            {user?.name?.slice(0, 2).toUpperCase() || 'ME'}
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Message Input */}
            <div className="c-card" style={{ padding: 16 }}>
                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 12 }}>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={sending}
                        style={{
                            flex: 1,
                            padding: '0.6rem 1rem',
                            background: 'var(--c-bg-secondary)',
                            border: '1px solid var(--c-border)',
                            borderRadius: 8,
                            color: 'var(--c-text)',
                            fontSize: '0.85rem',
                            outline: 'none'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        style={{
                            padding: '0.6rem 1.2rem',
                            background: newMessage.trim() && !sending ? '#6366f1' : 'var(--c-border)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: newMessage.trim() && !sending ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            transition: 'background 0.2s'
                        }}
                    >
                        <Send size={16} /> {sending ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ClientMessages
