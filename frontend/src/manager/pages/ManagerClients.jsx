import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Eye, Search, Filter } from 'lucide-react'
import { clientsAPI } from '../../services/api'

const StatusBadge = ({ s }) => {
    const m = { Lead: 'badge-cyan', Active: 'badge-green', 'On Hold': 'badge-yellow', Completed: 'badge-blue', Lost: 'badge-red' }
    return <span className={`badge ${m[s] || 'badge-gray'}`}>{s}</span>
}

const TypeBadge = ({ t }) => {
    const m = { Startup: 'badge-cyan', Business: 'badge-blue', Personal: 'badge-purple' }
    return <span className={`badge ${m[t] || 'badge-gray'}`}>{t}</span>
}

const ManagerClients = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    
    const params = new URLSearchParams(location.search)
    const statusFilter = params.get('status') || 'All'

    useEffect(() => {
        fetchClients()
    }, [statusFilter])

    const fetchClients = async () => {
        try {
            setLoading(true)
            const queryParams = {}
            if (statusFilter !== 'All') {
                queryParams.status = statusFilter
            }
            const response = await clientsAPI.getAll(queryParams)
            setClients(response.clients || [])
        } catch (error) {
            console.error('Failed to fetch clients:', error)
        } finally {
            setLoading(false)
        }
    }

    const filtered = clients.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <>
            <div className="m-page-header">
                <div><h2>Client Records</h2><p>View and manage clients</p></div>
            </div>

            {/* Search & Filters */}
            <div className="m-card" style={{ marginBottom: 16, padding: '12px 16px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: '1 1 250px' }}>
                        <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--m-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '100%', paddingLeft: 36, height: 36, border: '1px solid var(--m-border)', borderRadius: 6, background: 'var(--m-bg)', color: 'var(--m-text)' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <Filter size={16} color="var(--m-muted)" />
                        <span style={{ fontSize: '0.85rem', color: 'var(--m-muted)' }}>Status:</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--m-text)' }}>{statusFilter}</span>
                    </div>
                </div>
            </div>

            {/* Clients Table */}
            <div className="m-card">
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--m-muted)' }}>Loading clients...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--m-muted)' }}>No clients found</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="m-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Company</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(c => (
                                    <tr key={c.id}>
                                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                                        <td>{c.email}</td>
                                        <td>{c.phone}</td>
                                        <td>{c.company || '—'}</td>
                                        <td><TypeBadge t={c.type} /></td>
                                        <td><StatusBadge s={c.status} /></td>
                                        <td>
                                            <button className="m-btn-icon" onClick={() => navigate(`/manager/clients/${c.id}`)} title="View Details">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    )
}

export default ManagerClients
