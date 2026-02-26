// ========== MOCK DATA ==========

export const mockClients = [
    { id: 1, name: 'Ravi Sharma', email: 'ravi@techstartup.in', phone: '+91 98765 43210', type: 'Startup', projects: 2, payment: 'Paid', joined: '2025-11-10', company: 'TechStartup Solutions', address: 'Sector 62, Mohali, Punjab', gst: 'GST03ABCDE1234F1Z5', website: 'https://techstartup.in', industry: 'Technology', status: 'Active', servicePreference: 'Website' },
    { id: 2, name: 'Neha Gupta', email: 'neha@businessco.com', phone: '+91 87654 32109', type: 'Business', projects: 1, payment: 'Unpaid', joined: '2025-12-05', company: 'BusinessCo Pvt Ltd', address: 'MG Road, Chandigarh', gst: 'GST03FGHIJ5678K2Z8', website: 'https://businessco.com', industry: 'Consulting', status: 'Active', servicePreference: 'Web App' },
    { id: 3, name: 'Amit Singh', email: 'amit@personal.io', phone: '+91 76543 21098', type: 'Personal', projects: 1, payment: 'Partial', joined: '2026-01-15', company: '—', address: 'Panchkula, Haryana', gst: '—', website: 'https://amitsingh.dev', industry: 'Freelancer', status: 'Completed', servicePreference: 'Website' },
    { id: 4, name: 'Priya Mehta', email: 'priya@ecommerce.in', phone: '+91 65432 10987', type: 'Business', projects: 3, payment: 'Paid', joined: '2026-01-28', company: 'ShopEase India', address: 'Phase 8, Mohali', gst: 'GST03KLMNO9012P3Z1', website: 'https://shopease.in', industry: 'E-commerce', status: 'Active', servicePreference: 'Web App' },
    { id: 5, name: 'Kunal Verma', email: 'kunal@saas.dev', phone: '+91 54321 09876', type: 'Startup', projects: 2, payment: 'Paid', joined: '2026-02-10', company: 'SaaS Inc', address: 'IT Park, Chandigarh', gst: 'GST03PQRST3456U4Z7', website: 'https://saas.dev', industry: 'SaaS', status: 'Active', servicePreference: 'Web App' },
    { id: 6, name: 'Sonal Jain', email: 'sonal@boutique.com', phone: '+91 43210 98765', type: 'Personal', projects: 1, payment: 'Unpaid', joined: '2026-02-18', company: 'Sonal Boutique', address: 'Sector 17, Chandigarh', gst: '—', website: '—', industry: 'Retail', status: 'Lead', servicePreference: 'Website' },
]

export const CLIENT_STATUSES = ['Lead', 'Active', 'On Hold', 'Completed', 'Lost']

export const mockCommunications = [
    { id: 1, clientId: 1, type: 'Call', message: 'Discussed landing page requirements and timeline', date: '2025-11-12', by: 'Sneha R.', internal: false },
    { id: 2, clientId: 1, type: 'Email', message: 'Sent project proposal and quotation', date: '2025-11-14', by: 'Admin', internal: false },
    { id: 3, clientId: 1, type: 'Note', message: 'Client prefers minimalist design, approved proposal', date: '2025-11-15', by: 'Admin', internal: true },
    { id: 4, clientId: 1, type: 'WhatsApp', message: 'Shared mockup preview, client happy with direction', date: '2025-12-10', by: 'Arjun K.', internal: false },
    { id: 5, clientId: 1, type: 'Note', message: 'Follow up for Phase 2 — analytics dashboard project', date: '2026-01-30', by: 'Sneha R.', internal: true, followUp: '2026-03-01' },
    { id: 6, clientId: 2, type: 'Call', message: 'Initial discovery call — needs custom web app for inventory management', date: '2025-12-08', by: 'Sneha R.', internal: false },
    { id: 7, clientId: 2, type: 'Email', message: 'Sent proposal for BusinessCo Web App', date: '2025-12-12', by: 'Admin', internal: false },
    { id: 8, clientId: 2, type: 'Note', message: 'Payment pending — follow up next week', date: '2026-02-20', by: 'Admin', internal: true, followUp: '2026-02-27' },
    { id: 9, clientId: 4, type: 'WhatsApp', message: 'Client requested additional SEO service', date: '2026-02-01', by: 'Sneha R.', internal: false },
    { id: 10, clientId: 4, type: 'Call', message: 'Discussed maintenance contract — client agreed', date: '2026-02-15', by: 'Admin', internal: false },
    { id: 11, clientId: 4, type: 'Note', message: 'High-value client — 3 active projects, always pays on time', date: '2026-02-18', by: 'Admin', internal: true },
    { id: 12, clientId: 5, type: 'Email', message: 'SaaS dashboard requirements document received', date: '2026-02-12', by: 'Admin', internal: false },
    { id: 13, clientId: 6, type: 'WhatsApp', message: 'New inquiry for boutique website', date: '2026-02-18', by: 'Admin', internal: false },
    { id: 14, clientId: 6, type: 'Note', message: 'Lead — needs follow up, budget discussion pending', date: '2026-02-19', by: 'Sneha R.', internal: true, followUp: '2026-02-25' },
]

export const mockProjects = [
    { id: 1, name: 'TechStartup Landing Page', client: 'Ravi Sharma', service: 'Website', status: 'Delivered', deadline: '2026-01-30', dev: 'Arjun K.', progress: 100 },
    { id: 2, name: 'BusinessCo Web App', client: 'Neha Gupta', service: 'Web App', status: 'In Progress', deadline: '2026-03-15', dev: 'Sneha R.', progress: 60 },
    { id: 3, name: 'Personal Portfolio', client: 'Amit Singh', service: 'Website', status: 'Delivered', deadline: '2026-02-01', dev: 'Arjun K.', progress: 100 },
    { id: 4, name: 'E-commerce Store', client: 'Priya Mehta', service: 'Web App', status: 'In Progress', deadline: '2026-04-10', dev: 'Riya M.', progress: 40 },
    { id: 5, name: 'SEO Optimization', client: 'Priya Mehta', service: 'SEO', status: 'In Progress', deadline: '2026-03-01', dev: 'Sneha R.', progress: 75 },
    { id: 6, name: 'SaaS Dashboard', client: 'Kunal Verma', service: 'Web App', status: 'Pending', deadline: '2026-05-01', dev: 'Unassigned', progress: 0 },
    { id: 7, name: 'Boutique Website', client: 'Sonal Jain', service: 'Website', status: 'Pending', deadline: '2026-04-01', dev: 'Arjun K.', progress: 10 },
    { id: 8, name: 'Site Maintenance', client: 'Priya Mehta', service: 'Maintenance', status: 'In Progress', deadline: '2026-12-31', dev: 'Riya M.', progress: 50 },
]

export const mockLeads = [
    { id: 1, name: 'Deepak Rao', email: 'deepak@example.com', phone: '+91 91234 56789', source: 'Website', service: 'Web App', status: 'New', notes: 'Wants a CRM for his team', date: '2026-02-22' },
    { id: 2, name: 'Meena Patel', email: 'meena@fashion.in', phone: '+91 92345 67890', source: 'WhatsApp', service: 'E-commerce', status: 'In Review', notes: 'Fashion store, budget ~50k', date: '2026-02-21' },
    { id: 3, name: 'Rohan Das', email: 'rohan@agency.com', phone: '+91 93456 78901', source: 'Email', service: 'SEO', status: 'Converted', notes: 'Converted to project #5', date: '2026-02-18' },
    { id: 4, name: 'Kavya Nair', email: 'kavya@startup.io', phone: '+91 94567 89012', source: 'Website', service: 'Website', status: 'New', notes: 'Startup landing page required', date: '2026-02-23' },
    { id: 5, name: 'Suresh Kumar', email: 'suresh@corp.co', phone: '+91 95678 90123', source: 'WhatsApp', service: 'Maintenance', status: 'In Review', notes: 'Monthly maintenance contract', date: '2026-02-20' },
]

export const mockInvoices = [
    { id: 1, invoiceId: 'INV-001', client: 'Ravi Sharma', project: 'TechStartup Landing Page', amount: 35000, paid: 35000, status: 'Paid', mode: 'UPI', date: '2026-01-31' },
    { id: 2, invoiceId: 'INV-002', client: 'Neha Gupta', project: 'BusinessCo Web App', amount: 80000, paid: 0, status: 'Unpaid', mode: '—', date: '2026-02-05' },
    { id: 3, invoiceId: 'INV-003', client: 'Amit Singh', project: 'Personal Portfolio', amount: 20000, paid: 10000, status: 'Partial', mode: 'Bank', date: '2026-02-01' },
    { id: 4, invoiceId: 'INV-004', client: 'Priya Mehta', project: 'E-commerce Store', amount: 120000, paid: 60000, status: 'Partial', mode: 'UPI', date: '2026-02-10' },
    { id: 5, invoiceId: 'INV-005', client: 'Kunal Verma', project: 'SaaS Dashboard', amount: 95000, paid: 95000, status: 'Paid', mode: 'Bank', date: '2026-02-15' },
    { id: 6, invoiceId: 'INV-006', client: 'Sonal Jain', project: 'Boutique Website', amount: 25000, paid: 0, status: 'Unpaid', mode: '—', date: '2026-02-18' },
]

export const mockTeam = [
    { id: 1, name: 'Arjun Kumar', role: 'Developer', email: 'arjun@codenexus.in', tasks: 3, status: 'Active', avatar: 'AK' },
    { id: 2, name: 'Sneha Raj', role: 'Manager', email: 'sneha@codenexus.in', tasks: 5, status: 'Active', avatar: 'SR' },
    { id: 3, name: 'Riya Mishra', role: 'Developer', email: 'riya@codenexus.in', tasks: 2, status: 'Active', avatar: 'RM' },
    { id: 4, name: 'Vivek Khanna', role: 'Designer', email: 'vivek@codenexus.in', tasks: 1, status: 'Inactive', avatar: 'VK' },
]

export const mockTasks = [
    { id: 1, title: 'Finish homepage redesign', assignee: 'Arjun Kumar', project: 'TechStartup Landing Page', priority: 'High', status: 'Done', due: '2026-01-30' },
    { id: 2, title: 'Build login module', assignee: 'Riya Mishra', project: 'BusinessCo Web App', priority: 'High', status: 'In Progress', due: '2026-03-01' },
    { id: 3, title: 'SEO audit report', assignee: 'Sneha Raj', project: 'SEO Optimization', priority: 'Medium', status: 'In Progress', due: '2026-02-28' },
    { id: 4, title: 'Product listing pages', assignee: 'Riya Mishra', project: 'E-commerce Store', priority: 'High', status: 'Todo', due: '2026-03-20' },
    { id: 5, title: 'Client onboarding call', assignee: 'Sneha Raj', project: 'SaaS Dashboard', priority: 'Low', status: 'Todo', due: '2026-03-05' },
    { id: 6, title: 'Deploy to Vercel', assignee: 'Arjun Kumar', project: 'Boutique Website', priority: 'Medium', status: 'Todo', due: '2026-04-01' },
]

export const mockActivity = [
    { id: 1, action: 'New lead received', detail: 'Kavya Nair — Website', time: '5 min ago', type: 'lead' },
    { id: 2, action: 'Invoice paid', detail: 'Kunal Verma — ₹95,000', time: '2 hrs ago', type: 'payment' },
    { id: 3, action: 'Project updated', detail: 'BusinessCo Web App — 60%', time: '4 hrs ago', type: 'update' },
    { id: 4, action: 'New client added', detail: 'Sonal Jain — Boutique', time: 'Yesterday', type: 'client' },
    { id: 5, action: 'Task completed', detail: 'Homepage redesign done', time: 'Yesterday', type: 'task' },
]

export const mockStats = {
    totalClients: 6,
    activeProjects: 4,
    pendingRequests: 2,
    monthlyRevenue: 155000,
    newLeadsToday: 2,
    newLeadsWeek: 5,
}

export const mockServices = [
    { id: 1, title: 'Website Design', desc: 'Professional modern websites', active: true },
    { id: 2, title: 'Web App Development', desc: 'Custom web applications', active: true },
    { id: 3, title: 'SEO Optimization', desc: 'Search engine ranking boost', active: true },
    { id: 4, title: 'Maintenance', desc: 'Monthly maintenance plans', active: false },
]

export const mockPortfolio = [
    { id: 1, title: 'TechStartup Landing Page', client: 'Ravi Sharma', category: 'Website', featured: true },
    { id: 2, title: 'BusinessCo Web App', client: 'Neha Gupta', category: 'Web App', featured: false },
    { id: 3, title: 'E-commerce Store', client: 'Priya Mehta', category: 'Web App', featured: true },
    { id: 4, title: 'SEO Campaign', client: 'Priya Mehta', category: 'SEO', featured: false },
]

export const mockTestimonials = [
    { id: 1, name: 'Ravi Sharma', company: 'TechStartup', rating: 5, text: 'Excellent work! Delivered on time and beyond expectations.' },
    { id: 2, name: 'Neha Gupta', company: 'BusinessCo', rating: 4, text: 'Great team, fast delivery. Highly recommended.' },
    { id: 3, name: 'Kunal Verma', company: 'SaaS Inc', rating: 5, text: 'Professional and creative. Our dashboard looks amazing.' },
]

export const mockBlog = [
    { id: 1, title: 'Top 5 Web Design Trends in 2026', date: '2026-01-15', status: 'Published', views: 320 },
    { id: 2, title: 'Why Every Business Needs SEO', date: '2025-12-20', status: 'Published', views: 215 },
    { id: 3, title: 'Building a Scalable Web App in 2026', date: '2026-02-01', status: 'Draft', views: 0 },
]
