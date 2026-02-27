import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Eye } from 'lucide-react'
import { projectsAPI } from '../../services/api'

const StatusBadge = ({ s }) => {
    const m = { Pending: 'badge-yellow', 'In Progress': 'badge-blue', Delivered: 'badge-green' }
    return <span className={`badge ${m[s] || 'badge-gray'}`}>{s}</span>
}

const ManagerProjects = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            setLoading(true)
            const response = await projectsAPI.getAll()
            setProjects(response.projects || [])
        } catch (error) {
            console.error('Failed to fetch projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const filtered = projects.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.Client && p.Client.name.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <>
            <div className="m-page-header">
                <div><h2>Project Tracker</h2><p>Monitor all projects</p></div>
            </div>

            {/* Search */}
            <div className="m-card" style={{ marginBottom: 16, padding: '12px 16px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--m-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%', paddingLeft: 36, height: 36, border: '1px solid var(--m-border)', borderRadius: 6, background: 'var(--m-bg)', color: 'var(--m-text)' }}
                    />
                </div>
            </div>

            {/* Projects Table */}
            <div className="m-card">
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--m-muted)' }}>Loading projects...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--m-muted)' }}>No projects found</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="m-table">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Client</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Progress</th>
                                    <th>Deadline</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map(p => (
                                    <tr key={p.id}>
                                        <td style={{ fontWeight: 600 }}>{p.name}</td>
                                        <td>{p.Client ? p.Client.name : '—'}</td>
                                        <td>{p.service}</td>
                                        <td><StatusBadge s={p.status} /></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ flex: 1, height: 6, background: 'var(--m-border)', borderRadius: 3, overflow: 'hidden' }}>
                                                    <div style={{ width: `${p.progress}%`, height: '100%', background: '#6366f1', transition: '0.3s' }} />
                                                </div>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--m-muted)', minWidth: 35 }}>{p.progress}%</span>
                                            </div>
                                        </td>
                                        <td>{p.deadline ? new Date(p.deadline).toLocaleDateString() : '—'}</td>
                                        <td>
                                            <button className="m-btn-icon" onClick={() => navigate(`/manager/clients/${p.clientId}`)} title="View Client">
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

export default ManagerProjects
