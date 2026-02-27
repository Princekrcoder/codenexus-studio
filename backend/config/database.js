import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Parse DATABASE_URL or use individual config
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:kali@localhost:5432/codenexus';

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false, // Disable logging for cleaner output
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    }
});

export default sequelize;
