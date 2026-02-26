import { CheckCircle2 } from 'lucide-react'
import { clientProjects, PROJECT_STAGES } from '../clientMockData'

const ClientProjects = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {clientProjects.map(p => (
                <div className="client-card" key={p.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                        <div>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--c-text)' }}>{p.name}</h3>
                            <p style={{ fontSize: '0.78rem', color: 'var(--c-muted)', marginTop: 3 }}>{p.description}</p>
                        </div>
                        <span className={`c-badge ${p.status === 'Delivered' ? 'c-badge-green' : 'c-badge-cyan'}`}>{p.status}</span>
                    </div>

                    {/* Stepper */}
                    <div className="c-stepper">
                        {PROJECT_STAGES.map((stage, i) => {
                            const isDone = i < p.stage
                            const isCurrent = i === p.stage - 1 && p.status !== 'Delivered'
                            return (
                                <div key={stage} style={{ display: 'contents' }}>
                                    <div className={`c-stepper-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                                        <div className="c-stepper-dot">
                                            {isDone ? <CheckCircle2 size={12} /> : (i + 1)}
                                        </div>
                                        <span>{stage}</span>
                                    </div>
                                    {i < PROJECT_STAGES.length - 1 && (
                                        <div className={`c-stepper-line ${isDone && i < p.stage - 1 ? 'done' : ''}`} />
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Progress */}
                    <div style={{ marginTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.78rem' }}>
                            <span style={{ color: 'var(--c-muted2)' }}>Progress</span>
                            <span style={{ color: 'var(--c-primary)', fontWeight: 700 }}>{p.progress}%</span>
                        </div>
                        <div className="c-progress-bar">
                            <div className="c-progress-fill" style={{ width: `${p.progress}%` }} />
                        </div>
                    </div>

                    {/* Meta */}
                    <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
                        <div style={{ fontSize: '0.75rem' }}>
                            <span style={{ color: 'var(--c-muted)' }}>Service: </span>
                            <span className="c-badge c-badge-blue">{p.service}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem' }}>
                            <span style={{ color: 'var(--c-muted)' }}>Started: </span>
                            <span style={{ color: 'var(--c-text)', fontWeight: 500 }}>{p.startDate}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem' }}>
                            <span style={{ color: 'var(--c-muted)' }}>Deadline: </span>
                            <span style={{ color: 'var(--c-text)', fontWeight: 500 }}>{p.deadline}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem' }}>
                            <span style={{ color: 'var(--c-muted)' }}>Developer: </span>
                            <span style={{ color: 'var(--c-text)', fontWeight: 500 }}>{p.dev}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ClientProjects
