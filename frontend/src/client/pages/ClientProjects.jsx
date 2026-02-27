import { useState, useEffect } from 'react'
import { projectsAPI } from '../../services/api'

const ClientProjects = () => {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])

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

    if (loading) {
        return (
            <div className="c-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--c-muted)' }}>Loading projects...</p>
            </div>
        )
    }

    return (
        <>
            {projects.length === 0 ? (
                <div className="c-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem' }}>No projects found</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: 16 }}>
                    {projects.map(p => (
                        <div key={p.id} className="c-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--c-text)', marginBottom: 6 }}>{p.name}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--c-muted)', marginBottom: 8 }}>{p.service}</p>
                                    {p.description && (
                                        <p style={{ fontSize: '0.85rem', color: 'var(--c-text)', marginBottom: 12 }}>{p.description}</p>
                                    )}
                                </div>
                                <span className={`badge ${p.status === 'Delivered' ? 'badge-green' : p.status === 'In Progress' ? 'badge-blue' : 'badge-yellow'}`}>{p.status}</span>
                            </div>
                            
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)', fontWeight: 600 }}>Progress</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-text)' }}>{p.progress}%</span>
                                </div>
                                <div style={{ height: 8, background: 'var(--c-border)', borderRadius: 4, overflow: 'hidden' }}>
                                    <div style={{ width: `${p.progress}%`, height: '100%', background: '#6366f1', transition: '0.3s' }} />
                                </div>
                            </div>

                            {p.deadline && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--c-muted)' }}>
                                    <span>Deadline:</span>
                                    <span style={{ fontWeight: 600 }}>{new Date(p.deadline).toLocaleDateString()}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ClientProjects
