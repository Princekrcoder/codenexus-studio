import { sequelize, Client } from '../models/index.js';

const addClientRecord = async () => {
    try {
        console.log('Adding client record...');

        await sequelize.authenticate();
        console.log('✓ Database connection established');

        // Create a client record that matches the client user
        const client = await Client.create({
            name: 'Client User',
            email: 'client@example.com',
            phone: '+91 98765 43210',
            company: 'Test Company',
            status: 'Active',
            source: 'Direct'
        });

        console.log('✓ Client record created');
        console.log(`  ID: ${client.id}`);
        console.log(`  Name: ${client.name}`);
        console.log(`  Email: ${client.email}`);

        console.log('\n✓ Client record added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('✗ Failed to add client record:', error);
        process.exit(1);
    }
};

addClientRecord();
