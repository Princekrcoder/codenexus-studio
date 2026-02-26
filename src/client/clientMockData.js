// ========== CLIENT PORTAL MOCK DATA ==========

export const clientProfile = {
    id: 1,
    name: 'Ravi Sharma',
    email: 'ravi@techstartup.in',
    phone: '+91 98765 43210',
    company: 'TechStartup Solutions',
    type: 'Startup',
    joined: '2025-11-10',
    avatar: 'RS',
    notifications: { email: true, sms: false, browser: true }
}

export const clientProjects = [
    {
        id: 1, name: 'TechStartup Landing Page', service: 'Website',
        status: 'Delivered', stage: 5, deadline: '2026-01-30',
        dev: 'Arjun K.', progress: 100, startDate: '2025-11-15',
        description: 'Modern landing page with animations, contact form, and SEO optimization.'
    },
    {
        id: 2, name: 'Business Analytics Dashboard', service: 'Web App',
        status: 'In Progress', stage: 3, deadline: '2026-04-15',
        dev: 'Priya S.', progress: 58, startDate: '2026-01-10',
        description: 'Custom analytics dashboard with real-time data charts and export.'
    },
]

export const PROJECT_STAGES = ['Requirements', 'Design', 'Development', 'Testing', 'Delivered']

export const clientFiles = [
    { id: 1, name: 'Project Proposal', type: 'PDF', project: 'TechStartup Landing Page', version: 'v2', size: '1.2 MB', date: '2025-11-18', icon: '📄' },
    { id: 2, name: 'Wireframes & Mockups', type: 'Figma', project: 'TechStartup Landing Page', version: 'v3', size: '4.8 MB', date: '2025-12-05', icon: '🎨' },
    { id: 3, name: 'Final Website Build', type: 'ZIP', project: 'TechStartup Landing Page', version: 'v1', size: '12.3 MB', date: '2026-01-28', icon: '📦' },
    { id: 4, name: 'Invoice INV-001', type: 'PDF', project: 'TechStartup Landing Page', version: 'v1', size: '85 KB', date: '2026-01-31', icon: '🧾' },
    { id: 5, name: 'Project Proposal', type: 'PDF', project: 'Business Analytics Dashboard', version: 'v1', size: '980 KB', date: '2026-01-12', icon: '📄' },
    { id: 6, name: 'UI Design Concepts', type: 'Figma', project: 'Business Analytics Dashboard', version: 'v2', size: '6.1 MB', date: '2026-02-10', icon: '🎨' },
    { id: 7, name: 'API Documentation', type: 'PDF', project: 'Business Analytics Dashboard', version: 'v1', size: '420 KB', date: '2026-02-18', icon: '📋' },
]

export const clientInvoices = [
    { id: 1, invoiceId: 'INV-001', project: 'TechStartup Landing Page', amount: 35000, paid: 35000, status: 'Paid', mode: 'UPI', date: '2026-01-31', dueDate: '2026-02-15' },
    { id: 2, invoiceId: 'INV-004', project: 'Business Analytics Dashboard', amount: 95000, paid: 45000, status: 'Partial', mode: 'Bank Transfer', date: '2026-01-15', dueDate: '2026-03-01' },
    { id: 3, invoiceId: 'INV-007', project: 'Business Analytics Dashboard', amount: 50000, paid: 0, status: 'Unpaid', mode: '—', date: '2026-02-20', dueDate: '2026-03-20' },
]

export const clientTickets = [
    {
        id: 1, subject: 'Logo change request', status: 'Closed', priority: 'Medium',
        project: 'TechStartup Landing Page', created: '2026-01-20', updated: '2026-01-22',
        messages: [
            { id: 1, sender: 'client', text: 'Can we update the logo to the new brand version?', time: '2026-01-20 10:30' },
            { id: 2, sender: 'admin', text: 'Sure! Please share the new logo file and we will update it.', time: '2026-01-20 11:15' },
            { id: 3, sender: 'client', text: 'Here is the updated logo. Thanks!', time: '2026-01-20 14:00' },
            { id: 4, sender: 'admin', text: 'Logo updated and deployed! Please check and confirm.', time: '2026-01-22 09:00' },
        ]
    },
    {
        id: 2, subject: 'Dashboard chart not loading', status: 'In Progress', priority: 'High',
        project: 'Business Analytics Dashboard', created: '2026-02-18', updated: '2026-02-19',
        messages: [
            { id: 1, sender: 'client', text: 'The revenue chart on the dashboard is showing a blank area.', time: '2026-02-18 16:00' },
            { id: 2, sender: 'admin', text: 'We are looking into this. Seems like a data loading issue. Will fix ASAP.', time: '2026-02-19 10:00' },
        ]
    },
    {
        id: 3, subject: 'Add export to PDF feature', status: 'New', priority: 'Low',
        project: 'Business Analytics Dashboard', created: '2026-02-22', updated: '2026-02-22',
        messages: [
            { id: 1, sender: 'client', text: 'Can we add an option to export the dashboard reports as PDF?', time: '2026-02-22 11:30' },
        ]
    },
]

export const clientActivity = [
    { id: 1, action: 'Invoice paid', detail: 'INV-001 — ₹35,000', time: '2 days ago', type: 'payment' },
    { id: 2, action: 'File uploaded', detail: 'UI Design Concepts v2', time: '4 days ago', type: 'file' },
    { id: 3, action: 'Project updated', detail: 'Analytics Dashboard — 58%', time: '5 days ago', type: 'project' },
    { id: 4, action: 'Ticket reply', detail: 'Dashboard chart not loading', time: '6 days ago', type: 'message' },
    { id: 5, action: 'New invoice', detail: 'INV-007 — ₹50,000', time: '1 week ago', type: 'payment' },
]
