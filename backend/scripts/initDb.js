import { sequelize, User } from '../models/index.js';

const initializeDatabase = async () => {
    try {
        console.log('Starting database initialization...');

        // Test connection
        await sequelize.authenticate();
        console.log('✓ Database connection established');

        // Sync all models
        await sequelize.sync({ force: true });
        console.log('✓ Database tables created');

        // Create default admin user (password will be hashed by model hook)
        const adminPassword = 'admin123';

        await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: adminPassword,
            role: 'Admin',
            status: 'Active'
        });

        console.log('✓ Default admin user created');
        console.log('  Email: admin@example.com');
        console.log('  Password: admin123');

        // Create default manager user
        await User.create({
            name: 'Manager User',
            email: 'manager@example.com',
            password: adminPassword,
            role: 'Manager',
            status: 'Active'
        });

        console.log('✓ Default manager user created');
        console.log('  Email: manager@example.com');
        console.log('  Password: admin123');

        // Create default client user
        await User.create({
            name: 'Client User',
            email: 'client@example.com',
            password: adminPassword,
            role: 'Client',
            status: 'Active'
        });

        console.log('✓ Default client user created');
        console.log('  Email: client@example.com');
        console.log('  Password: admin123');

        console.log('\n✓ Database initialization completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('✗ Database initialization failed:', error);
        process.exit(1);
    }
};

initializeDatabase();
