import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

async function createDatabase() {
    // Connect to postgres database (default database)
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'newpassword123',
        database: 'postgres' // Connect to default postgres database
    });

    try {
        await client.connect();
        console.log('✓ Connected to PostgreSQL');

        // Check if database exists
        const checkDb = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = 'codenexus'"
        );

        if (checkDb.rows.length > 0) {
            console.log('✓ Database "codenexus" already exists');
        } else {
            // Create database
            await client.query('CREATE DATABASE codenexus');
            console.log('✓ Database "codenexus" created successfully');
        }

        await client.end();
        console.log('\n✓ Database setup complete!');
        console.log('\nNext step: Run "npm run init-db" to create tables');

    } catch (error) {
        console.error('✗ Error creating database:', error.message);
        process.exit(1);
    }
}

createDatabase();
