import { useState } from 'react'
import { Pencil, Trash2, Plus, ToggleLeft, ToggleRight, FileText, Image, Star, Globe } from 'lucide-react'

const TABS = [
    { key: 'services', label: 'Services', Icon: Globe },
    { key: 'portfolio', label: 'Portfolio', Icon: Image },
    { key: 'testimonials', label: 'Testimonials', Icon: Star },
    { key: 'blog', label: 'Blog', Icon: FileText },
]

const CMS = () => {
    const [tab, setTab] = useState('services')
    const [services, setServices] = useState([{ id: 1, title: 'Website Design', desc: 'Professional modern websites', active: true }, { id: 2, title: 'Web App', desc: 'Custom web applications', active: true }, { id: 3, title: 'SEO', desc: 'Search engine optimization', active: false }])
    const [portfolio, setPortfolio] = useState([{ id: 1, title: 'TechStartup Landing', client: 'Ravi Sharma', category: 'Website', featured: true }, { id: 2, title: 'BusinessCo Web App', client: 'Neha Gupta', category: 'Web App', featured: false }])
    const [testimonials, setTestimonials] = useState([{ id: 1, name: 'Ravi Sharma', company: 'TechStartup', rating: 5, text: 'Excellent work!' }, { id: 2, name: 'Neha Gupta', company: 'BusinessCo', rating: 4, text: 'Great team, fast delivery.' }])
    const [blog, setBlog] = useState([{ id: 1, title: 'Top 5 Web Trends 2026', date: '2026-01-15', status: 'Published', views: 320 }, { id: 2, title: 'Why SEO Matters', date: '2025-12-20', status: 'Draft', views: 0 }])
    const [editService, setEditService] = useState(null)

    const toggleService = (id) => setServices(s => s.map(sv => sv.id === id ? { ...sv, active: !sv.active } : sv))
    const deletePortfolio = (id) => setPortfolio(p => p.filter(i => i.id !== id))
    const toggleBlog = (id) => setBlog(b => b.map(p => p.id === id ? { ...p, status: p.status === 'Published' ? 'Draft' : 'Published' } : p))
    const deleteBlog = (id) => setBlog(b => b.filter(p => p.id !== id))
    const deleteTestimonial = (id) => setTestimonials(t => t.filter(tt => tt.id !== id))

    return (
        <>
            <div className="admin-page-header">
                <div><h2>Content Management</h2><p>Manage your website content</p></div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: 12, padding: 4, marginBottom: '1.5rem', width: 'fit-content' }}>
                {TABS.map(t => (
                    <button key={t.key} onClick={() => setTab(t.key)} style={{
                        padding: '7px 18px', borderRadius: 9, border: 'none', cursor: 'pointer',
                        fontFamily: 'Outfit,sans-serif', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.18s',
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: tab === t.key ? 'var(--admin-primary)' : 'none',
                        color: tab === t.key ? '#fff' : 'var(--admin-muted)'
                    }}><t.Icon size={14} /> {t.label}</button>
                ))}
            </div>

            {/* Services */}
            {tab === 'services' && (
                <div className="admin-card">
                    <div className="admin-card-header"><h3>Services</h3></div>
                    {services.map(s => (
                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '1rem 1.25rem', borderBottom: '1px solid var(--admin-border)' }}>
                            {editService === s.id ? (
                                <>
                                    <input value={s.title} onChange={e => setServices(sv => sv.map(sv2 => sv2.id === s.id ? { ...sv2, title: e.target.value } : sv2))}
                                        style={{ flex: 1, background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: 8, padding: '5px 10px', color: 'var(--admin-text)', fontFamily: 'Outfit,sans-serif' }} />
                                    <input value={s.desc} onChange={e => setServices(sv => sv.map(sv2 => sv2.id === s.id ? { ...sv2, desc: e.target.value } : sv2))}
                                        style={{ flex: 2, background: 'var(--admin-surface2)', border: '1px solid var(--admin-border)', borderRadius: 8, padding: '5px 10px', color: 'var(--admin-text)', fontFamily: 'Outfit,sans-serif' }} />
                                    <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '5px 12px' }} onClick={() => setEditService(null)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <div style={{ flex: 1 }}><strong style={{ color: 'var(--admin-text)' }}>{s.title}</strong><div style={{ fontSize: '0.78rem', color: 'var(--admin-muted)' }}>{s.desc}</div></div>
                                    <span className={`badge ${s.active ? 'badge-green' : 'badge-gray'}`}>{s.active ? 'Active' : 'Inactive'}</span>
                                    <div className="action-btns">
                                        <button className="btn-icon" onClick={() => toggleService(s.id)}>{s.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}</button>
                                        <button className="btn-icon" onClick={() => setEditService(s.id)}><Pencil size={14} /></button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Portfolio */}
            {tab === 'portfolio' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '1rem' }}>
                    {portfolio.map(p => (
                        <div key={p.id} className="admin-stat-card" style={{ padding: '1.25rem' }}>
                            <div style={{ height: 110, background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(168,85,247,0.15))', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                <Image size={32} color="var(--admin-primary)" strokeWidth={1.4} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <strong style={{ color: 'var(--admin-text)', display: 'block' }}>{p.title}</strong>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--admin-muted)' }}>{p.client} · {p.category}</span>
                                </div>
                                {p.featured && <span className="badge badge-yellow" style={{ fontSize: '0.68rem' }}>Featured</span>}
                            </div>
                            <div style={{ display: 'flex', gap: 6, marginTop: '1rem' }}>
                                <button className="btn-ghost" style={{ flex: 1, fontSize: '0.78rem', padding: '5px 0', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 4 }}><Pencil size={12} /> Edit</button>
                                <button className="btn-danger" style={{ fontSize: '0.78rem', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => deletePortfolio(p.id)}><Trash2 size={12} /></button>
                            </div>
                        </div>
                    ))}
                    <div className="admin-stat-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 180, border: '2px dashed var(--admin-border)', cursor: 'pointer' }}>
                        <Plus size={24} color="var(--admin-muted)" />
                        <span style={{ color: 'var(--admin-muted)', fontSize: '0.85rem' }}>Add Portfolio Item</span>
                    </div>
                </div>
            )}

            {/* Testimonials */}
            {tab === 'testimonials' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: '1rem' }}>
                    {testimonials.map(t => (
                        <div key={t.id} className="admin-stat-card" style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
                                <div className="team-avatar" style={{ width: 38, height: 38, fontSize: '0.8rem' }}>{t.name.slice(0, 2)}</div>
                                <div><strong style={{ color: 'var(--admin-text)', display: 'block', fontSize: '0.9rem' }}>{t.name}</strong><span style={{ fontSize: '0.75rem', color: 'var(--admin-muted)' }}>{t.company}</span></div>
                            </div>
                            <div style={{ color: 'var(--admin-orange)', fontSize: '1rem', marginBottom: '0.65rem' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                            <p style={{ color: 'var(--admin-muted)', fontSize: '0.83rem', lineHeight: 1.6, fontStyle: 'italic' }}>"{t.text}"</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: '1rem' }}>
                                <button className="btn-icon danger" onClick={() => deleteTestimonial(t.id)}><Trash2 size={13} /></button>
                            </div>
                        </div>
                    ))}
                    <div className="admin-stat-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 180, border: '2px dashed var(--admin-border)', cursor: 'pointer' }}>
                        <Plus size={24} color="var(--admin-muted)" /><span style={{ color: 'var(--admin-muted)', fontSize: '0.85rem' }}>Add Testimonial</span>
                    </div>
                </div>
            )}

            {/* Blog */}
            {tab === 'blog' && (
                <div className="admin-card">
                    <div className="admin-card-header"><h3>Blog Posts</h3><button className="btn-primary" style={{ fontSize: '0.8rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 5 }}><Plus size={13} /> New Post</button></div>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead><tr><th>Title</th><th>Date</th><th>Status</th><th>Views</th><th>Actions</th></tr></thead>
                            <tbody>
                                {blog.map(p => (
                                    <tr key={p.id}>
                                        <td><strong style={{ fontSize: '0.875rem' }}>{p.title}</strong></td>
                                        <td style={{ color: 'var(--admin-muted)', fontSize: '0.8rem' }}>{p.date}</td>
                                        <td><span className={`badge ${p.status === 'Published' ? 'badge-green' : 'badge-gray'}`}>{p.status}</span></td>
                                        <td style={{ fontWeight: 600 }}>{p.views}</td>
                                        <td>
                                            <div className="action-btns">
                                                <button className="btn-icon" onClick={() => toggleBlog(p.id)} title={p.status === 'Published' ? 'Unpublish' : 'Publish'} style={{ color: 'var(--admin-green)' }}>
                                                    {p.status === 'Published' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                                </button>
                                                <button className="btn-icon"><Pencil size={14} /></button>
                                                <button className="btn-icon danger" onClick={() => deleteBlog(p.id)}><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default CMS
