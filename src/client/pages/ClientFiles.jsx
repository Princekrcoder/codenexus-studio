import { useState } from 'react'
import { Download, FileDown } from 'lucide-react'
import { clientFiles, clientProjects } from '../clientMockData'

const ClientFiles = () => {
    const [projectFilter, setProjectFilter] = useState('All')
    const projects = ['All', ...clientProjects.map(p => p.name)]
    const filtered = projectFilter === 'All' ? clientFiles : clientFiles.filter(f => f.project === projectFilter)

    return (
        <>
            {/* Filter */}
            <div className="client-filter-bar">
                {projects.map(p => (
                    <button key={p} className={`c-filter-tab ${projectFilter === p ? 'active' : ''}`} onClick={() => setProjectFilter(p)}>
                        {p === 'All' ? 'All Files' : p}
                    </button>
                ))}
            </div>

            {/* File list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.length === 0 && (
                    <div className="client-empty">
                        <FileDown size={40} strokeWidth={1.5} color="var(--c-muted)" />
                        <p>No files found</p>
                    </div>
                )}
                {filtered.map(f => (
                    <div className="c-file-card" key={f.id}>
                        <div className="c-file-icon">{f.icon}</div>
                        <div className="c-file-info">
                            <h4>{f.name}</h4>
                            <p>{f.project} · {f.type} · {f.size} · {f.date}</p>
                        </div>
                        <span className="c-file-version">{f.version}</span>
                        <button className="c-btn-icon" title="Download">
                            <Download size={15} />
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ClientFiles
