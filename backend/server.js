import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import communicationRoutes from './routes/communicationRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/communications', communicationRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/messages', messageRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({ 
        message: 'CodeNexus Studio Backend API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            clients: '/api/clients',
            projects: '/api/projects',
            leads: '/api/leads',
            invoices: '/api/invoices',
            dashboard: '/api/dashboard',
            communications: '/api/communications',
            team: '/api/team',
            contact: '/api/contact',
            files: '/api/files',
            messages: '/api/messages'
        }
    });
});

// Database connection and server start
const startServer = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('✓ Database connection established successfully');

        // Sync models
        await sequelize.sync({ alter: true });
        console.log('✓ Database models synchronized');

        // Start server
        app.listen(PORT, () => {
            console.log(`✓ Server is running on port ${PORT}`);
            console.log(`✓ API Documentation: http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.error('✗ Unable to start server:', error);
        process.exit(1);
    }
};

startServer();
