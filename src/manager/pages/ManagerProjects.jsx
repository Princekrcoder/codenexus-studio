import { FolderKanban } from 'lucide-react'
import { mockProjects } from '../managerMockData'

const ManagerProjects = () => (
    <>
        <div className="m-page-header">
            <div><h2>Project Tracker</h2><p>{mockProjects.length} total projects</p></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 20 }}>
            {['In Progress', 'Delivered', 'Pending'].map(s => {
                const count = mockProjects.filter(p => p.status === s).length
                const colors = { 'In Progress': '#06b6d4', Delivered: '#22c55e', Pending: '#eab308' }
                return (
                    <div key={s} className="m-stat-card" style={{ padding: '0.8rem 1rem' }}>
                        <div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: colors[s] }}>{count}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--m-muted)' }}>{s}</div>
                        </div>
                    </div>
                )
            })}
        </div>

        {mockProjects.map(p => (
            <div key={p.id} className="m-card" style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--m-text)' }}>{p.name}</h4>
                        <p style={{ fontSize: '0.78rem', color: 'var(--m-muted)', marginTop: 2 }}>{p.client} · {p.service} · {p.dev}</p>
                    </div>
                    <span className={`m-badge ${p.status === 'Delivered' ? 'm-badge-green' : p.status === 'In Progress' ? 'm-badge-cyan' : 'm-badge-yellow'}`}>{p.status}</span>
                </div>
                <div style={{ marginTop: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
                        <span style={{ color: 'var(--m-muted)' }}>Progress</span>
                        <span style={{ color: 'var(--m-primary)', fontWeight: 700 }}>{p.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: 7, borderRadius: 10, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{ width: `${p.progress}%`, height: '100%', borderRadius: 10, background: 'linear-gradient(90deg, #f59e0b, #f97316)', transition: 'width 0.4s' }} />
                    </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--m-muted)', marginTop: 8 }}>Deadline: <strong style={{ color: 'var(--m-text)' }}>{p.deadline}</strong></div>
            </div>
        ))}
    </>
)

export default ManagerProjects
