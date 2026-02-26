// ======= MANAGER PORTAL MOCK DATA =======

import { mockClients, mockProjects, mockInvoices, mockCommunications, CLIENT_STATUSES } from '../admin/mockData'

// Re-export for convenience
export { mockClients, mockProjects, mockInvoices, mockCommunications, CLIENT_STATUSES }

// Manager-specific stats
export const getManagerStats = () => {
    const totalClients = mockClients.length
    const activeClients = mockClients.filter(c => c.status === 'Active').length
    const leads = mockClients.filter(c => c.status === 'Lead').length
    const onHold = mockClients.filter(c => c.status === 'On Hold').length
    const completed = mockClients.filter(c => c.status === 'Completed').length
    const lost = mockClients.filter(c => c.status === 'Lost').length

    const totalRevenue = mockInvoices.reduce((s, i) => s + i.amount, 0)
    const collected = mockInvoices.reduce((s, i) => s + i.paid, 0)
    const pending = totalRevenue - collected

    const activeProjects = mockProjects.filter(p => p.status === 'In Progress').length
    const totalProjects = mockProjects.length

    return { totalClients, activeClients, leads, onHold, completed, lost, totalRevenue, collected, pending, activeProjects, totalProjects }
}

// Upcoming follow-ups
export const getFollowUps = () =>
    mockCommunications.filter(c => c.followUp).sort((a, b) => new Date(a.followUp) - new Date(b.followUp))

// Recent communications
export const getRecentComms = () =>
    mockCommunications.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8)

// Payment due clients
export const getDueClients = () =>
    mockClients.filter(c => {
        const invoices = mockInvoices.filter(i => i.client === c.name)
        const due = invoices.reduce((s, i) => s + (i.amount - i.paid), 0)
        return due > 0
    }).map(c => {
        const invoices = mockInvoices.filter(i => i.client === c.name)
        const due = invoices.reduce((s, i) => s + (i.amount - i.paid), 0)
        return { ...c, dueAmount: due }
    })
