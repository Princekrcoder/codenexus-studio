import { useState, useEffect } from 'react'
import { Download, FileText, Image, File as FileIcon, Upload, Trash2 } from 'lucide-react'
import { filesAPI, projectsAPI } from '../../services/api'

const ClientFiles = () => {
    const [loading, setLoading] = useState(true)
    const [files, setFiles] = useState([])
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState('all')

    useEffect(() => {
        fetchData()
    }, [selectedProject])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [filesRes, projectsRes] = await Promise.all([
                filesAPI.getAll(selectedProject !== 'all' ? { projectId: selectedProject } : {}),
                projectsAPI.getAll()
            ])
            setFiles(filesRes.files || [])
            setProjects(projectsRes.projects || [])
        } catch (error) {
            console.error('Failed to fetch files:', error)
        } finally {
            setLoading(false)
        }
    }

    const getFileIcon = (type) => {
        if (type?.includes('image')) return <Image size={20} color="#6366f1" />
        if (type?.includes('pdf')) return <FileText size={20} color="#ef4444" />
        return <FileIcon size={20} color="#8b5cf6" />
    }

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    const handleDownload = (file) => {
        // In a real implementation, this would download the file
        window.open(file.url, '_blank')
    }

    if (loading) {
        return (
            <div className="c-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--c-muted)' }}>Loading files...</p>
            </div>
        )
    }

    return (
        <>
            {/* Filter by Project */}
            <div className="c-card" style={{ marginBottom: 16, padding: '12px 16px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--c-muted)', fontWeight: 600 }}>Filter by Project:</span>
                    <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            background: 'var(--c-bg-secondary)',
                            border: '1px solid var(--c-border)',
                            borderRadius: 6,
                            color: 'var(--c-text)',
                            fontSize: '0.85rem',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all">All Projects</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Files Grid */}
            {files.length === 0 ? (
                <div className="c-card" style={{ padding: '3rem', textAlign: 'center' }}>
                    <Upload size={48} color="var(--c-muted)" style={{ marginBottom: 16 }} />
                    <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem', marginBottom: 8 }}>No files available</p>
                    <p style={{ color: 'var(--c-muted)', fontSize: '0.8rem' }}>Files will appear here once uploaded by the team</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {files.map(file => (
                        <div key={file.id} className="c-card" style={{ padding: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'start', gap: 12, marginBottom: 12 }}>
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 8,
                                    background: 'var(--c-bg-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {getFileIcon(file.type)}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h4 style={{
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: 'var(--c-text)',
                                        marginBottom: 4,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {file.name}
                                    </h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)' }}>
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                padding: '8px 0',
                                borderTop: '1px solid var(--c-border)',
                                borderBottom: '1px solid var(--c-border)',
                                marginBottom: 12
                            }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: 4 }}>
                                    Uploaded: {file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString() : 'N/A'}
                                </div>
                                {file.Project && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--c-muted)' }}>
                                        Project: {file.Project.name}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => handleDownload(file)}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    background: '#6366f1',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 6,
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6
                                }}
                            >
                                <Download size={14} /> Download
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ClientFiles
