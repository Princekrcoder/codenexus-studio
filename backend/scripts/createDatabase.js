import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        console.error('❌ DATABASE_URL is not set in .env file');
        process.exit(1);
    }

    console.log('🔗 Connecting to Neon PostgreSQL...');

    const sequelize = new Sequelize(databaseUrl, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

    try {
        await sequelize.authenticate();
        console.log('✅ Connected to Neon PostgreSQL successfully!');
        console.log('\nNext step: Run "npm run init-db" to create tables');
        await sequelize.close();
    } catch (error) {
        console.error('❌ Error connecting to Neon database:', error.message);
        process.exit(1);
    }
}

testConnection();
