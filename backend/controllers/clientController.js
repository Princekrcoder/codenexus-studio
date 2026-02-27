import { Client, Project, Invoice } from '../models/index.js';
import { Op } from 'sequelize';

export const createClient = async (req, res) => {
    try {
        const { name, email, phone, company, address, gst, website, industry, type, status, servicePreference, paymentStatus } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !company) {
            return res.status(400).json({ success: false, message: 'Name, email, phone, and company are required' });
        }

        // Check if client already exists
        const existingClient = await Client.findOne({ where: { email: email.toLowerCase() } });
        if (existingClient) {
            return res.status(400).json({ success: false, message: 'Client with this email already exists' });
        }

        const client = await Client.create({
            name,
            email,
            phone,
            company,
            address,
            gst,
            website,
            industry,
            type,
            status,
            servicePreference: servicePreference || [],
            paymentStatus
        });

        res.status(201).json({ success: true, client });
    } catch (error) {
        console.error('Create client error:', error);
        res.status(500).json({ success: false, message: 'Server error creating client' });
    }
};

export const getClients = async (req, res) => {
    try {
        const { status, type, paymentStatus, search, page = 1, limit = 10 } = req.query;

        const where = {};

        if (status) where.status = status;
        if (type) where.type = type;
        if (paymentStatus) where.paymentStatus = paymentStatus;
        if (search) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { company: { [Op.iLike]: `%${search}%` } },
                { phone: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const offset = (page - 1) * limit;

        const { count, rows } = await Client.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Project,
                    as: 'projects',
                    attributes: ['id', 'name', 'status']
                }
            ]
        });

        res.json({
            success: true,
            clients: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get clients error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching clients' });
    }
};

export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await Client.findByPk(id, {
            include: [
                {
                    model: Project,
                    as: 'projects',
                    include: ['developer']
                },
                {
                    model: Invoice,
                    as: 'invoices'
                }
            ]
        });

        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }

        res.json({ success: true, client });
    } catch (error) {
        console.error('Get client error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching client' });
    }
};

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }

        // Check email uniqueness if email is being updated
        if (updates.email && updates.email !== client.email) {
            const existingClient = await Client.findOne({ where: { email: updates.email.toLowerCase() } });
            if (existingClient) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
        }

        await client.update(updates);

        res.json({ success: true, client });
    } catch (error) {
        console.error('Update client error:', error);
        res.status(500).json({ success: false, message: 'Server error updating client' });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }

        // Check for associated projects
        const projectCount = await Project.count({ where: { clientId: id } });
        if (projectCount > 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Cannot delete client with associated projects' 
            });
        }

        await client.destroy();

        res.json({ success: true, message: 'Client deleted successfully' });
    } catch (error) {
        console.error('Delete client error:', error);
        res.status(500).json({ success: false, message: 'Server error deleting client' });
    }
};
