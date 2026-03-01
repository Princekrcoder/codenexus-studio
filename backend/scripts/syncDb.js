import { sequelize } from '../models/index.js';

const syncDatabase = async () => {
    try {
        console.log('Starting database synchronization...');
        await sequelize.authenticate();
        console.log('✓ Database connection established');

        // Use alter: true to add missing columns without dropping tables
        await sequelize.sync({ alter: true });
        console.log('✓ Database tables synchronized with alter:true');

        process.exit(0);
    } catch (error) {
        console.error('✗ Database synchronization failed:', error);
        process.exit(1);
    }
};

syncDatabase();
