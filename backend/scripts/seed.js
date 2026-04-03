import { sequelize, User, Client, Project, Lead, Invoice, Communication, Activity, ContactInquiry } from '../models/index.js';

const seed = async () => {
    try {
        console.log('🚀 Starting database seed...\n');

        // Step 1: Test connection
        await sequelize.authenticate();
        console.log('✅ Connected to Neon PostgreSQL');

        // Step 2: Drop all tables and recreate (force: true)
        await sequelize.sync({ force: true });
        console.log('✅ All tables created successfully');
        console.log('   📋 Tables: users, clients, projects, leads, invoices, communications, files, messages, activities, contact_inquiries\n');

        // Step 3: Seed Users (Admin, Manager, Developer, Client)
        console.log('👤 Creating users...');
        const admin = await User.create({
            name: 'Prince Kumar',
            email: 'admin@codenexus.studio',
            password: 'admin123',
            role: 'Admin',
            status: 'Active'
        });

        const manager = await User.create({
            name: 'Manager User',
            email: 'manager@codenexus.studio',
            password: 'manager123',
            role: 'Manager',
            status: 'Active'
        });

        const developer = await User.create({
            name: 'Developer User',
            email: 'developer@codenexus.studio',
            password: 'dev123',
            role: 'Developer',
            status: 'Active'
        });

        const clientUser = await User.create({
            name: 'Client User',
            email: 'client@codenexus.studio',
            password: 'client123',
            role: 'Client',
            status: 'Active'
        });

        console.log('   ✅ Admin: admin@codenexus.studio / admin123');
        console.log('   ✅ Manager: manager@codenexus.studio / manager123');
        console.log('   ✅ Developer: developer@codenexus.studio / dev123');
        console.log('   ✅ Client: client@codenexus.studio / client123\n');

        // Step 4: Seed Clients
        console.log('🏢 Creating clients...');
        const client1 = await Client.create({
            name: 'Rajesh Sharma',
            email: 'rajesh@techsolutions.in',
            phone: '+91 98765 43210',
            company: 'Tech Solutions India',
            address: 'Mumbai, Maharashtra',
            industry: 'Technology',
            type: 'Business',
            status: 'Active',
            servicePreference: ['Website', 'Web App'],
            paymentStatus: 'Paid'
        });

        const client2 = await Client.create({
            name: 'Priya Patel',
            email: 'priya@startuplab.com',
            phone: '+91 87654 32109',
            company: 'StartupLab',
            address: 'Bangalore, Karnataka',
            industry: 'Startup',
            type: 'Startup',
            status: 'Active',
            servicePreference: ['Web App', 'SEO'],
            paymentStatus: 'Partial'
        });

        const client3 = await Client.create({
            name: 'Amit Verma',
            email: 'amit@designhub.co',
            phone: '+91 76543 21098',
            company: 'DesignHub Co',
            address: 'Delhi, India',
            industry: 'Design',
            type: 'Business',
            status: 'Active',
            servicePreference: ['Website', 'Maintenance'],
            paymentStatus: 'Unpaid'
        });

        console.log('   ✅ 3 clients created\n');

        // Step 5: Seed Projects
        console.log('📁 Creating projects...');
        const project1 = await Project.create({
            name: 'Tech Solutions Website Redesign',
            clientId: client1.id,
            service: 'Website',
            status: 'In Progress',
            deadline: new Date('2026-05-15'),
            developerId: developer.id,
            progress: 65,
            description: 'Complete website redesign with modern UI/UX for Tech Solutions India'
        });

        const project2 = await Project.create({
            name: 'StartupLab Dashboard App',
            clientId: client2.id,
            service: 'Web App',
            status: 'In Progress',
            deadline: new Date('2026-06-01'),
            developerId: developer.id,
            progress: 30,
            description: 'Full-stack dashboard web application for StartupLab'
        });

        const project3 = await Project.create({
            name: 'DesignHub Portfolio Site',
            clientId: client3.id,
            service: 'Website',
            status: 'Pending',
            deadline: new Date('2026-07-01'),
            developerId: developer.id,
            progress: 0,
            description: 'Creative portfolio website for DesignHub Co'
        });

        console.log('   ✅ 3 projects created\n');

        // Step 6: Seed Leads
        console.log('📊 Creating leads...');
        await Lead.create({
            name: 'Vikram Singh',
            email: 'vikram@newbiz.com',
            phone: '+91 99887 76655',
            source: 'Website',
            service: 'Web App',
            status: 'New',
            notes: 'Interested in building an e-commerce platform'
        });

        await Lead.create({
            name: 'Sneha Gupta',
            email: 'sneha@creative.in',
            phone: '+91 88776 65544',
            source: 'Referral',
            service: 'Website',
            status: 'In Review',
            notes: 'Referred by Rajesh Sharma, needs a portfolio site'
        });

        await Lead.create({
            name: 'Arjun Mehta',
            email: 'arjun@logicware.io',
            phone: '+91 77665 54433',
            source: 'WhatsApp',
            service: 'SEO',
            status: 'New',
            notes: 'Wants SEO optimization for their existing website'
        });

        console.log('   ✅ 3 leads created\n');

        // Step 7: Seed Invoices
        console.log('💰 Creating invoices...');
        await Invoice.create({
            invoiceId: 'INV-0001',
            clientId: client1.id,
            projectId: project1.id,
            amount: 50000.00,
            paid: 50000.00,
            status: 'Paid',
            paymentMode: 'Bank Transfer',
            date: new Date('2026-03-01'),
            dueDate: new Date('2026-03-15'),
            notes: 'Full payment received for website redesign'
        });

        await Invoice.create({
            invoiceId: 'INV-0002',
            clientId: client2.id,
            projectId: project2.id,
            amount: 75000.00,
            paid: 25000.00,
            status: 'Partial',
            paymentMode: 'UPI',
            date: new Date('2026-03-15'),
            dueDate: new Date('2026-04-15'),
            notes: 'Advance payment for dashboard app - ₹25,000'
        });

        await Invoice.create({
            invoiceId: 'INV-0003',
            clientId: client3.id,
            projectId: project3.id,
            amount: 30000.00,
            paid: 0,
            status: 'Unpaid',
            date: new Date('2026-04-01'),
            dueDate: new Date('2026-04-30'),
            notes: 'Invoice for DesignHub portfolio site'
        });

        console.log('   ✅ 3 invoices created\n');

        // Step 8: Seed Communications
        console.log('💬 Creating communications...');
        await Communication.create({
            clientId: client1.id,
            type: 'Call',
            message: 'Discussed project timeline and milestones. Client approved the design mockup.',
            byUserId: admin.id,
            internal: false
        });

        await Communication.create({
            clientId: client2.id,
            type: 'WhatsApp',
            message: 'Shared dashboard wireframes. Client requested changes in the color scheme.',
            byUserId: manager.id,
            internal: false
        });

        await Communication.create({
            clientId: client3.id,
            type: 'Email',
            message: 'Sent project proposal and quotation to DesignHub.',
            byUserId: admin.id,
            internal: false
        });

        console.log('   ✅ 3 communications created\n');

        // Step 9: Seed Activities
        console.log('📝 Creating activities...');
        await Activity.create({
            type: 'client_created',
            description: 'New client "Tech Solutions India" was added',
            userId: admin.id,
            relatedId: client1.id,
            relatedModel: 'Client'
        });

        await Activity.create({
            type: 'project_created',
            description: 'Project "Tech Solutions Website Redesign" was created',
            userId: admin.id,
            relatedId: project1.id,
            relatedModel: 'Project'
        });

        await Activity.create({
            type: 'invoice_paid',
            description: 'Invoice INV-0001 marked as paid - ₹50,000',
            userId: admin.id,
            relatedId: client1.id,
            relatedModel: 'Invoice'
        });

        await Activity.create({
            type: 'project_status_changed',
            description: 'Project "StartupLab Dashboard App" status changed to In Progress',
            userId: manager.id,
            relatedId: project2.id,
            relatedModel: 'Project'
        });

        console.log('   ✅ 4 activities created\n');

        // Done!
        console.log('═══════════════════════════════════════════');
        console.log('🎉 DATABASE SEED COMPLETED SUCCESSFULLY!');
        console.log('═══════════════════════════════════════════');
        console.log('\n📊 Summary:');
        console.log('   • 4 Users (Admin, Manager, Developer, Client)');
        console.log('   • 3 Clients');
        console.log('   • 3 Projects');
        console.log('   • 3 Leads');
        console.log('   • 3 Invoices');
        console.log('   • 3 Communications');
        console.log('   • 4 Activities');
        console.log('\n🔑 Login Credentials:');
        console.log('   Admin:     admin@codenexus.studio / admin123');
        console.log('   Manager:   manager@codenexus.studio / manager123');
        console.log('   Developer: developer@codenexus.studio / dev123');
        console.log('   Client:    client@codenexus.studio / client123');
        console.log('═══════════════════════════════════════════\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seed failed:', error.message);
        console.error(error);
        process.exit(1);
    }
};

seed();
